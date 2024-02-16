// gameView.js
export { showGameView, resetCarton, markNumberInCardCPU, resetGame};
import { createBombo, getDrumNumber, createMarkedList} from '../logic/game.js';
import { saveGameState, loadGameState } from '../services/bingohttp.js';
import {navigateTo} from '../routers/router.js';

let bombo;
console.log(bombo);
let markedList = createMarkedList();

function showGameView(cartones) {
    
    
    try {
       
        const contentBigContainer = document.createElement('div');
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('game-container');

        let playerCartones;
        let cpuCartones;
        let numeroCartones;
        if (typeof cartones === 'object') {
            console.log("Object");
            console.log(cartones.player_marked_numbers);
            console.log(cartones.cpu_marked_numbers);
            console.log(cartones.bombo_state);
            console.log(cartones.number_cartones);

            playerCartones = cartones;
            cpuCartones = cartones;
            bombo = cartones.bombo_state;
            numeroCartones = cartones.numero_cartones;
            

        } else {
            console.log("numero");
            console.log(cartones);
            playerCartones = cartones;
            cpuCartones = cartones;
            bombo = createBombo();
            
        }

        const playerSection = createCartonesSection('Jugador', playerCartones, true);
        playerSection.classList.add('player-section');
        contentContainer.appendChild(playerSection);

        const cpuSection = createCartonesSection('CPU', cpuCartones, false);
        cpuSection.classList.add('cpu-section');
        contentContainer.appendChild(cpuSection);

        const rightSection = document.createElement('div');
        rightSection.classList.add('right-section');

        const bomboSection = document.createElement('div');
        bomboSection.classList.add('bombo-section');
        contentContainer.appendChild(bomboSection);

        const numberDisplay = document.createElement('div');
        numberDisplay.classList.add('number-display');
        bomboSection.appendChild(numberDisplay);

        const drawNumberBtn = createButton('Sacar Número', ['draw-number-btn'], () => handleDrawNumber(cartones));
        bomboSection.appendChild(drawNumberBtn);
        rightSection.appendChild(bomboSection);

        const markedListContainer = createMarkedListContainer();
        rightSection.appendChild(markedListContainer);
        contentContainer.appendChild(rightSection);
        contentBigContainer.appendChild(contentContainer);

        const endGameBtn = createButton('Terminar Partida', ['back-btn'], () => handleEndGame(cartones));
        contentBigContainer.appendChild(endGameBtn);

        const saveGameBtn = createButton('Guardar Partida', ['save-game-btn'], () => handleSaveGame(cartones));
        contentBigContainer.appendChild(saveGameBtn);

        return contentBigContainer;
        
    } catch (error) {
        console.error('Error en showGameView:', error);
        return null;
    }
}

function handleDrawNumber(cartones) {
    try {
        if(typeof cartones === 'object'){
            const number = getDrumNumber(bombo);
            if (!number || isNaN(number)) {
                throw new Error('Error al obtener un número del bombo.');
            }
    
            console.log('Número sacado del bombo:', number);
    
            const numberIndex = bombo.indexOf(number);
            if (numberIndex !== -1) {
                bombo.splice(numberIndex, 1);
            }
    
            markedList[number - 1] = true;
    
            updateNumberDisplay(number);
            markNumberInList(number);
            markNumberInCardCPU(number, cartones.number_cartones);
            checkWinner(cartones);
            markMissingNumbers(bombo);
            markMissingNumbersCPU(bombo);
            markMissingNumbersPlayer(cartones.player_marked_numbers);
        }else{
            const number = getDrumNumber(bombo);
            if (!number || isNaN(number)) {
                throw new Error('Error al obtener un número del bombo.');
            }
    
            console.log('Número sacado del bombo:', number);
    
            const numberIndex = bombo.indexOf(number);
            if (numberIndex !== -1) {
                bombo.splice(numberIndex, 1);
            }
    
            markedList[number - 1] = true;
    
            updateNumberDisplay(number);
            markNumberInList(number);
            markNumberInCardCPU(number, cartones);
            checkWinner(cartones);
        }
    } catch (error) {
        console.error('Error en handleDrawNumber:', error);
    }
}

