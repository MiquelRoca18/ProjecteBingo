import {navigateTo} from '../routers/router.js';
export{showMainView, handleNewGameClick, buildMainViewContent};

// mainView.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('mainView.js loaded');
    showMainView(document.getElementById('main-view'));
});

// Función para mostrar la vista principal
function showMainView(container) {
    console.log('showMainView function called');

    // Verificar si container es null antes de intentar acceder a innerHTML
    if (container) {
        // Actualizamos el contenido del contenedor con el HTML del juego principal
        const mainViewContent = buildMainViewContent();
        container.innerHTML = mainViewContent;

        // Obtenemos el botón "Nueva Partida" del DOM
        const newGameBtn = document.getElementById('new-game-btn');

        // Agregamos un evento de clic al botón "Nueva Partida"
        newGameBtn.addEventListener('click', handleNewGameClick);

        // Devolvemos el contenido creado
        return mainViewContent;
    } else {
        console.error('Container is null');
        return null;
    }
}

// Función que se ejecuta cuando se hace clic en el botón "Nueva Partida"
function handleNewGameClick() {
    console.log('Nueva Partida button clicked');

    // Muestra la nueva vista y actualiza la historia del navegador
    history.pushState({ route: 'configGame' }, 'Configuration Game', '/configGame');
    navigateTo('configGame');
}

// Función para construir el contenido de la vista principal
function buildMainViewContent() {
    return '<h2>Bingo Game</h2><button id="new-game-btn">Nueva Partida</button>';
}

