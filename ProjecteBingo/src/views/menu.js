import { logout } from '../services/users.js';
import { resetGame } from '../views/gameView.js';
import { navigateTo } from '../routers/router.js';

const createNavItem = (id, text, route) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = text;
    li.id = id;

    if (route) {
        a.addEventListener('click', () => {
            console.log(`${text} clicked`);
            try {
                if (text === "Logout") {
                    logout();
                }
                resetGame();
                history.pushState({ route }, text, `/${route}`);
                navigateTo(route);
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    li.appendChild(a);
    return li;
};

const createProfileNavItem = () => {
    const profileNavItem = document.createElement('li');
    const a = document.createElement('a');
    const username = localStorage.getItem('username');

    if (username) {
        a.innerHTML = `
            <img id="profileImage" src="./assets/avatar.png" alt="Profile Image" style="width: 30px; height: 30px;">
            ${username}
        `;
    }

    profileNavItem.appendChild(a);

    profileNavItem.addEventListener('click', () => {
        console.log('Profile clicked');
        try {
        } catch (error) {
            console.error('Error:', error);
        }
    });

    return profileNavItem;
};

const menu = () => {
    const nav = document.createElement('nav');
    nav.innerHTML = `<nav>
        <div>
            <div>
                <ul></ul>
            </div>
        </div>
    </nav>`;

    const ul = nav.querySelector('ul');

    ul.appendChild(createNavItem('homeNavItem', 'Home', 'home'));
    ul.appendChild(createNavItem('loginNavItem', 'Login', 'login'));
    ul.appendChild(createNavItem('registerNavItem', 'Register', 'login'));
    ul.appendChild(createNavItem('logoutNavItem', 'Logout', 'login'));
    ul.appendChild(createProfileNavItem());

    return nav;
};

export { menu };
