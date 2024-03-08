const ITEM_SELECTOR = 'details';
const TOGGLE_SELECTOR = 'summary';
const CONTENT_SELECTOR = 'summary + div';

const ANIMATION_DURATION = 0.3;

export function animatedDetailsAccordions() {
  const accordionsList = document.querySelectorAll<HTMLDetailsElement>(ITEM_SELECTOR);
  accordionsList.forEach((accordion) => {
    const accordionToggleEl = accordion.querySelector(TOGGLE_SELECTOR);
    const accordionContentEl = accordion.querySelector(CONTENT_SELECTOR);

    if (!accordionToggleEl || !accordionContentEl) {
      window.DEBUG(
        'Accordion toggle or content not found',
        { accordionToggleEl },
        { accordionContentEl }
      );
      return;
    }

    let SHOULD_CLOSE_ACCORDION = false;

    window.gsap.set(accordionContentEl, {
      height: 0,
    });

    const animationTimeline = window.gsap.timeline({
      onComplete: () => {
        if (SHOULD_CLOSE_ACCORDION && accordion.open) {
          window.DEBUG('accordion close');
          accordion.open = false;
        }
      },
    });

    accordionToggleEl.addEventListener('click', (clickEv) => {
      clickEv.preventDefault();
      clickEv.stopPropagation();

      SHOULD_CLOSE_ACCORDION = true;
      let height: number | string = 0;

      if (!accordion.open) {
        window.DEBUG('accordion open');
        accordion.open = true;
        height = 'auto';
        SHOULD_CLOSE_ACCORDION = false;
      } else {
        height = 0;
      }

      animationTimeline.to(accordionContentEl, {
        height: height,
        duration: ANIMATION_DURATION,
      });
    });
  });
}
