export function homeHeroImageReveal() {
  const COMPONENT_SELECTOR = '[data-image-reveal-parent]';
  const BLOCKS_SELECTOR = `${COMPONENT_SELECTOR} > div`;
  const DURATION_IN_SEC = 1;

  window.gsap.fromTo(
    BLOCKS_SELECTOR,
    {
      opacity: 1,
    },
    {
      opacity: 0,
      duration: 0.3,
      stagger: {
        amount: DURATION_IN_SEC,
        from: 'random',
      },
    }
  );
}
