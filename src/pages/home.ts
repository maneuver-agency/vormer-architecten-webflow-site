import { initProcessSlider } from 'src/components/home-process-slider';
import 'src/components/home-projects-gallery';

window.Webflow?.push(() => {
  initProcessSlider();
});
