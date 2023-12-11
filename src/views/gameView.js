// gameView.js
export { showGameView, resetCarton, markNumberInCardCPU};
import { createBombo, getDrumNumber, createMarkedList} from '../logic/game.js';
import {navigateTo} from '../routers/router.js';
/*
const bombo = createBombo();
const markedList = createMarkedList();*/
let bombo = createBombo();
let markedList = createMarkedList();

function showGameView(cartones) {
    console.log('showGameView function called with cartones:', cartones);

    const contentBigContainer = document.createElement('div');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('game-container'); 

    // Sección de los cartones del jugador (izquierda)
    const playerSection = createCartonesSection('Jugador', cartones, true);
    playerSection.classList.add('player-section'); 
    contentContainer.appendChild(playerSection);

    // Crear sección para los cartones de la CPU
    const cpuSection = createCartonesSection('CPU', cartones, false);
    cpuSection.classList.add('cpu-section'); 
    contentContainer.appendChild(cpuSection);

    // Sección del número del bombo y lista de números marcados
    const rightSection = document.createElement('div');
    rightSection.classList.add('right-section');

    // Sección del número del bombo
    const bomboSection = document.createElement('div');
    bomboSection.classList.add('bombo-section'); 
    contentContainer.appendChild(bomboSection);

    // Elemento para mostrar el número sacado del bombo
    const numberDisplay = document.createElement('div');
    numberDisplay.classList.add('number-display');
    bomboSection.appendChild(numberDisplay);

        // Agregamos un botón para sacar un número del bombo
    const drawNumberBtn = document.createElement('button');
    drawNumberBtn.textContent = 'Sacar Número';
    drawNumberBtn.classList.add('draw-number-btn');
    drawNumberBtn.addEventListener('click', function() {
        const number = getDrumNumber(bombo);
        console.log('Número sacado del bombo:', number);

        // Marca el número en la lista de números marcados
        markedList[number - 1] = true;

        // Muestra el número en el elemento de visualización
        numberDisplay.textContent = number;

        // Marcar el número en la lista
        markNumberInList(number);

        // Marcar el número en el cartón de la CPU
        markNumberInCardCPU(number, cartones);

        // Después de sacar un número, verifica si hay un ganador
        checkWinner(cartones);
    });

    bomboSection.appendChild(drawNumberBtn);

    rightSection.appendChild(bomboSection);

    // Lista de números marcados
    const markedListContainer = document.createElement('div');
    markedListContainer.classList.add('marked-list-container'); 

    // Distribuir números en columnas
    for (let col = 0; col < 5; col++) {
        const markedListColumn = document.createElement('div');
        markedListColumn.classList.add('marked-list-column');

        for (let num = col * 15 + 1; num <= (col + 1) * 15; num++) {
            const markedListItem = document.createElement('div');
            markedListItem.classList.add('marked-list-item', 'number-list-item');

            // Marcar el número si ya ha salido
            if (markedList[num - 1]) {
                markedListItem.classList.add('marcado');
            }

            markedListItem.textContent = num;
            markedListColumn.appendChild(markedListItem);
        }

        markedListContainer.appendChild(markedListColumn);
    }

    rightSection.appendChild(markedListContainer);
    contentContainer.appendChild(rightSection);
    contentBigContainer.appendChild(contentContainer);

    // Botones y otros elementos
    const endGameBtn = document.createElement('button');
    endGameBtn.textContent = 'Terminar Partida';
    endGameBtn.classList.add('back-btn');
    endGameBtn.addEventListener('click', function() {
        console.log('Terminar partida button clicked');
        // Reiniciar el juego
        resetGame();
        // Muestra la nueva vista y actualiza la historia del navegador
        history.pushState({ route: 'home' }, 'Home', '/home');
        navigateTo('home');
    });
    contentBigContainer.appendChild(endGameBtn);

    return contentBigContainer;
}

