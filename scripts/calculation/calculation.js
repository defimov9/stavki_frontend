const form = document.querySelector('.form');
const submitBtn = document.querySelector('.form__button');
const formFields = form.querySelectorAll('.form__input');

const weightField = form.querySelector('#weight');
const dateField = document.querySelector('#date');
const cityField = document.querySelector('#city');

const searchList = document.querySelector('.search-list');

dateField.style.color = 'white';

dateField.addEventListener('change', () => {
    dateField.style.color = 'black';
})

let checkDate = () => {
    const error = document.querySelector('#error-date');
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    let maxDate = `${yyyy + 1}-${mm}-${dd}`;
    dateField.setAttribute("min", today);
    dateField.setAttribute("max", maxDate);
    if (dateField.validity.valid) {
        error.textContent = "";
        return true;
    } else {
        error.textContent = "Введена некорректная дата";
        return false;
    }
};

const checkWeight = () => {
    const error = document.querySelector('#error-weight');
    const weight = weightField.value;
    if (weight > 40) {
        error.textContent = "Вес груза не может превышать 40 тонн";
        weightField.style.borderColor = "#F62933";
        return false;
    } else {
        error.textContent = "";
        weightField.style.borderColor = "#E7E9F2";
        return true;
    }
};

let currWeightValue = weightField.value;
let currCityValue = cityField.value;

const checkForm = () => {
    let result = checkWeight() + checkDate();
    if (result == 2) {
        return true;
    } else {
        return false;
    }
};

form.addEventListener("input", (event) => {
    if (checkForm()) {
        if (Array.prototype.every.call(formFields, field => field.value)) {
            submitBtn.disabled = false;
        }
    } else {
        submitBtn.disabled = true;
    }
});

const getPrice = async function (weightValue, cityValue) {
    fetch(`https://localhost:7181/Api/DAL/Requests/GetRequestSum?weight=${weightValue}&city=${cityValue}`)
        .then(res => res.json())
        .then(response => {
            const price = document.querySelector('.total__price');
            price.textContent = response + ' руб.';
        })
        .catch(error => console.error('Error:', error));
}



form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (currCityValue == cityField.value && currWeightValue == weightField.value) {
        return;
    }
    currWeightValue = weightField.value;
    currCityValue = cityField.value;
    getPrice(currWeightValue, currCityValue);
});

const getCities = async function (value) {
    fetch('https://localhost:7181/Api/DAL/Stavki/GetAllPuncts')
        .then(res => res.json())
        .then(response => {
            let filteredCities = response.sort((a, b) => {
                if (a[0].toLowerCase() < b[0].toLowerCase()) {
                    return -1;
                }
                if (a[0].toLowerCase() > b[0].toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            filteredCities = filteredCities.filter(element => {
                if (element.slice(0, value.length).toLowerCase().includes(value.toLowerCase())) {
                    return element;
                }
            });
            if (filteredCities.length == 0) {
                searchList.style.display = 'none';
                return
            } else {
                filteredCities.forEach(element => {
                    searchList.insertAdjacentHTML('beforeend', 
                    `<li class="search-list__item">${element}</li>`);
                });
                searchList.style.display = 'flex';
            }
            let searchListItems = document.querySelectorAll('.search-list__item');
            searchListItems.forEach(element => {
                element.addEventListener('click', () => {
                    cityField.value = element.textContent.trim() || element.innerText.trim();
                    searchList.style.display = 'none';
                });
            });
            
        })
        .catch(error => console.error('Error:', error));
}

cityField.addEventListener('input', () => {
    searchList.textContent = '';
    getCities(cityField.value);
});
