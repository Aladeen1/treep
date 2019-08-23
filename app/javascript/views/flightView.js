import { elements } from './base';
import { renderReturnFlights } from './renderFlight';

export const renderResults = (flights, airportCodes) => {
  // render results of current page
  createFlightsAnchor();
  if (flights.length === 0) {
    document.querySelector('.flights__list').insertAdjacentHTML('beforeend', 'Pas de résultat disponible pour cette recherche .. suddy');
  } else {
    flights.slice(0, 10).forEach( (flight, id) => {
      renderReturnFlights(flight, airportCodes, id)
    });
  }
};

export const getAirportCode = input => {
  let code = input.split(' ');
  const index = code.length - 1;
  code = code[index];
  return code;
}

const getTransferNumber = flight => {
  let transferNumber;

  if (flight.route.length === 2) {
    transferNumber = '1 escale';
  } else if (flight.route.length > 2) {
    transferNumber = `${flight.route.length - 1} escales`;
  } else if (flight.route.length === 1) {
    transferNumber = 'direct';
  }
  return transferNumber
} 

export const matchAirlinesCode = (flight, airportCodes) => {
  let name = [];
  if (flight.airlines.length > 1) {
    flight.airlines.forEach( airline => {
      let nomDeLaCompagnie = airportCodes.find(el => el.id === airline);
      nomDeLaCompagnie = nomDeLaCompagnie.name;
      name.push(nomDeLaCompagnie);
    })
  } else {
    let nomDeLaCompagnie = airportCodes.find(el => el.id === flight.airlines[0]);
    nomDeLaCompagnie = nomDeLaCompagnie.name;
    name.push(nomDeLaCompagnie);
  }
  return name
}

function createFlightsAnchor() {

    const markup = `
      <div class="flights__display">
        <ul class="flights__list"></ul>
      </div>
    `
    document.querySelector('.flights__second__container').insertAdjacentHTML('beforeend', markup)
}

























