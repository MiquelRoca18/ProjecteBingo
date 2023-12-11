// routerSpec.js
import { navigateTo, clearMainView, handlePopState } from '../src/routers/router.js';

describe('Router', function () {
    let originalMainView;
    let appendSpy;

    beforeEach(function () {
        // Simulando document.getElementById y append para las pruebas
        originalMainView = document.getElementById;
        appendSpy = jasmine.createSpy('append');

        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue({
            innerHTML: '',
            append: appendSpy
        });
    });

    afterEach(function () {
        // Restaurando las funciones originales después de cada prueba
        document.getElementById = originalMainView;
    });

    it('debería navegar a la vista configGame', function () {
        navigateTo('configGame', null);

        expect(document.getElementById).toHaveBeenCalledWith('main-view');
        expect(appendSpy).toHaveBeenCalled();
    });

    it('debería navegar a la vista game', function () {
        const cartones = ['carton1', 'carton2'];
        navigateTo('game', cartones);

        expect(document.getElementById).toHaveBeenCalledWith('main-view');
        expect(appendSpy).toHaveBeenCalled();
    });

    it('debería limpiar Main View', function () {
        clearMainView();

        // Verificar que se llamó a document.getElementById con 'main-view'
        expect(document.getElementById).toHaveBeenCalledWith('main-view');

        // Verificar que se limpió el contenido (innerHTML) de mainView
        const mainView = document.getElementById('main-view');
        expect(mainView.innerHTML).toBe('');
    });
    it('debería llamar a navigateTo y removeEventListenerFn al manejar el evento popstate', function () {
        // Simula un objeto de evento con un estado específico
        const fakeEvent = {
            state: {
                route: 'configGame',
                cartones: null
            }
        };

       // Mockea las funciones externas
        const navigateToSpy = jasmine.createSpy('navigateTo');
        const removeEventListenerSpy = jasmine.createSpy('removeEventListener');

        // Simula un clic en un botón que debería llamar a navigateTo('configGame')
        navigateToSpy('configGame', null);

        // Llama a handlePopState con el evento simulado y las funciones mockeadas
        handlePopState(fakeEvent, navigateToSpy, removeEventListenerSpy);

        // Verifica que navigateTo se llamó con los argumentos correctos
        expect(navigateToSpy).toHaveBeenCalledWith('configGame', null);

        // Verifica que removeEventListener se llamó con los argumentos correctos
        expect(removeEventListenerSpy).toHaveBeenCalledWith('popstate', handlePopState);

    });

});
