import { resetCarton, markNumberInCardCPU } from '../src/views/gameView.js';

describe('Game View', function () {
    
      
    it('debe eliminar la clase "marcado" de todos los números en una caja', () => {
        // Crear un cartón de prueba con algunos números marcados
        const carton = document.createElement('div');
        carton.classList.add('carton');

        for (let i = 1; i <= 5; i++) {
            const filaElement = document.createElement('div');
            filaElement.classList.add('fila');

            for (let j = 1; j <= 5; j++) {
                const numberElement = document.createElement('div');
                numberElement.classList.add('number', 'marcado');
                numberElement.textContent = (i - 1) * 5 + j;
                filaElement.appendChild(numberElement);
            }

            carton.appendChild(filaElement);
        }

        // Llamar a la función resetCarton con el cartón de prueba
        resetCarton([carton]);

        // Verificar que todos los números tengan la clase "marcado" removida
        const numbers = carton.querySelectorAll('.number');
        numbers.forEach(number => {
            expect(number.classList.contains('marcado')).toBeFalsy();
        });
    });

    it('no debe afectar a otros elementos con clase "número" fuera de la caja', () => {
        // Crear un elemento fuera del cartón con la clase "number"
        const outsideNumber = document.createElement('div');
        outsideNumber.classList.add('number', 'marcado');

        // Llamar a la función resetCarton con un cartón vacío
        resetCarton([]);

        // Verificar que el elemento fuera del cartón no se ve afectado
        expect(outsideNumber.classList.contains('marcado')).toBeTruthy();
    });
});
