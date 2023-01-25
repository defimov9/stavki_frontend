const showPassInLogin = document.querySelector('.password-in-login'),
    passInLogin = document.querySelector('#login-password');

const showPassInRegister = document.querySelector('.password-in-register'),
    passInRegister = document.querySelector('#register-password');

const showPassInRegisterAgain = document.querySelector('.password-repeat'),
    passInRegisterAgain = document.querySelector('#register-password-repeat');


const showPass = (inputField, showPassButton) => {
    showPassButton.addEventListener('mousedown', () => {
        inputField.setAttribute('type', 'text');
    });
    
    showPassButton.addEventListener('mouseup', () => {
        inputField.setAttribute('type', 'password');
    });
};


showPass(passInLogin, showPassInLogin);
showPass(passInRegister, showPassInRegister);
showPass(passInRegisterAgain, showPassInRegisterAgain);
