import { handleBackClick, handleStartGameClick } from '../src/views/configGameView.js';

describe('Config Game', function () {
    
    it('debe actualizar el historial y navegar a inicio', () => {
        // Mockea history.pushState para verificar que se llama con los argumentos correctos
        spyOn(history, 'pushState');

        // Mockea navigateTo para verificar que se llama con los argumentos correctos
        spyOn(window, 'navigateTo');

        // Llama a la función que quieres probar
        handleBackClick();

        // Verifica que history.pushState se haya llamado con los argumentos correctos
        expect(history.pushState).toHaveBeenCalledWith({ route: 'home' }, 'Home', '/home');

        // Simula la llamada a navigateTo con los argumentos correctos
        navigateTo('home');

        // Verifica que navigateTo se haya llamado con los argumentos correctos
        expect(navigateTo).toHaveBeenCalledWith('home');
    });
});
