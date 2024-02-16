// mainViewSpec.js
import { showMainView, handleNewGameClick, buildMainViewContent } from '../src/views/mainView.js';

describe('MainView', () => {
    // Crea un contenedor simulado
    let container;

    beforeEach(() => {
        // Inicializa el contenedor antes de cada prueba
        container = document.createElement('div');
        container.id = 'main-view';
        document.body.appendChild(container);
    });

    afterEach(() => {
        // Elimina el contenedor después de cada prueba
        document.body.removeChild(container);
    });

    it('debe actualizar el contenido en el contenedor especificado', () => {
        // Llama a la función que quieres probar
        const result = showMainView(container);

        // Verifica que el contenido se haya actualizado correctamente en el contenedor
        expect(container.innerHTML).toContain('Bingo Game');
        expect(result).toContain('Bingo Game');
    });

    it('debe actualizar el historial y navegar a configGame', () => {
        // Mockea navigateTo para verificar que se llama con los argumentos correctos
        const navigateToSpy = jasmine.createSpy('navigateTo');

        navigateToSpy('configGame', null);
    
        // Verifica que navigateTo se haya llamado con los argumentos correctos
        expect(navigateToSpy).toHaveBeenCalledWith('configGame', null);
    });

    it('debe devolver el contenido HTML esperado', () => {
        // Llama a la función que quieres probar
        const result = buildMainViewContent();

        // Verifica que el resultado sea la cadena HTML esperada
        const expectedHTML = '<h2>Bingo Game</h2><button id="new-game-btn">Nueva Partida</button>';
        expect(result).toBe(expectedHTML);
    });
});
