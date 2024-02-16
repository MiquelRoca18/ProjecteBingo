export { createBombo, getDrumNumber, createMarkedList, shuffleBombo };

function createMarkedList() {
    try {
        return Array.from({ length: 75 }, () => false);
    } catch (error) {
        console.error('Error en createMarkedList:', error);
        return [];
    }
}

function createBombo() {
    try {
        const bombo = Array.from({ length: 75 }, (_, index) => index + 1);
        const shuffledBombo = shuffleBombo([...bombo]);
        return shuffledBombo;
    } catch (error) {
        console.error('Error en createBombo:', error);
        return [];
    }
}

function shuffleBombo(bombo) {
    try {
        const shuffledBombo = [...bombo];
        for (let i = shuffledBombo.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledBombo[i], shuffledBombo[j]] = [shuffledBombo[j], shuffledBombo[i]];
        }
        return shuffledBombo;
    } catch (error) {
        console.error('Error en shuffleBombo:', error);
        return [];
    }
}

function getDrumNumber(bombo) {
    try {
        if (bombo.length > 0) {
            return bombo.pop();
        } else {
            console.error('El bombo está vacío.');
            return null;
        }
    } catch (error) {
        console.error('Error en getDrumNumber:', error);
        return null;
    }
}