function createCartonesSection(titulo, cartones, isPlayerCarton) {
    const section = document.createElement('div');
    section.classList.add('cartones-section');

    // Título de la sección (Jugador o CPU)
    const tituloElement = document.createElement('h3');
    tituloElement.textContent = titulo;
    section.appendChild(tituloElement);

    // Contenedor para los cartones
    const cartonesContainer = document.createElement('div');
    cartonesContainer.classList.add('cartones-container');

    // Crear cartones
    for (let i = 1; i <= cartones; i++) {
        const cartonElement = createCartonElement(`Cartón ${i}`, isPlayerCarton, cartones);
        cartonesContainer.appendChild(cartonElement);
    }

    section.appendChild(cartonesContainer);

    return section;
}
function createCartonElement(titulo, isPlayerCarton, cartones) {
    const cartonElement = document.createElement('div');
    cartonElement.classList.add('carton');
    cartonElement.innerHTML = `<h4>${titulo}</h4>`;

    // Inicializar las columnas
    const columns = [[], [], [], [], []];

    // Números por columna
    const numbersPerColumn = 15;

    // Llenar las columnas con números aleatorios
    for (let column = 0; column < 5; column++) {
        // Generar una secuencia de números para la columna actual
        const columnNumbers = Array.from({ length: numbersPerColumn }, (_, index) => index + 1 + column * numbersPerColumn);

        // Mezclar la secuencia de números
        for (let i = columnNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [columnNumbers[i], columnNumbers[j]] = [columnNumbers[j], columnNumbers[i]];
        }

        // Añadir evento de clic solo para los cartones del jugador
        if (isPlayerCarton) {
            columnNumbers.forEach((number, rowIndex) => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('number');

                    // Evitar añadir un número en la posición del medio
                    if (!(rowIndex === 2 && column === 2)) {
                        numberElement.textContent = number;
                        columns[column][rowIndex] = numberElement;
                    } else {
                        // Añadir un espacio en blanco en lugar de un número
                        const emptyCell = document.createElement('div');
                        emptyCell.classList.add('number', 'empty-cell');
                        columns[column][rowIndex] = emptyCell;
                    }
            });
        } else {
            columns[column] = columnNumbers.map(number => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('number');
                numberElement.textContent = number;
                return numberElement;
            });

            // Añadir espacio vacío en la posición central
            if (column === 2) {
                const emptyCell = document.createElement('div');
                emptyCell.classList.add('number', 'empty-cell');
                columns[column][2] = emptyCell;
            }
        }
    }

    // Organizar los números en el cartón
    for (let row = 0; row < 5; row++) {
        const filaElement = document.createElement('div');
        filaElement.classList.add('fila');

        for (let column = 0; column < 5; column++) {
            const numberElement = columns[column][row].cloneNode(true);
            numberElement.classList.add('number');
            if (isPlayerCarton) {
                if(column != 2 || row!=2){
                    numberElement.addEventListener('click', function () {
                        toggleMarkedNumber(numberElement, cartones);
                    });
                }
            }
            if(column === 2 || row ===2){
                const emptyCell = columns[column][row].cloneNode(true);
                emptyCell.classList.add('number', 'empty-cell');
            }
            filaElement.appendChild(numberElement);
            
        }

        cartonElement.appendChild(filaElement);
    }

    return cartonElement;
}

/*
function toggleMarkedNumber(numberElement, cartones) {
    numberElement.classList.toggle('marcado');

    // Verificar si todos los números en el cartón del jugador están marcados
    const playerCarton = numberElement.closest('.player-section .carton');
    if (areAllNumbersMarked(playerCarton)) {
        // Realizar la comprobación de los números del cartón del jugador
        checkCartonNumbers(playerCarton, cartones);
    }

    // Verificar si todos los números en el cartón de la CPU están marcados
    const cpuCarton = numberElement.closest('.cpu-section .carton');
    if (cpuCarton && areAllNumbersMarked(cpuCarton)) {
        // Realizar la comprobación de los números del cartón de la CPU
        checkCartonNumbers(cpuCarton, cartones);
    }
}*/
function toggleMarkedNumber(numberElement, cartones) {
    numberElement.classList.toggle('marcado');

    const carton = numberElement.closest('.carton');
    if (areAllNumbersMarked(carton)) {
        checkCartonNumbers(carton, cartones);
    }
}


