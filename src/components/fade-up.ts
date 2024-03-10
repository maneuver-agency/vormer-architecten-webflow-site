export function fadeUp() {
  const FADE_UP_ATTR = 'data-fade-up';
  const FADE_UP_DELAY_ATTR = 'data-fade-up-delay-ms';

  const fadeUpElList = document.querySelectorAll(`[${FADE_UP_ATTR}]`);
  fadeUpElList.forEach((el) => {
    const isStagger = 'stagger' === el.getAttribute(FADE_UP_ATTR) ? true : false;
    const delayValue = el.getAttribute(FADE_UP_DELAY_ATTR);
    const delay = delayValue ? Number(delayValue) / 1000 : false;

    if (!isStagger) {
      fadeUpAnimation(el, undefined, false, delay);
    } else {
      const animatingEl = Array.from(el.children);
      fadeUpAnimation(animatingEl, el, true, delay);
    }
  });
}

function fadeUpAnimation(
  el: gsap.TweenTarget,
  parentEl: HTMLElement | undefined = undefined,
  stagger = false,
  delay: false | number = false
) {
  window.gsap.set(el, {
    y: 20,
    autoAlpha: 0,
  });

  window.gsap.to(el, {
    y: 0,
    autoAlpha: 1,
    duration: 0.6,
    ease: 'power2.out',
    stagger: stagger ? 0.3 : 0,
    delay: delay || 0,
    scrollTrigger: {
      trigger: parentEl || el,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}
