const prevButton = document.querySelector('.table__control_previous');
const nextButton = document.querySelector('.table__control_next');
const tableBody = document.querySelector('.table__body');
const tableHeaders = document.querySelectorAll('.table__heading');
const tableControls = document.querySelector('.table__controls-container');
const pageInControls = document.querySelector('.table__page');
const contentTable = document.querySelector('.content__table');
const contentRequest = document.querySelector('.content__request');
const backButton = document.querySelector('.request__back');
const statusField = document.querySelector('.request__status');
const searchField = document.querySelector('.requests__search-field');


backButton.addEventListener('click', () => {
    contentTable.style.display = 'block';
    contentRequest.style.display = 'none';
    tableBody.textContent = '';
    getData(currPage);
});

const addPageAndPosition = (data) => {
    let posititon = 0;
    let page = 0;
    for (elem of data) {
        if (posititon == 9) {
            posititon = 0;
            page += 1;
        }
        elem.page = page;
        elem.posititon = posititon;
        posititon++;
    }
};

const renderTable = (page, data) => {
    if(data.length == 0) return;
    pageInControls.textContent = page + 1;
    if (data[data.length - 1].page == page) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
    data.forEach(elem => {
        if (elem.page == page) {
            let requestStatus = ''
            if (elem.status == 0) {
                requestStatus = `<td class="table__content table__content_status">
                                    <span class="table__status table__status_created">Создана</span>
                                </td>`;
            } else if (elem.status == 1) {
                requestStatus = `<td class="table__content table__content_status">
                                    <span class="table__status table__status_working">В работе</span>
                                </td>`;
            } else {
                requestStatus = `<td class="table__content table__content_status">
                                    <span class="table__status table__status_done">Выполнена</span>
                                </td>`;
            }
            tableBody.insertAdjacentHTML('beforeend',
                `<tr class="table__row">
                    <td class="table__content table__content_id">${elem.id}</td>
                    ${requestStatus}
                    <td class="table__content table__content_client">${elem.client.company}</td>
                    <td class="table__content table__content_from">${elem.departureCity}</td>
                    <td class="table__content table__content_to">${elem.arrivalCity}</td>
                    <td class="table__content table__content_responsible">${elem.responsible}.</td>
                </tr>`
            );
        }
    });
    const tableRows = tableBody.querySelectorAll('.table__row');
    tableRows.forEach(elem => {
        elem.addEventListener('click', () => {
            contentTable.style.display = 'none';
            contentRequest.style.display = 'block';
            let id = elem.querySelector('.table__content_id').textContent;
            getRequest(id);
        });
    });
};

const getData = async function (currPage, search) {
    try {
        const response = await fetch('https://localhost:7181/Api/DAL/Requests/GetAllRequests');
        let data = await response.json();
        if (search != undefined) {
            data = data.filter(elem => {
				if (elem.client.company.toLowerCase().includes(search.toLowerCase()) || String(elem.id).includes(search)) {
					return elem;
				}
			});
        }
        addPageAndPosition(data);
        renderTable(currPage, data);
    } catch (error) {
        console.error(error);
    }
}

let currPage = 0;

getData(currPage)

const getRequest = async function (requestId) {
    try {
        const response = await fetch('https://localhost:7181/Api/DAL/Requests/GetAllRequests');
        const data = await response.json();
        let request;
        data.forEach(elem => {
            if (elem.id == requestId) {
                request = elem;
                renderRequest(request);
            }
        });

    } catch (error) {
        console.error(error);
    }
}

const renderRequest = (request) => {
    const statusField = document.querySelector('.request__status');
    const requestId = contentRequest.querySelector('.content__heading');
    const date = document.querySelector('.request__date');
    date.textContent = `Дата создания: ${request.departureDate}`;
    requestId.textContent = `Заявка №${request.id}`
    statusField.value = request.status;
    const infoFields = document.querySelectorAll('.request__info');
    infoFields[0].textContent = `${request.client.surname} ${request.client.name} ${request.client.patronymic}`;
    infoFields[1].textContent = request.client.phoneNumber;
    infoFields[2].textContent = request.client.company;
    infoFields[3].textContent = request.departureCity;
    infoFields[4].textContent = request.arrivalCity;
    infoFields[5].textContent = request.containerSize + ' футов';
    infoFields[6].textContent = request.cargoWeight + ' т';
    infoFields[7].textContent = request.price  + ' руб.';
    infoFields[8].textContent = request.responsible + '.';
    infoFields[9].textContent = request.comment;
};

const changeStatus = async function (id, status) {
    fetch(`https://localhost:7181/Api/DAL/Requests/ChangeStatus?id=${id}&status=${status}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    })
        .catch(error => console.error('Error:', error));
}


statusField.addEventListener('change', () => {
    let requestTitle = contentRequest.querySelector('.content__heading').textContent.split(" ");
    let id = requestTitle[1].replace('№', '');
    changeStatus(id, statusField.value);
});

searchField.addEventListener('input', async () => {
    let nothing = document.querySelector('.nothing-to-show');
	currPage = 0;
	tableBody.textContent = '';
	await getData(currPage, searchField.value);
	const rows = tableBody.querySelectorAll('.table__row');
	if (rows.length == 0) {
		tableBody.style.display = 'none';
		nothing.style.display = 'flex';
	} else {
		tableBody.style.display = 'table-row-group';
		nothing.style.display = 'none';
	}
});