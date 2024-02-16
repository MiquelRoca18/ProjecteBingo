export {isUserLoggedIn};
function isUserLoggedIn() {
    const accessToken = localStorage.getItem('access_token');
    const expirationDate = localStorage.getItem('expirationDate');

    if (accessToken && expirationDate) {
        // Verificar si la fecha de expiración no ha pasado
        return Date.now() / 1000 < expirationDate;
    }

    return false;
}