import Swiper from 'swiper';
import { Controller, EffectFade, Navigation, Pagination, Parallax } from 'swiper/modules';

export function initProcessSlider() {
  const CONTENT_COMPONENT_SELECTOR = '.process_slider_component.is-content';

  const CONTENT_SLIDER_SELECTOR = '[data-slider-type="content"]';
  const IMAGE_SLIDER_SELECTOR = '[data-slider-type="image"]';

  const PREV_NAV_SELECTOR = `${CONTENT_COMPONENT_SELECTOR} .process_slider_nav-button.is-prev`;
  const NEXT_NAV_SELECTOR = `${CONTENT_COMPONENT_SELECTOR} .process_slider_nav-button.is-next`;
  const PAGINATION_SELECTOR = `${CONTENT_COMPONENT_SELECTOR} .process_slider_pagination`;

  const contentSlider = new Swiper(CONTENT_SLIDER_SELECTOR, {
    modules: [EffectFade],
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    loop: false,
    slidesPerView: 1,
    allowTouchMove: false,
  });

  const imageSlider = new Swiper(IMAGE_SLIDER_SELECTOR, {
    modules: [Navigation, Pagination, Parallax, Controller],
    loop: false,
    speed: 1000,
    slidesPerView: 1,
    lazyPreloadPrevNext: 1,
    parallax: true,
    watchSlidesProgress: true,
    grabCursor: true,
    navigation: {
      nextEl: NEXT_NAV_SELECTOR,
      prevEl: PREV_NAV_SELECTOR,
      disabledClass: 'is-disabled',
    },
    pagination: {
      el: PAGINATION_SELECTOR,
      clickable: true,
      type: 'bullets',
      bulletClass: 'process_slider_pagination-bullet',
      bulletActiveClass: 'is-active',
      renderBullet: function (index, className) {
        const number = index + 1;
        return '<span class="' + className + '">' + String(number).padStart(2, '0') + '</span>';
      },
    },
  });

  window.DEBUG({ imageSlider }, { contentSlider });

  imageSlider.controller.control = contentSlider;
}
