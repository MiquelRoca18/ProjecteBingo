// router.js
import { showConfigGameView } from '../views/configGameView.js';
import { showMainView } from '../views/mainView.js';
import { showGameView } from '../views/gameView.js'; 
import { crearHTMLSupabase } from '../views/loginRegister.js';
import { menu } from '../views/menu.js';
import { isUserLoggedIn } from '../utils/utils.js';
import { showLoadGameView } from '../views/loadGame.js';

export { navigateTo, clearMainView, handlePopState };

window.navigateTo = navigateTo;

function navigateTo(route, cartones) {
    const mainView = document.getElementById('main-view');
    const menuContainer = document.getElementById('menu');
    

    console.log("Route "+ route);
   
    if(route.length==0){
        route = "login";
    }
    console.log("Route 2  " + route);
    switch (route) {
        case 'configGame':
            clearMainView(); 
            clearMenuView();
            menuContainer.appendChild(menu());
            mainView.append(showConfigGameView());
            break;
        case 'game': 
            clearMainView();
            clearMenuView();
            menuContainer.appendChild(menu());
            mainView.append(showGameView(cartones));
            break;
        case 'home':
            clearMainView();
            clearMenuView();
            menuContainer.appendChild(menu());
            console.log("Home Console");
            showMainView(mainView);
            break;
        case 'login':
            clearMainView();
            if (!isUserLoggedIn()) {
                clearMenuView();
            }
            crearHTMLSupabase(mainView);
            break;
        case 'loadGame':
            clearMainView();
            clearMenuView();
            menuContainer.appendChild(menu());
            showLoadGameView(mainView);
            console.log("Load Game");
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
function clearMenuView() {
    const menuContainer = document.getElementById('menu');

    // Verificar si mainView es null antes de intentar acceder a innerHTML
    if (menuContainer) {
        menuContainer.innerHTML = '';
    }
}
function handlePopState(event, addEventListenerFn = window.addEventListener, removeEventListenerFn = window.removeEventListener) {
    const route = event.state ? event.state.route : null;
    const cartones = event.state ? event.state.cartones : null;
    navigateTo(route, cartones);
    removeEventListenerFn('popstate', handlePopState);
}
console.log('router.js loaded');
