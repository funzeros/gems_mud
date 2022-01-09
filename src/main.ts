import AppPage from './lib/App';
// import router from './lib/router';
import { GemsEngine, GemsCanvas } from './packages';

(function () {
  new GemsEngine(AppPage)
    // .use(router)
    .initialize(GemsCanvas);
})();
