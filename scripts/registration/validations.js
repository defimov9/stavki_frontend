const registrationForm = document.querySelector('#registration-form');
const submitBtn = document.querySelector('#submitBtn');
const formFields = registrationForm.querySelectorAll('input');


const fullNameField = document.querySelector('#full-name'),
    phoneField = document.querySelector('#phone'),
    innField = document.querySelector('#inn'),
    passwordField = document.querySelector('#register-password'),
    repeatPasswordField = document.querySelector('#register-password-repeat');


registrationForm.addEventListener("input", (event) => {
    if (Array.prototype.every.call(formFields, field => field.value)) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
});

fullNameField.addEventListener('change', (evt) => {
    const error = document.querySelector('#error-fullname');
    const fullNameValue = fullNameField.value;
    const pattern = /^[a-zA-Zа-яА-Я]+ [a-zA-Zа-яА-Я]+ [a-zA-Zа-яА-Я]+$/;
    if (!fullNameValue.match(pattern) && fullNameValue != '') {
        error.textContent = "Введите корректное ФИО";
    } else {
        error.textContent = "";
    }
});

phoneField.addEventListener('change', (evt) => {
    const error = document.querySelector('#error-phone');
    const phoneValue = phoneField.value;
    const pattern = /^(\+7|8)\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/;
    if (!phoneValue.match(pattern) && phoneValue != '') {
        error.textContent = "Введите корректный номер телефона";
    } else {
        error.textContent = "";
    }
});

innField.addEventListener('change', (evt) => {
    const error = document.querySelector('#error-inn');
    const innValue = innField.value;
    if (innValue.length != 10 && innValue != '') {
        error.textContent = "Введите корректный ИНН";
    } else {
        error.textContent = "";
    }
});

repeatPasswordField.addEventListener('change', (evt) => {
    const error = document.querySelector('#error-password');
    const passValue = passwordField.value;
    const repeatValue = repeatPasswordField.value;
    if (passValue != repeatValue) {
        error.textContent = "Пароли не совпадают";
    } else {
        error.textContent = "";
    }
});

passwordField.addEventListener('change', (evt) => {
    const error = document.querySelector('#error-password');
    const passValue = passwordField.value;
    const repeatValue = repeatPasswordField.value;
    if (passValue != '') {
        repeatPasswordField.disabled = false;
        if (passValue != repeatValue && repeatValue != '') {
            error.textContent = "Пароли не совпадают";
        } else {
            error.textContent = "";
        }
    } else {
        repeatPasswordField.disabled = true;
        repeatPasswordField.value = "";
    }
});

