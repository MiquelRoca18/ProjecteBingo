import { navigateTo } from '../routers/router.js';

export { showConfigGameView, handleStartGameClick, handleBackClick };

function createOption(value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    return option;
}

function createButton(text, classes = [], clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(...classes);
    button.addEventListener('click', clickHandler);
    return button;
}

function showConfigGameView() {
    try {
        console.log('showConfigGameView function called');

        const contentContainer = document.createElement('div');
        contentContainer.innerHTML = '<h2 class="main-heading">Nueva Partida</h2><p class="main-paragraph">Configura la nueva partida:</p>';

        const cartonesSelect = document.createElement('select');
        cartonesSelect.id = 'cartones-select';
        cartonesSelect.classList.add('main-select');

        for (let i = 1; i <= 4; i++) {
            cartonesSelect.appendChild(createOption(i, `${i} Carton${i > 1 ? 'es' : ''}`));
        }

        contentContainer.appendChild(cartonesSelect);

        const startGameBtn = createButton('Empezar Partida', ['main-btn'], handleStartGameClick);
        contentContainer.appendChild(startGameBtn);

        const backBtn = createButton('Volver', ['main-btn', 'back-btn'], handleBackClick);
        contentContainer.appendChild(backBtn);

        return contentContainer;
    } catch (error) {
        console.error('Error in showConfigGameView:', error);
        return null;
    }
}

function handleStartGameClick() {
    try {
        const selectedCartones = document.getElementById('cartones-select').value;

        if (!selectedCartones) {
            throw new Error('No se ha seleccionado ningún cartón');
        }

        history.pushState({ route: 'game', cartones: selectedCartones }, 'Game', '/game');
        navigateTo('game', selectedCartones);
    } catch (error) {
        console.error('Error in handleStartGameClick:', error);
    }
}

function handleBackClick() {
    try {
        console.log('Volver button clicked');
        history.pushState({ route: 'home' }, 'Home', '/home');
        navigateTo('home');
    } catch (error) {
        console.error('Error in handleBackClick:', error);
    }
}
