import 'fslightbox';
import { SCRIPTS_LOADED_EVENT } from 'src/entry';

const PROJECT_ITEM_SELECTOR = '.projects_item-link-wrapper';
const LIGHTBOX_WRAPPER_SELECTOR = '[data-lightbox-wrapper]';
const LIGHTBOX_CONTENT_WRAPPER_SELECTOR = '[data-lightbox-content-wrapper]';
const LIGHTBOX_CLOSE_BTN_ATTRIBUTE = 'data-lightbox-close';

let lightboxWrapperEl: HTMLElement | null;
let projectItemsList: NodeListOf<HTMLElement>;

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  lightboxWrapperEl = document.querySelector(LIGHTBOX_WRAPPER_SELECTOR);
  projectItemsList = document.querySelectorAll(PROJECT_ITEM_SELECTOR);

  if (!lightboxWrapperEl || !projectItemsList.length) {
    window.DEBUG(
      'No lightbox wrapper found or no project items found.',
      { lightboxWrapperEl },
      { projectItemsList }
    );
    return;
  }

  initLightbox();
  onProjectsItemLoad();
  refreshLightbox();
});

/**
 * On loading new projects via CMS Load
 */
window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsload',
  (listInstances) => {
    const [listInstance] = listInstances;

    listInstance.on('renderitems', (renderedItems: NodeListOf<HTMLElement>) => {
      projectItemsList = renderedItems;

      onProjectsItemLoad();
    });
  },
]);

function onProjectsItemLoad() {
  document.querySelectorAll(`${PROJECT_ITEM_SELECTOR}[data-slug]`).forEach((item) => {
    initHTMX(item);

    item.addEventListener('click', (clickEv) => {
      window.gsap.set(lightboxWrapperEl, { display: 'block' });
      window.gsap.set('body', { overflow: 'hidden' });
      window.gsap.to(lightboxWrapperEl, { opacity: 1, duration: 0.3 });
    });
  });
}

/**
 * Sets `hx-get` attribute on the project list items, dynamically joining the slug
 */
function initHTMX(item: HTMLElement) {
  const slug = item.getAttribute('data-slug');
  const currentGetPath = item.getAttribute('hx-get') || '/projects/';
  item.setAttribute('hx-get', currentGetPath + slug);

  item.removeAttribute('data-slug');

  htmx.process(item);
}

function initLightbox() {
  window.gsap.set(lightboxWrapperEl, { opacity: 0 });

  const lightboxContentWrapperEl = lightboxWrapperEl?.querySelector(
    LIGHTBOX_CONTENT_WRAPPER_SELECTOR
  );

  lightboxWrapperEl?.addEventListener('click', (clickEv) => {
    const target = clickEv.target as HTMLElement;
    if (!target.closest(`[${LIGHTBOX_CLOSE_BTN_ATTRIBUTE}]`)) {
      return;
    }

    window.gsap.to(lightboxWrapperEl, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        window.gsap.set(lightboxWrapperEl, { display: 'none' });
        window.gsap.set('body', { overflow: 'auto' });

        if (lightboxContentWrapperEl) {
          lightboxContentWrapperEl.innerHTML = '';
        }
      },
    });
  });
}

function refreshLightbox() {
  htmx.onLoad(function (content) {
    window.DEBUG('htmx loaded', content);
    refreshFsLightbox();
  });
}

export {};
