import '@finsweet/attributes-scrolldisable';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animatedDetailsAccordions } from './components/accordions';

window.gsap = gsap;
window.gsap.registerPlugin(ScrollTrigger);

window.Webflow?.push(() => {
  animatedDetailsAccordions();
});
