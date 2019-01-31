export const elements = {
    searchForm: document.querySelector('.search'),
    searchDepartInput: document.querySelector('#departLoc__search'),
    searchReturnInput: document.querySelector('#returnLoc__search'),
    searchDepartDateFrom: document.querySelector('#departDate__search'),
    searchReturnDateFrom: document.querySelector('#returnDate__search'),
    searchResDepart: document.querySelector('.resultsDepart'),
    searchResReturn: document.querySelector('.resultsReturn'),
    searchPassengers: document.getElementById('passengers'),
    searchFlightType: document.getElementById('flight_type'),
    displayFlights: document.querySelector('.flights__list'),
    displayOptions: document.querySelector('.flights__options')
};

export const proxy = 'https://cors-anywhere.herokuapp.com/';
export const search = document.getElementById('searchPage');
// export const searchOptions = (ID) => {
//   const search`${ID}` = document.getElementById(ID);
//   return search`${ID}`
// }




