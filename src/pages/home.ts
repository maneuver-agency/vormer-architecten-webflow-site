import { homeHeroImageReveal } from 'src/components/home-hero-image-reveal';
import { initProcessSlider } from 'src/components/home-process-slider';
import 'src/components/home-projects-gallery';
import { SCRIPTS_LOADED_EVENT } from 'src/constants';

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  homeHeroImageReveal();
  initProcessSlider();
});
