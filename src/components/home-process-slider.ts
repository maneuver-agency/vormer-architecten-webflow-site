import Swiper from 'swiper';

export function initProcessSlider() {
  const CONTENT_SLIDER_SELECTOR = '[data-slider-type="content"]';
  const IMAGE_SLIDER_SELECTOR = '[data-slider-type="image"]';

  const contentSlider = new Swiper(CONTENT_SLIDER_SELECTOR, {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    loop: false,
    allowTouchMove: false,
  });

  const imageSlider = new Swiper(IMAGE_SLIDER_SELECTOR, {
    loop: false,
    speed: 1000,
    lazyPreloadPrevNext: 1,
    parallax: true,
    watchSlidesProgress: true,
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'custom',
      renderBullet: function (index, className) {
        const number = index + 1;
        return '<span class="' + className + '">' + String(number).padStart(2, '0') + '</span>';
      },
    },
  });

  imageSlider.controller.control = contentSlider;
}