function handleEndGame(cartones) {
    try {
        console.log('Terminar partida button clicked');
        resetGame();
        history.pushState({ route: 'home' }, 'Home', '/home');
        navigateTo('home');
    } catch (error) {
        console.error('Error en handleEndGame:', error);
    }
}

function createButton(text, classes = [], clickHandler) {
    try {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add(...classes);
        if (clickHandler && typeof clickHandler === 'function') {
            button.addEventListener('click', clickHandler);
        } else {
            throw new Error('El manejador de clic no es una función válida.');
        }
        return button;
    } catch (error) {
        console.error('Error en createButton:', error);
        return null;
    }
}

function createMarkedListContainer() {
    try {
        const markedListContainer = document.createElement('div');
        markedListContainer.classList.add('marked-list-container');

        for (let col = 0; col < 5; col++) {
            const markedListColumn = document.createElement('div');
            markedListColumn.classList.add('marked-list-column');

            for (let num = col * 15 + 1; num <= (col + 1) * 15; num++) {
                const markedListItem = document.createElement('div');
                markedListItem.classList.add('marked-list-item', 'number-list-item');

                if (markedList[num - 1]) {
                    markedListItem.classList.add('marcado');
                }

                markedListItem.textContent = num;
                markedListColumn.appendChild(markedListItem);
            }

            markedListContainer.appendChild(markedListColumn);
        }
        return markedListContainer;
    } catch (error) {
        console.error('Error en createMarkedListContainer:', error);
        return null;
    }
}

function updateNumberDisplay(number) {
    try {
        const numberDisplay = document.querySelector('.number-display');
        
        if (numberDisplay) {
            numberDisplay.textContent = number;
        }
    } catch (error) {
        console.error('Error en updateNumberDisplay:', error);
    }
}


function createCartonesSection(titulo, cartones, isPlayerCarton) {
    try {
        const section = createDivWithClass('cartones-section');
        const tituloElement = createHeadingElement('h3', titulo);
        section.appendChild(tituloElement);
        console.log("Fuera Cargar Cartones");
        console.log(cartones);
        const cartonesContainer = createDivWithClass('cartones-container');
        if (typeof cartones === 'object') {
            for (let i = 1; i <= cartones.number_cartones; i++) {
                console.log("Dentro Cargar Cartones");
                const cartonElement = createCartonElementWithNumbers(`Cartón ${i}`, isPlayerCarton, cartones, i);
                cartonesContainer.appendChild(cartonElement);
            }
        }else{
            for (let i = 1; i <= cartones; i++) {
                const cartonElement = createCartonElement(`Cartón ${i}`, isPlayerCarton, cartones);
                cartonesContainer.appendChild(cartonElement);
            }        
        }
        

        section.appendChild(cartonesContainer);

        return section;
    } catch (error) {
        console.error('Error en createCartonesSection:', error);
        return null;
    }
}

function createDivWithClass(className) {
    try {
        if (typeof className !== 'string') {
            throw new Error('La clase proporcionada no es una cadena válida.');
        }

        const element = document.createElement('div');
        element.classList.add(className);
        return element;
    } catch (error) {
        console.error('Error en createDivWithClass:', error);
        return null;
    }
}

function createHeadingElement(tag, textContent) {
    try {
        if (typeof tag !== 'string' || typeof textContent !== 'string') {
            throw new Error('La etiqueta o el contenido del encabezado no son cadenas válidas.');
        }

        const element = document.createElement(tag);
        element.textContent = textContent;
        return element;
    } catch (error) {
        console.error('Error en createHeadingElement:', error);
        return null;
    }
}


