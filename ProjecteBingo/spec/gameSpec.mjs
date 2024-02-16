// mainViewSpec.js
import {createMarkedList, createBombo, shuffleBombo } from '../src/logic/game.js';

describe('Game Logic', () => {

    it('debe barajar el bombo al azar', () => {
        // Paso 1: Preparación del entorno de prueba
        const originalBombo = Array.from({ length: 75 }, (_, index) => index + 1);
    
        // Paso 2: Ejecución de la función
        const shuffledBombo = shuffleBombo([...originalBombo]);
    
        // Paso 3: Comprobación del resultado
        // Verifica que el resultado sea un array
        expect(Array.isArray(shuffledBombo)).toBe(true);
    
        // Verifica que todos los elementos originales estén presentes en el array devuelto
        originalBombo.forEach((number) => {
          expect(shuffledBombo).toContain(number);
        });
    
        // Verifica que el array devuelto esté mezclado de manera diferente cada vez que se ejecuta
        const secondShuffle = shuffleBombo([...originalBombo]);
        expect(secondShuffle).not.toEqual(shuffledBombo);
      });

    it('debe devolver una matriz con números del 1 al 75 en orden aleatorio', () => {
        const bombo = createBombo();
        
        // Check if the length is correct
        expect(bombo.length).toBe(75);

        // Check if all numbers from 1 to 75 are present
        const allNumbersPresent = Array.from({ length: 75 }, (_, index) => index + 1)
            .every(number => bombo.includes(number));
        expect(allNumbersPresent).toBe(true);

        // Check if the array is shuffled
        const isShuffled = bombo.some((number, index) => number !== index + 1);
        expect(isShuffled).toBe(true);
    });

    it('debe crear una lista marcada con todos los elementos establecidos en falso', () => {
        const markedList = createMarkedList();
        expect(markedList).toEqual(Array(75).fill(false));
      });
});
