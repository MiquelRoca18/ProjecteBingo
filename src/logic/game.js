export { createBombo, getDrumNumber, createMarkedList, shuffleBombo };

function createMarkedList() {
    const markedList = Array.from({ length: 75 }, () => false);
    return markedList;
}


function createBombo() {
    const bombo = Array.from({ length: 75 }, (_, index) => index + 1);
    const shuffledBombo = shuffleBombo([...bombo]);  // Crear una copia antes de mezclar
    return shuffledBombo;
}

function shuffleBombo(bombo) {
    const shuffledBombo = [...bombo];
    for (let i = shuffledBombo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledBombo[i], shuffledBombo[j]] = [shuffledBombo[j], shuffledBombo[i]];
    }
    return shuffledBombo;
}


function getDrumNumber(bombo) {
    if (bombo.length > 0) {
        return bombo.pop();
    } else {
        console.error('El bombo está vacío.');
        return null;
    }
}