function createCartonElement(titulo, isPlayerCarton, cartones) {
    try {
        const cartonElement = document.createElement('div');
        cartonElement.classList.add('carton');
        cartonElement.innerHTML = `<h4>${titulo}</h4>`;

        const columns = [[], [], [], [], []];
        const numbersPerColumn = 15;

        for (let column = 0; column < 5; column++) {
            const columnNumbers = Array.from({ length: numbersPerColumn }, (_, index) => index + 1 + column * numbersPerColumn);

            for (let i = columnNumbers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [columnNumbers[i], columnNumbers[j]] = [columnNumbers[j], columnNumbers[i]];
            }

            if (isPlayerCarton) {
                columnNumbers.forEach((number, rowIndex) => {
                    const numberElement = document.createElement('div');
                    numberElement.classList.add('number');

                    if (!(rowIndex === 2 && column === 2)) {
                        numberElement.textContent = number;
                        columns[column][rowIndex] = numberElement;
                    } else {
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

                if (column === 2) {
                    const emptyCell = document.createElement('div');
                    emptyCell.classList.add('number', 'empty-cell');
                    columns[column][2] = emptyCell;
                }
            }
        }

        for (let row = 0; row < 5; row++) {
            const filaElement = document.createElement('div');
            filaElement.classList.add('fila');

            for (let column = 0; column < 5; column++) {
                const numberElement = columns[column][row].cloneNode(true);
                numberElement.classList.add('number');

                if (isPlayerCarton) {
                    if (column !== 2 || row !== 2) {
                        numberElement.addEventListener('click', function () {
                            toggleMarkedNumber(numberElement, cartones);
                        });
                    }
                }

                if (column === 2 || row === 2) {
                    const emptyCell = columns[column][row].cloneNode(true);
                    emptyCell.classList.add('number', 'empty-cell');
                }

                filaElement.appendChild(numberElement);
            }

            cartonElement.appendChild(filaElement);
        }

        return cartonElement;
    } catch (error) {
        console.error('Error en createCartonElement:', error);
        return null;
    }
}

const toggleMarkedNumber = (numberElement, cartones) => {
    try {
        if (!numberElement) {
            throw new Error('Número no proporcionado');
        }

        numberElement.classList.toggle('marcado');

        const carton = numberElement.closest('.carton');
        if (!carton) {
            throw new Error('No se pudo encontrar el cartón asociado');
        }

        areAllNumbersMarked(carton) && checkCartonNumbers(carton, cartones);
    } catch (error) {
        console.error('Error en toggleMarkedNumber:', error.message);
    }
};


const markNumberInList = (number) => {
    try {
        if (!number) {
            throw new Error('Número no proporcionado');
        }

        const numberListItems = document.querySelectorAll('.number-list-item');
        numberListItems.forEach((listItem) => {
            const listItemNumber = parseInt(listItem.textContent);

            if (!isNaN(listItemNumber) && listItemNumber === number) {
                listItem.classList.add('number-list-item-marcado');
            }
        });
    } catch (error) {
        console.error('Error en markNumberInList:', error.message);
    }
};
const markMissingNumbers = (bombo) => {
    console.log("pintar los que faltan");
    try {
        const numberListItems = document.querySelectorAll('.number-list-item');

        if (!numberListItems || numberListItems.length === 0) {
            throw new Error('No se encontraron elementos de la lista de números');
        }

        numberListItems.forEach((listItem) => {
            const listItemNumber = parseInt(listItem.textContent);

            let numberFound = false;
            bombo.forEach((number) => {
                if (listItemNumber === number) {
                    numberFound = true;
                }
            });

            if (!numberFound) {
                listItem.classList.add('number-list-item-marcado');
            }
        });
    } catch (error) {
        console.error('Error en markMissingNumbers:', error.message);
    }
};
const markNumberInCardCPU = (number, cartones) => {
    try {
        const cpuCartons = document.querySelectorAll('.cpu-section .carton');

        if (!cpuCartons || cpuCartons.length === 0) {
            throw new Error('No se encontraron cartones de la CPU');
        }

        cpuCartons.forEach((cpuCarton) => {
            const numbersCpu = cpuCarton.querySelectorAll('.number');

            if (numbersCpu && numbersCpu.length > 0) {
                numbersCpu.forEach((numberElement) => {
                    if (numberElement.textContent === number.toString()) {
                        toggleMarkedNumber(numberElement, cartones);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error en markNumberInCardCPU:', error.message);
    }
};
const markMissingNumbersCPU = (bombo) => {
    try {
        const cpuCartons = document.querySelectorAll('.cpu-section .carton');

        if (!cpuCartons || cpuCartons.length === 0) {
            throw new Error('No se encontraron cartones de la CPU');
        }

        cpuCartons.forEach((cpuCarton) => {
            const numbersCpu = cpuCarton.querySelectorAll('.number');

            if (numbersCpu && numbersCpu.length > 0) {
                numbersCpu.forEach((numberElement) => {
                    bombo.forEach((number) => {
                        if (numberElement.textContent != number.toString() && numberElement.textContent.length !=0) {
                            toggleMarkedNumber(numberElement, bombo.number_cartones);
                        }
                    });
                    
                });
            }
        });
    } catch (error) {
        console.error('Error en markNumberInCardCPU:', error.message);
    }
};
const markMissingNumbersPlayer = (bombo) => {
    try {
        const cpuCartons = document.querySelectorAll('.player-section .carton');

        if (!cpuCartons || cpuCartons.length === 0) {
            throw new Error('No se encontraron cartones de la CPU');
        }

        cpuCartons.forEach((cpuCarton) => {
            const numbersCpu = cpuCarton.querySelectorAll('.number');

            if (numbersCpu && numbersCpu.length > 0) {
                numbersCpu.forEach((numberElement) => {
                    bombo.forEach((numbers) => {
                        numbers.forEach((number)=>{
                            console.log(numberElement.textContent +" = " + number);
                            if (numberElement.textContent === number.toString() && numberElement.textContent.length !=0) {
                                toggleMarkedNumber(numberElement, bombo.number_cartones);
                            }
                        });
                    });
                    
                });
            }
        });
    } catch (error) {
        console.error('Error en markNumberInCardCPU:', error.message);
    }
};
const areAllNumbersMarked = (carton) => {
    try {
        if (!carton) {
            throw new Error('No se proporcionó un cartón');
        }

        const markedNumbers = Array.from(carton.querySelectorAll('.number.marcado'));
        return markedNumbers.length === 24; 
    } catch (error) {
        console.error('Error en areAllNumbersMarked:', error.message);
        return false;
    }
};

const checkCartonNumbers = (carton, cartones) => {
    try {
        console.log('Tipo de carton:', typeof carton);

        if (!carton) {
            throw new Error('No se proporcionó un cartón');
        }

        const markedNumbers = Array.from(carton.querySelectorAll('.number.marcado'));

        markedNumbers.forEach((numberElement) => {
            const number = parseInt(numberElement.textContent);
            if (!markedList[number - 1]) {
                toggleMarkedNumber(numberElement, cartones);
            }
        });

        const allMarkedNumbersMatch = markedNumbers.every((numberElement) => {
            const number = parseInt(numberElement.textContent);
            return markedList[number - 1];
        });

        if (allMarkedNumbersMatch) {
            console.log('¡Bingo! Todos los números del cartón han salido.');
            checkWinner(cartones);
        } else {
            console.log('Algunos números del cartón aún no han salido en el bombo.');
        }
    } catch (error) {
        console.error('Error en checkCartonNumbers:', error.message);
    }
};



const checkWinner = (cartones) => {
    try {
        const playerCartones = document.querySelectorAll('.player-section .carton');
        const cpuCartones = document.querySelectorAll('.cpu-section .carton');

        const playerHasWon = areAllNumbersMarked(playerCartones[0]);
        const cpuHasWon = areAllNumbersMarked(cpuCartones[0]);

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
    } catch (error) {
        console.error('Error en checkWinner:', error.message);
    }
};

const showEndGameMessage = (message) => {
    try {
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');

        const modal = document.createElement('div');
        modal.classList.add('modal');

        const endGameMessage = document.createElement('p');
        endGameMessage.textContent = message;

        const backToMenuBtn = document.createElement('button');
        backToMenuBtn.textContent = 'Volver al Menú Principal';
        backToMenuBtn.classList.add('back-btn');
        backToMenuBtn.addEventListener('click', function () {
            console.log('Volver al menú principal button clicked');
            modalContainer.remove();
            resetGame();
            history.pushState({ route: 'home' }, 'Home', '/home');
            navigateTo('home');
        });

        const backToGameBtn = document.createElement('button');
        backToGameBtn.textContent = 'Volver a la Partida';
        backToGameBtn.classList.add('back-to-game-btn');

        modal.appendChild(endGameMessage);
        modal.appendChild(backToMenuBtn);
        modal.appendChild(backToGameBtn);

        modalContainer.appendChild(modal);
        document.body.appendChild(modalContainer);

        disableGameInteraction();

        backToGameBtn.addEventListener('click', function () {
            console.log('Volver a la partida button clicked');
            modalContainer.remove();
        });
    } catch (error) {
        console.error('Error en showEndGameMessage:', error.message);
    }
};


const disableGameInteraction = () => {
    try {
        const drawNumberBtn = document.querySelector('.draw-number-btn');
        if (drawNumberBtn) {
            drawNumberBtn.disabled = true;
        }

        const removeClickEvent = (cartonSelector) => {
            const cartons = document.querySelectorAll(cartonSelector);
            cartons.forEach(carton => {
                const numbers = carton.querySelectorAll('.number');
                numbers.forEach(number => {
                    number.removeEventListener('click', toggleMarkedNumber);
                });
            });
        };

        removeClickEvent('.player-section .carton .number');
        removeClickEvent('.cpu-section .carton .number');
    } catch (error) {
        console.error('Error en disableGameInteraction:', error.message);
    }
};

const resetGame = () => {
    try {
        resetNumberDisplay();
        resetMarkedList();
        resetCartons();
        enableGameInteraction();
        bombo = createBombo();
        markedList = createMarkedList();
    } catch (error) {
        console.error('Error en resetGame:', error.message);
    }
};


const resetNumberDisplay = () => {
    try {
        const numberDisplay = document.querySelector('.number-display');

        if (numberDisplay) {
            numberDisplay.textContent = '';
        }
    } catch (error) {
        console.error('Error en resetNumberDisplay:', error.message);
    }
};

const resetMarkedList = () => {
    try {
        const removeClass = (element) => {
            element.classList.remove('number-list-item-marcado');
        };

        const markedListItems = document.querySelectorAll('.number-list-item');
        markedListItems.forEach(removeClass);
    } catch (error) {
        console.error('Error en resetMarkedList:', error.message);
    }
};


const resetCartons = () => {
    try {
        const playerCartons = document.querySelectorAll('.player-section .carton');
        const cpuCartons = document.querySelectorAll('.cpu-section .carton');

        resetCarton(playerCartons);
        resetCarton(cpuCartons);
    } catch (error) {
        console.error('Error en resetCartons:', error.message);
    }
};

const resetCarton = (cartons) => {
    try {
        const removeClass = (number) => {
            number.classList.remove('marcado');
        };

        cartons.forEach(carton => {
            const numbers = carton.querySelectorAll('.number');
            numbers.forEach(removeClass);
        });
    } catch (error) {
        console.error('Error en resetCarton:', error.message);
    }
};



const enableGameInteraction = () => {
    try {
        const enableClick = (numberElement) => {
            if (numberElement) {
                numberElement.addEventListener('click', toggleMarkedNumber);
            }
        };

        const drawNumberBtn = document.querySelector('.draw-number-btn');
        drawNumberBtn?.removeAttribute('disabled');

        const playerCartons = document.querySelectorAll('.player-section .carton .number');
        playerCartons.forEach(enableClick);

        const cpuCartons = document.querySelectorAll('.cpu-section .carton .number');
        cpuCartons.forEach(enableClick);
    } catch (error) {
        console.error('Error en enableGameInteraction:', error.message);
    }
};

function getState(cartones) {
    try {
        const playerCartones = document.querySelectorAll('.player-section .carton');
        const cpuCartones = document.querySelectorAll('.cpu-section .carton');
        
        const playerMarkedNumbers = getPlayerMarkedNumbers(playerCartones);
        const cpuMarkedNumbers = getCPUMarkedNumbers(cpuCartones);
        const bomboState = getBomboState();
        const playerCartonNumbers = getCartonNumbers(playerCartones);
        const cpuCartonNumbers = getCartonNumbers(cpuCartones);

        return {
            playerMarkedNumbers: playerMarkedNumbers,
            cpuMarkedNumbers: cpuMarkedNumbers,
            bomboState: bomboState,
            numberCartones: cartones,
            playerCartonNumbers: playerCartonNumbers,
            cpuCartonNumbers: cpuCartonNumbers,
            playerId: localStorage.getItem('uid')
        };
    } catch (error) {
        console.error('Error en getState:', error);
        return null;
    }
}
function getCartonNumbers(cartones) {
    try {
        const cartonNumbers = [];

        cartones.forEach(carton => {
            const numbersCarton = Array.from(carton.querySelectorAll('.number'));
            cartonNumbers.push(numbersCarton.map(numberElement => parseInt(numberElement.textContent)));
        });

        return cartonNumbers;
    } catch (error) {
        console.error('Error en getCartonNumbers:', error);
        return null;
    }
}

function getPlayerMarkedNumbers(cartones) {
    try {
        const markedNumbers = [];

        cartones.forEach(carton => {
            const markedNumbersCarton = Array.from(carton.querySelectorAll('.number.marcado'));
            markedNumbers.push(markedNumbersCarton.map(numberElement => parseInt(numberElement.textContent)));
        });

        return markedNumbers;
    } catch (error) {
        console.error('Error en getPlayerMarkedNumbers:', error);
        return null;
    }
}

function getCPUMarkedNumbers(cartones) {
    try {
        const markedNumbers = [];

        cartones.forEach(carton => {
            const markedNumbersCarton = Array.from(carton.querySelectorAll('.number.marcado'));
            markedNumbers.push(markedNumbersCarton.map(numberElement => parseInt(numberElement.textContent)));
        });

        return markedNumbers;
    } catch (error) {
        console.error('Error en getCPUMarkedNumbers:', error);
        return null;
    }
}

function getBomboState() {
    try {
        if (!bombo || bombo.length === 0) {
            console.error('Error en getBomboState: El bombo no está definido o está vacío.');
            return [];
        }

        return bombo;
    } catch (error) {
        console.error('Error en getBomboState:', error);
        return null;
    }
}

function handleSaveGame(cartones) {
    try {
        saveGameState(getState(cartones));
        console.log('Partida guardada exitosamente.');
    } catch (error) {
        console.error('Error en handleSaveGame:', error);
    }
}

function createCartonElementWithNumbers(titulo, isPlayerCarton, cartones, numCarton) {
    try {
        --numCarton;
        console.log("cargar cartones");
        const cartonElement = document.createElement('div');
        cartonElement.classList.add('carton');
        cartonElement.innerHTML = `<h4>${titulo}</h4>`;
        let contador = 0;
        for (let row = 0; row < 5; row++) {
            const filaElement = document.createElement('div');
            filaElement.classList.add('fila');
            for (let column = 0; column < 5; column++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('number');
                const index = row * 5 + column;

                if (index === 12) { 
                    cellElement.classList.add('empty-cell');
                } else {
                        cellElement.textContent = cartones.numbers_carton_player[numCarton][contador];
                        
                        if (isPlayerCarton && index !== 12) {
                            cellElement.addEventListener('click', function () {
                                toggleMarkedNumber(cellElement, cartones.number_cartones);
                            });
                        }
                }
                contador++;
                filaElement.appendChild(cellElement);
            }

            cartonElement.appendChild(filaElement);
        }
        return cartonElement;
    } catch (error) {
        console.error('Error en createCartonElementWithNumbers:', error);
        return null;
    }
}