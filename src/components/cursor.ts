const CURSOR_OUTER_SELECTOR = '.page-cursor.is-outer';
const CURSOR_INNER_SELECTOR = '.page-cursor.is-inner';

let scaleAnim: gsap.core.Timeline;
let outerX: gsap.QuickToFunc;
let outerY: gsap.QuickToFunc;
let InnerX: gsap.QuickToFunc;
let innerY: gsap.QuickToFunc;

export function cursorInit() {
  if (window.innerWidth < 992) {
    return;
  }

  window.gsap.set(CURSOR_INNER_SELECTOR, { scale: 0.3 });
  window.gsap.set(`${CURSOR_OUTER_SELECTOR}, ${CURSOR_INNER_SELECTOR}`, { opacity: 1 });

  document.addEventListener('mousemove', cursorMove);

  outerX = window.gsap.quickTo(CURSOR_OUTER_SELECTOR, 'left', {
    duration: 0.2,
    ease: 'power3',
  });
  outerY = window.gsap.quickTo(CURSOR_OUTER_SELECTOR, 'top', {
    duration: 0.2,
    ease: 'power3',
  });

  InnerX = window.gsap.quickTo(CURSOR_INNER_SELECTOR, 'left', {
    duration: 0.6,
    ease: 'power3',
  });
  innerY = window.gsap.quickTo(CURSOR_INNER_SELECTOR, 'top', {
    duration: 0.6,
    ease: 'power3',
  });

  setScaleAnimations();
  setLinksInteraction();
}

function setScaleAnimations() {
  scaleAnim = window.gsap.timeline({ paused: true });

  scaleAnim.to(
    CURSOR_OUTER_SELECTOR,
    {
      scale: 0.4,
      duration: 0.35,
    },
    0
  );
  scaleAnim.to(
    CURSOR_INNER_SELECTOR,
    {
      opacity: 0,
      duration: 0.35,
    },
    0
  );
}

function cursorMove(mouseEv: MouseEvent) {
  const cursorPosition = {
    left: mouseEv.clientX,
    top: mouseEv.clientY,
  };

  outerX(cursorPosition.left);
  outerY(cursorPosition.top);
  InnerX(cursorPosition.left);
  innerY(cursorPosition.top);
}

function setLinksInteraction() {
  const TARGET_SELECTORS_LIST =
    'a, [data-cursor-link], .button.is-form-submit, .process_slider_pagination-bullet';

  document.addEventListener(
    'mouseenter',
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isTargetMatch = target.matches(TARGET_SELECTORS_LIST);
      if (!isTargetMatch) {
        return;
      }

      window.DEBUG('link hover - cursor scale play');
      scaleAnim.play();

      target.addEventListener(
        'mouseleave',
        (e) => {
          window.DEBUG('link hover - cursor scale reverse');
          scaleAnim.reverse();
        },
        { once: true }
      );
    },
    true
  );
}
