import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatedDetailsAccordions } from './components/accordions';
import { cursorInit } from './components/cursor';
import { fadeUp } from './components/fade-up';

window.gsap = gsap;
window.gsap.registerPlugin(ScrollTrigger);

window.Webflow?.push(() => {
  animatedDetailsAccordions();
  fadeUp();
  cursorInit();
});
