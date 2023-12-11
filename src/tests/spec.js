// testRouter.mjs
import { navigateTo } from '../src/router.js';
import { showNewGameView } from '../src/views/configGameView.js';
import { showMainView } from '../src/views/mainView.js';

// Simulamos el objeto document y window para Jasmine
const mockDocument = {
    getElementById: jasmine.createSpy('getElementById').and.returnValue({
        innerHTML: '',
        append: jasmine.createSpy('append'),
    }),
};

const mockWindow = {
    addEventListener: jasmine.createSpy('addEventListener'),
    dispatchEvent: jasmine.createSpy('dispatchEvent'),
};

// Configuramos las funciones simuladas directamente
const configGameView = {
    showNewGameView: jasmine.createSpy('showNewGameView'),
};

const mainView = {
    showMainView: jasmine.createSpy('showMainView'),
};

// Sobrescribimos el objeto global con nuestros mocks
global.document = mockDocument;
global.window = mockWindow;
global.configGameView = configGameView;
global.mainView = mainView;

describe('Router Tests', () => {
    beforeEach(() => {
        jasmine.clearAllSpyObjects(); // Limpiamos los mocks antes de cada test
    });

    it("should navigate to newGame and call showNewGameView", () => {
        navigateTo('newGame');
        expect(mockDocument.getElementById).toHaveBeenCalledWith('main-view');
        expect(configGameView.showNewGameView).toHaveBeenCalled();
    });

    it('should navigate to home and call showMainView', () => {
        navigateTo('home');
        expect(mockDocument.getElementById).toHaveBeenCalledWith('main-view');
        expect(mainView.showMainView).toHaveBeenCalled();
    });

    it('should navigate to an unknown route and call showMainView', () => {
        navigateTo('unknownRoute');
        expect(mockDocument.getElementById).toHaveBeenCalledWith('main-view');
        expect(mainView.showMainView).toHaveBeenCalled();
    });

    it('should handle popstate event and call navigateTo with route nuevaPartida', () => {
        mockWindow.dispatchEvent(new Event('popstate'));
        expect(navigateTo).toHaveBeenCalledWith('nuevaPartida');
    });
});
