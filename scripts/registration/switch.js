const loginSwitch = document.querySelector('#login'),
    registrationSwitch = document.querySelector('#registration');

const loginForm = document.querySelector('.login'),
    registrarionForm = document.querySelector('.registration');

const authWindow = document.querySelector('.auth-window');

registrationSwitch.addEventListener('click', () => {
    registrationSwitch.classList.add('auth-window__switch_active');
    loginSwitch.classList.remove('auth-window__switch_active');
    registrarionForm.style.display = 'block';
    loginForm.style.display = 'none';
    authWindow.classList.add('auth-window_registration');
    registrarionForm.classList.add('show');
});

loginSwitch.addEventListener('click', () => {
    loginSwitch.classList.add('auth-window__switch_active');
    registrationSwitch.classList.remove('auth-window__switch_active');
    loginForm.style.display = 'flex';
    registrarionForm.style.display = 'none';
    authWindow.classList.remove('auth-window_registration');
    loginForm.classList.add('show');
});