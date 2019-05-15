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
    displayOptions: document.querySelector('.flights__options'),
    searchContainer: document.querySelector('.flights__container')
};

export const proxy = 'https://cors-anywhere.herokuapp.com/';
export const search = document.getElementById('searchPage');

export const renderLoader = (parent) => {

    const loader = `
        <div class="center__loader">
            <img class="loader" src="https://res.cloudinary.com/tark-industries/image/upload/v1556034462/Spinner1.png">
        </div>
    `
    parent.insertAdjacentHTML('afterbegin', loader)  
};

export const clearLoader = (parent) => {
    parent.innerHTML = '';
};

// return true if the flight is a return flight

export const flightType = flight => {
    if (flight.routes.length >= 2) {
        return true 
    } else {
        return false
    }
}

// Create functions to handle money

export const toCents = (number) => {
    return number * 100
}

export const toHumanPrice = (number) => {
    return (number / 100).toFixed(2)
}

