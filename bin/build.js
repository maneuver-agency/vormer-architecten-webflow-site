import esbuild from 'esbuild';

const DEV_BUILD_PATH = './dist/dev';
const PROD_BUILD_PATH = './dist';
const production = process.env.NODE_ENV === 'production';

const BUILD_DIRECTORY = !production ? DEV_BUILD_PATH : PROD_BUILD_PATH;

const files = ['./src/*.ts', './src/components/*.ts', './src/pages/*.ts'];

const buildSettings = {
  entryPoints: files,
  bundle: true,
  outdir: BUILD_DIRECTORY,
  minify: !production ? false : true,
  sourcemap: !production,
  target: production ? 'es2017' : 'esnext',
};

if (!production) {
  let ctx = await esbuild.context(buildSettings);

  let { port } = await ctx.serve({
    servedir: BUILD_DIRECTORY,
    port: 3000,
  });

  console.log(`Serving at http://localhost:${port}`);
} else {
  esbuild.build(buildSettings);
}