function markNumberInList(number) {
    const numberListItems = document.querySelectorAll('.number-list-item');
    numberListItems.forEach((listItem) => {
        if (parseInt(listItem.textContent) === number) {
            listItem.classList.add('number-list-item-marcado');
        }
    });
}
function markNumberInCardCPU(number, cartones) {
    // Obtén todos los elementos de número en el cartón de la CPU
    const cpuCartons = document.querySelectorAll('.cpu-section .carton');

    // Verifica si hay cartones de la CPU antes de continuar
    if (cpuCartons.length > 0) {
        cpuCartons.forEach(cpuCarton => {
            const numbersCpu = cpuCarton.querySelectorAll('.number');

            // Verificar si hay elementos antes de intentar marcarlos
            if (numbersCpu.length > 0) {
                numbersCpu.forEach(numberElement => {
                    if (numberElement.textContent === number.toString()) {
                        toggleMarkedNumber(numberElement, cartones);
                    }
                });
            }
        });
    }
}
/*
function areAllNumbersMarked(cartones) {
    if (!cartones || cartones.length === 0) {
        return false; // Retorna false si no hay cartones presentes
    }

    const markedNumbers = Array.from(cartones, carton => Array.from(carton.querySelectorAll('.number.marcado')));
    const flattenedNumbers = markedNumbers.flat();

    return flattenedNumbers.length === cartones.length * 24; // Cambia esto según la cantidad total de números en un cartón
}*/
function areAllNumbersMarked(carton) {
    if (!carton) {
        return false; // Retorna false si no hay cartón presente
    }

    const markedNumbers = Array.from(carton.querySelectorAll('.number.marcado'));
    return markedNumbers.length === 24; // Cambia esto según la cantidad total de números en un cartón
}


/*function checkCartonNumbers(carton, cartones) {
    // Obtener todos los números marcados en el cartón
    const markedNumbers = Array.from(carton.querySelectorAll('.number.marcado'));

    // Verificar si todos los números marcados han salido durante la partida
    const allNumbersMatch = markedNumbers.every(numberElement => {
        const number = parseInt(numberElement.textContent);
        return markedList[number - 1];
    });

    if (allNumbersMatch) {
        console.log(`¡Bingo! Todos los números del cartón han salido.`);

        // Después de sacar un número, verifica si hay un ganador
        checkWinner(cartones);
    } else {
        console.log(`Algunos números del cartón aún no han salido en el bombo.`);

        // Desmarcar los números que no han salido en el cartón del jugador
        markedNumbers.forEach(numberElement => {
            const number = parseInt(numberElement.textContent);
            if (!markedList[number - 1]) {
                // Si el número no ha salido, desmarcarlo
                toggleMarkedNumber(numberElement, cartones);
            }
        });
    }
}*/
function checkCartonNumbers(carton, cartones) {
    console.log('Tipo de carton:', typeof carton);  // Agrega esta línea

    // Obtener todos los números marcados en el cartón
    const markedNumbers = Array.from(carton.querySelectorAll('.number.marcado'));

    // Desmarcar los números que no han salido en el cartón del jugador
    markedNumbers.forEach(numberElement => {
        const number = parseInt(numberElement.textContent);
        if (!markedList[number - 1]) {
            // Si el número no ha salido, desmarcarlo
            toggleMarkedNumber(numberElement, cartones);
        }
    });

    // Verificar si todos los números marcados han salido durante la partida
    const allMarkedNumbersMatch = markedNumbers.every(numberElement => {
        const number = parseInt(numberElement.textContent);
        return markedList[number - 1];
    });

    if (allMarkedNumbersMatch) {
        console.log(`¡Bingo! Todos los números del cartón han salido.`);
        // Después de sacar un número, verifica si hay un ganador
        checkWinner(cartones);
    } else {
        console.log(`Algunos números del cartón aún no han salido en el bombo.`);
    }
}

function checkWinner(cartones) {
    // Obtener todos los cartones del jugador y la CPU
    const playerCartones = document.querySelectorAll('.player-section .carton');
    const cpuCartones = document.querySelectorAll('.cpu-section .carton');

    // Verificar si algún cartón del jugador ha ganado
    const playerHasWon = areAllNumbersMarked(playerCartones[0]);  // Seleccionamos el primer cartón

    // Verificar si algún cartón de la CPU ha ganado
    const cpuHasWon = areAllNumbersMarked(cpuCartones[0]);

    // Mostrar mensaje en la consola según el resultado
    if (playerHasWon && cpuHasWon) {
        console.log('¡Es un empate!');
        showEndGameMessage('¡Es un empate!');
    } else if (playerHasWon) {
        console.log('¡El jugador ha ganado!');
        showEndGameMessage('¡Enhorabuena, has ganado!');
    } else if (cpuHasWon) {
        console.log('¡La CPU ha ganado!');
        showEndGameMessage('¡Una lástima, has perdido!');
    } else {
        console.log('La partida continúa...');
    }
}

