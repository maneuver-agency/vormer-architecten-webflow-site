export function homeHeroImageReveal() {
  const COMPONENT_SELECTOR = '[data-image-reveal-parent]';
  const boxes = 10 * 5;
  const DURATION_IN_SEC = 3;

  window.gsap.fromTo(
    `${COMPONENT_SELECTOR} > div`,
    {
      opacity: 1,
    },
    {
      opacity: 0,
      duration: DURATION_IN_SEC / boxes,
      stagger: {
        each: DURATION_IN_SEC / boxes,
        from: 'random',
      },
    }
  );
}
