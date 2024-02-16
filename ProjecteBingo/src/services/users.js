import {loginSupabase, signUpSupabase, logoutSupabase} from './http.js'
export {loginUser, registerUser, logout};
function expirationDate(expires_in) {
    return Math.floor(Date.now() / 1000) + expires_in;
    localStorage.setItem('expirationDate', expirationDate);
  }
  
  async function loginUser(email, password) {
    const status = { success: false };
    try {
      const dataLogin = await loginSupabase(email, password);
      console.log("DataLogin "+ dataLogin);
      const username = dataLogin.user.email.split('@')[0];
      localStorage.setItem('username', username);
      localStorage.setItem('access_token', dataLogin.access_token);
      localStorage.setItem('uid', dataLogin.user.id);
      localStorage.setItem('expirationDate', expirationDate(dataLogin.expires_in));
      status.success = true;
    } catch (err) {
      console.log(err);
      status.success = false;
      status.errorText = err.error_description;
    }
  
    return status;
  }

  function registerUser(email, password) {
    const status = { success: false };
    try {
      signUpSupabase(email, password).then((dataRegister) => {
        console.log(dataRegister);
        status.success = true;
      }).catch((err) => {
        if (err.code === 429) {
          status.success = false;
          status.errorText = 'Límite de velocidad de correo electrónico excedido. Inténtalo de nuevo más tarde.';
        } else {
          console.log(err);
          status.success = false;
          status.errorText = err.error_description;
        }
      });
    } catch (err) {
      console.log(err);
      status.success = false;
      status.errorText = err.error_description;
    }
    return status;
  }

  function logout() {
    logoutSupabase(localStorage.getItem('access_token')).then((lOData) => {
      console.log(lOData);
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('uid');
  }
  