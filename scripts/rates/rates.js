const prevButton = document.querySelector('.table__control_previous');
const nextButton = document.querySelector('.table__control_next');
const tableBody = document.querySelector('.table__body');
const cityButton = document.querySelector('#cityButton');
const nearIntercityButton = document.querySelector('#nearIntercityButton');
const intercityButton = document.querySelector('#intercityButton');
const table = document.querySelector('.rates__table');
const buttonsContainer = document.querySelector('.rates');
const tableHeaders = document.querySelectorAll('.table__heading');
const tableControls = document.querySelector('.table__controls-container');
const pageInControls = document.querySelector('.table__page');
const searchField = document.querySelector('.requests__search-field');
const searchBlock = document.querySelector('.requests__search');
const backButton = document.querySelector('.request__back');
const ratesButtons = document.querySelector('.rates');
const ratesTable = document.querySelector('.rates__table');
const contentHeading = document.querySelector('.content__heading');


backButton.addEventListener('click', () => {
	contentHeading.textContent = 'Ставки';
    ratesButtons.style.display = 'flex';
    ratesTable.style.display = 'none';
    tableBody.textContent = '';
	searchField.value = '';
});

const addPageAndPosition = (data) => {
	let posititon = 0;
	let page = 0;
	for (elem of data) {
		if ((!elem.do24 || !elem.ot24Do27) && (!elem.ft20)) continue;
		if (posititon == 7) {
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
			tableBody.insertAdjacentHTML('beforeend',
				`<tr class="table__row">
          <td class="table__content table__content_first">${elem.city ? elem.city : elem.distance}</td>
          <td class="table__content">${elem.do24 ? elem.do24 : elem.ft20} руб.</td>
          <td class="table__content">${elem.ot24Do27 ? elem.ot24Do27 : elem.ft40} руб.</td>
          <td class="table__content">${elem.ot27 ? elem.ot27 : elem.ot24Do30Tn} руб.</td>
      </tr>`);
		}
	});
};

const getData = async function (currPage, api, search) {
	try {
		const response = await fetch(`https://localhost:7181/Api/DAL/Stavki/${api}`);
		let data = await response.json();
		if (search != undefined) {
			data = data.filter(elem => {
				if (elem.city.slice(0, search.length).toLowerCase().includes(search.toLowerCase())) {
					return elem;
				}
			});
		}
		addPageAndPosition(data);
		renderTable(currPage, data);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

let currPage = 0;
let currApi = '';


cityButton.addEventListener('click', () => {
	contentHeading.textContent = 'Город';
	searchBlock.style.display = 'none';
	buttonsContainer.style.display = 'none';
	table.style.display = 'block';
	tableHeaders[0].textContent = 'Расстояние перевозки, км';
	currApi = 'Gorod';
	getData(currPage, currApi);
});

nearIntercityButton.addEventListener('click', () => {
	contentHeading.textContent = 'Ближний межгород';
	searchBlock.style.display = 'flex';
	buttonsContainer.style.display = 'none';
	table.style.display = 'block';
	tableHeaders[0].textContent = 'Город';
	currApi = 'BlizMezhGorod';
	getData(currPage, currApi);
});

intercityButton.addEventListener('click', () => {
	contentHeading.textContent = 'Межгород';
	searchBlock.style.display = 'flex';
	buttonsContainer.style.display = 'none';
	table.style.display = 'block';
	tableHeaders[0].textContent = 'Город';
	currApi = 'Mezhgorod';
	getData(currPage, currApi);
});

nextButton.addEventListener('click', () => {
	const tableRows = document.querySelectorAll('.table__row');
	tableRows.forEach(element => {
		tableBody.removeChild(element);
	});
	currPage++;
	if (currPage != 0) {
		prevButton.disabled = false;
	}
	getData(currPage, currApi);
});

prevButton.addEventListener('click', () => {
	const tableRows = document.querySelectorAll('.table__row');
	tableRows.forEach(element => {
		tableBody.removeChild(element);
	});
	currPage--;
	if (currPage == 0) {
		prevButton.disabled = true;
		nextButton.disabled = false;
	}
	getData(currPage, currApi);
});

searchField.addEventListener('input', async () => {
	let nothing = document.querySelector('.nothing-to-show');
	currPage = 0;
	tableBody.textContent = '';
	await getData(currPage, currApi, searchField.value);
	const rows = tableBody.querySelectorAll('.table__row');
	if (rows.length == 0) {
		tableBody.style.display = 'none';
		nothing.style.display = 'flex';
	} else {
		tableBody.style.display = 'table-row-group';
		nothing.style.display = 'none';
	}
});
