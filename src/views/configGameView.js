import { navigateTo } from '../routers/router.js';

export {showConfigGameView, handleStartGameClick, handleBackClick};

function showConfigGameView() {
    console.log('showNewGameView function called');

    const contentContainer = document.createElement('div');
    contentContainer.innerHTML = '<h2 class="main-heading">Nueva Partida</h2><p class="main-paragraph">Configura la nueva partida:</p>';

    const cartonesSelect = document.createElement('select');
    cartonesSelect.id = 'cartones-select';
    cartonesSelect.classList.add('main-select');

    for (let i = 1; i <= 4; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = `${i} Carton${i > 1 ? 'es' : ''}`;
        cartonesSelect.appendChild(option);
    }

    contentContainer.appendChild(cartonesSelect);

    const startGameBtn = document.createElement('button');
    startGameBtn.textContent = 'Empezar Partida';
    startGameBtn.classList.add('main-btn');
    startGameBtn.addEventListener('click', handleStartGameClick);

    contentContainer.appendChild(startGameBtn);

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Volver';
    backBtn.classList.add('main-btn', 'back-btn');
    backBtn.addEventListener('click', handleBackClick);

    contentContainer.appendChild(backBtn);

    return contentContainer;
}
function handleStartGameClick() {
    const selectedCartones = document.getElementById('cartones-select').value;

    history.pushState({ route: 'game', cartones: selectedCartones }, 'Game', '/game');
    navigateTo('game', selectedCartones);
}

function handleBackClick() {
    console.log('Volver button clicked');
    history.pushState({ route: 'home' }, 'Home', '/home');
    navigateTo('home');
}

