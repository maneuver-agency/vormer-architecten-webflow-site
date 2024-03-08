import '@finsweet/attributes-cmsload';

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsload',
  (listInstances) => {
    const [listInstance] = listInstances;

    listInstance.on('renderitems', (renderedItems) => {
      console.log(renderedItems);
    });
  },
]);
