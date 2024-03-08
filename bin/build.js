import glob from 'tiny-glob';

const DEV_BUILD_PATH = './dist/dev';
const PROD_BUILD_PATH = './dist';
const production = process.env.NODE_ENV === 'production';

const files = ['./src/*.ts', './src/components/*.ts', './src/pages/*.ts'];

const result = await Bun.build({
  entrypoints: (await Promise.all(files.map((pattern) => glob(pattern)))).flat(),
  outdir: !production ? DEV_BUILD_PATH : PROD_BUILD_PATH,
  target: 'browser',
  sourcemap: !production ? 'external' : 'none',
  minify: !production ? false : true,
  bundle: true,
});

if (!result.success) {
  console.error('Build failed', result.logs);
}

if (!production) {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*', // Allow all domains
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  const server = Bun.serve({
    port: 3000,
    development: true,
    async fetch(req) {
      const url = new URL(req.url);

      // Serve directory listing at the root
      if (url.pathname === '/') {
        // fix the below code to serve all the files in the directory
        const files = await glob(DEV_BUILD_PATH + '/*');

        let fileList = files.map((file) => `<li><a href="${file}">${file}</a></li>`).join('');
        return new Response(`<h1>File Directory</h1><ul>${fileList}</ul>`, {
          headers: {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const filePath = DEV_BUILD_PATH + url.pathname;
      const file = Bun.file(filePath);
      return new Response(file, { headers });
    },
    error(err) {
      console.log('Error trying to access file', err);
      return new Response('File not found', { status: 404 });
    },
  });

  console.log(`Serving at http://localhost:${server.port}`);
}
