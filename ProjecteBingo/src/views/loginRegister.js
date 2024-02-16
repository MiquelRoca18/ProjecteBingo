import { navigateTo } from '../routers/router.js';
import { loginUser, registerUser } from '../services/users.js';

export { crearHTMLSupabase };

function crearHTMLSupabase(mainContent) {
    try {
        if (!mainContent) {
            console.error('Main content container is null or undefined');
            return;
        }

        mainContent.innerHTML = `
            <div>
                <button id="registroButton">Registro</button>
                <button id="inicioSesionButton">Iniciar Sesión</button>
            </div>
            <hr>
            <p id="errors"></p>
            <form id="registroForm">
                <h1>Registro</h1>
                <label for="correo">Correo:</label>
                <input type="email" id="correo" required>
                <label for="contrasena">Contraseña:</label>
                <input type="password" id="contrasena" required>
                <button type="button" id="registroBotonUser">Registrar</button>
            </form>
            <form id="inicioSesionForm">
                <h1>Iniciar Sesión</h1>
                <label for="correoLogin">Correo:</label>
                <input type="email" id="correoLogin" required>
                <label for="contrasenaLogin">Contraseña:</label>
                <input type="password" id="contrasenaLogin" required>
                <button type="button" id="iniciarSesion">Iniciar Sesión</button>
            </form>
        `;

        const addEvent = (elementId, eventType, callback) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.addEventListener(eventType, callback);
            } else {
                console.error(`Element with id "${elementId}" not found`);
            }
        };

        addEvent('registroButton', 'click', () => toggleForm('registroForm'));
        addEvent('inicioSesionButton', 'click', () => toggleForm('inicioSesionForm'));

        addEvent('iniciarSesion', 'click', async (event) => {
            try {
                event.preventDefault();
                const email = document.getElementById('correoLogin').value;
                const password = document.getElementById('contrasenaLogin').value;

                if (!email || !password) {
                    throw new Error('Email and password are required');
                }

                loginUser(email, password).then((status) => {
                    if (status.success) {
                        history.pushState({ route: 'home' }, 'Home', '/home');
                        navigateTo('home');
                    } else {
                        const errorsElement = mainContent.querySelector('#errors');
                        if (errorsElement) {
                            errorsElement.innerHTML = status.errorText;
                        }
                    }
                });
            } catch (error) {
                console.error('Error in iniciarSesion click event:', error);
            }
        });

        addEvent('registroBotonUser', 'click', async (event) => {
            try {
                event.preventDefault();
                console.log('Registro User');
                const email = document.getElementById('correo').value;
                const password = document.getElementById('contrasena').value;

                if (!email || !password) {
                    throw new Error('Email and password are required');
                }

                const dataLogin = await //(email, password);
                console.log(dataLogin);
            } catch (error) {
                console.error('Error in registroBotonUser click event:', error);
            }
        });
    } catch (error) {
        console.error('Error in crearHTMLSupabase:', error);
    }
}

function toggleForm(formId) {
    try {
        const setActiveForm = (id) => document.getElementById(id).classList.add('formulario-activo');
        const removeActiveForm = (id) => document.getElementById(id).classList.remove('formulario-activo');

        removeActiveForm('registroForm');
        removeActiveForm('inicioSesionForm');

        setActiveForm(formId);
    } catch (error) {
        console.error('Error in toggleForm:', error);
    }
}
