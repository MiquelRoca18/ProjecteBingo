import { navigateTo } from '../routers/router.js';
import { loadGameState } from '../services/bingohttp.js';

export { showMainView, handleNewGameClick, handleLoadGameClick, buildMainViewContent };

function showMainView(container) {
    console.log('showMainView function called');

    try {
        if (container != null) {
            const mainViewContent = buildMainViewContent();
            container.innerHTML = mainViewContent;

            const newGameBtn = document.getElementById('new-game-btn');
            const loadGameBtn = document.getElementById('load-game-btn'); 

            if (newGameBtn) {
                newGameBtn.addEventListener('click', handleNewGameClick);
            } else {
                console.error('Button "new-game-btn" not found');
            }

            if (loadGameBtn) {
                loadGameBtn.addEventListener('click', handleLoadGameClick);
            } else {
                console.error('Button "load-game-btn" not found');
            }

            return mainViewContent;
        } else {
            console.error('Container is null or undefined');
            return null;
        }
    } catch (error) {
        console.error('Error in showMainView:', error);
        return null;
    }
}

function handleNewGameClick() {
    console.log('Nueva Partida button clicked');

    try {
        history.pushState({ route: 'configGame' }, 'Configuration Game', '/configGame');
        navigateTo('configGame');
    } catch (error) {
        console.error('Error in handleNewGameClick:', error);
    }
}

function handleLoadGameClick() {
    console.log('Cargar Partida button clicked');

    try {
        history.pushState({ route: 'loadGame' }, 'Load Game', '/loadGame');
        navigateTo('loadGame');
    } catch (error) {
        console.error('Error in handleLoadGameClick:', error);
    }
}

function buildMainViewContent() {
    return '<h2>Bingo Game</h2><button id="new-game-btn">Nueva Partida</button><button id="load-game-btn">Cargar Partida</button>';
}
