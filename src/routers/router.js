// router.js
import { showConfigGameView } from '../views/configGameView.js';
import { showMainView } from '../views/mainView.js';
import { showGameView } from '../views/gameView.js'; // Agregamos la nueva importación

export { navigateTo, clearMainView, handlePopState };

window.navigateTo = navigateTo;

function navigateTo(route, cartones) {
    const mainView = document.getElementById('main-view');

    switch (route) {
        case 'configGame':
            clearMainView(); // Nueva función para limpiar el contenido de mainView
            mainView.append(showConfigGameView());
            break;
        case 'game': // Nuevo caso para la vista del juego
            clearMainView();
            mainView.append(showGameView(cartones));
            break;
        case 'home':
            clearMainView();
            showMainView(mainView);
            break;
        default:
            showMainView();
            break;
    }
}


// Nueva función para limpiar el contenido de mainView
function clearMainView() {
    const mainView = document.getElementById('main-view');

    // Verificar si mainView es null antes de intentar acceder a innerHTML
    if (mainView) {
        mainView.innerHTML = '';
    }
}
function handlePopState(event, addEventListenerFn = window.addEventListener, removeEventListenerFn = window.removeEventListener) {
    const route = event.state ? event.state.route : null;
    const cartones = event.state ? event.state.cartones : null;
    navigateTo(route, cartones);
    removeEventListenerFn('popstate', handlePopState);
}
console.log('router.js loaded');