function showEndGameMessage(message) {
    // Crear un contenedor para el modal
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    // Crear el modal
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Crear el mensaje
    const endGameMessage = document.createElement('p');
    endGameMessage.textContent = message;

    // Crear el botón para volver al menú principal
    const backToMenuBtn = document.createElement('button');
    backToMenuBtn.textContent = 'Volver al Menú Principal';
    backToMenuBtn.classList.add('back-btn');
    backToMenuBtn.addEventListener('click', function() {
        // Agregar aquí la lógica para volver al menú principal (quizás cambiar de vista o recargar la página)
        console.log('Volver al menú principal button clicked');
        // Cerrar el modal al volver al menú
        modalContainer.remove();
        // Reiniciar el juego
        resetGame();
        // Muestra la nueva vista y actualiza la historia del navegador
        history.pushState({ route: 'home' }, 'Home', '/home');
        navigateTo('home');
    });

    // Crear el botón para volver a la partida
    const backToGameBtn = document.createElement('button');
    backToGameBtn.textContent = 'Volver a la Partida';
    backToGameBtn.classList.add('back-to-game-btn');

    // Agregar elementos al modal
    modal.appendChild(endGameMessage);
    modal.appendChild(backToMenuBtn);
    modal.appendChild(backToGameBtn);

    // Agregar el modal al contenedor
    modalContainer.appendChild(modal);

    // Agregar el contenedor al cuerpo del documento
    document.body.appendChild(modalContainer);

    // Deshabilitar la interacción con la partida
    disableGameInteraction();

    backToGameBtn.addEventListener('click', function() {
        // Agregar aquí la lógica para cerrar el modal y permitir volver a la partida
        console.log('Volver a la partida button clicked');
        // Cerrar el modal y habilitar la interacción con la partida
        modalContainer.remove();
    });
}

function disableGameInteraction() {
    // Deshabilitar el botón para sacar un número del bombo
    const drawNumberBtn = document.querySelector('.draw-number-btn');
    drawNumberBtn.disabled = true;

    // Deshabilitar la interacción con los cartones del jugador
    const playerCartons = document.querySelectorAll('.player-section .carton .number');
    playerCartons.forEach(numberElement => {
        numberElement.removeEventListener('click', toggleMarkedNumber);
    });

    // Deshabilitar la interacción con los cartones de la CPU
    const cpuCartons = document.querySelectorAll('.cpu-section .carton .number');
    cpuCartons.forEach(numberElement => {
        numberElement.removeEventListener('click', toggleMarkedNumber);
    });
}

function resetGame() {
    resetNumberDisplay();
    resetMarkedList();
    resetCartons();
    enableGameInteraction();
    bombo = createBombo();
    markedList = createMarkedList();
}

function resetNumberDisplay() {
    const numberDisplay = document.querySelector('.number-display');
    numberDisplay.textContent = '';
}

function resetMarkedList() {
    const markedListItems = document.querySelectorAll('.number-list-item');
    markedListItems.forEach(listItem => {
        listItem.classList.remove('number-list-item-marcado');
    });
}

function resetCartons() {
    const playerCartons = document.querySelectorAll('.player-section .carton');
    const cpuCartons = document.querySelectorAll('.cpu-section .carton');

    resetCarton(playerCartons);
    resetCarton(cpuCartons);
}

function resetCarton(cartons) {
    cartons.forEach(carton => {
        const numbers = carton.querySelectorAll('.number');
        numbers.forEach(number => {
            number.classList.remove('marcado');
        });
    });
}

function enableGameInteraction() {
    const drawNumberBtn = document.querySelector('.draw-number-btn');
    drawNumberBtn.disabled = false;

    const playerCartons = document.querySelectorAll('.player-section .carton .number');
    playerCartons.forEach(numberElement => {
        numberElement.addEventListener('click', toggleMarkedNumber);
    });

    const cpuCartons = document.querySelectorAll('.cpu-section .carton .number');
    cpuCartons.forEach(numberElement => {
        numberElement.addEventListener('click', toggleMarkedNumber);
    });
}