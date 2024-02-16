import { navigateTo } from './routers/router.js';
import { menu } from './views/menu.js';

const initializeApp = () => {
  navigateTo(window.location.hash);

  window.addEventListener('hashchange', () => {
    navigateTo(window.location.hash);
  });
};

document.addEventListener('DOMContentLoaded', initializeApp);
