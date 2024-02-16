// loadGame.js

import { navigateTo } from '../routers/router.js';
import { getAllSavedGames, loadGameState } from '../services/bingohttp.js';

export { showLoadGameView, handleLoadGame };

async function showLoadGameView(container) {
    console.log('Showing load game view...');

    try {
        const savedGames = await getAllSavedGames();

        if (Array.isArray(savedGames)) {
            const loadGameContent = buildLoadGameContent(savedGames);

            if (container) {
                container.innerHTML = loadGameContent;
                const loadGameBtn = document.getElementById('load-game-btn');

                loadGameBtn.addEventListener('click', handleLoadGame);
            } else {
                console.error('Error: Container is null or undefined.');
            }
        } else {
            console.error('Error: Saved games data is not an array.');
        }
    } catch (error) {
        console.error('Error in showLoadGameView:', error);
    }
}

function buildLoadGameContent(savedGames) {
    let content = '<h2>Cargar Paartida</h2>';
    content += '<select id="saved-games-list">';
    console.log(savedGames);
    savedGames.forEach((game) => {
        if(game.uid_player === localStorage.getItem('uid')){
            content += `<option value="${game.id}">Id Partida: ${game.id} partida</option>`; 
        }
    });

    content += '</select>';
    content += '<button id="load-game-btn">Cargar Partida</button>';
    return content;
}

async function handleLoadGame() {
    console.log('Handling load game...');

    try {
        const savedGamesList = document.getElementById('saved-games-list');

        const selectedGameId = savedGamesList.value; 

        const selectedGameState = await loadGameState(selectedGameId);
        console.log("HandleLoadGame " + selectedGameId);
        if (selectedGameState) {
            history.pushState({ route: 'game', gameState: selectedGameState }, 'Game', '/game');
            navigateTo('game', selectedGameState);
        } else {
            console.error('Error: No se pudo cargar la partida seleccionada.');
            navigateTo('main');
        }
    } catch (error) {
        console.error('Error in handleLoadGame:', error);
    }
}
