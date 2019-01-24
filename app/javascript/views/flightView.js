import { elements } from './base';


export const renderFlight = (flight, airportCodes) => {

  const arrivalTime = new Date(flight.aTime * 1000);
  const departureTime = new Date(flight.dTime * 1000);
  const arrivalMinutes = arrivalTime.toString().split(" ")[4].split(":")[1];
  const arrivalHours = arrivalTime.toString().split(" ")[4].split(":")[0];
  const departureMinutes = departureTime.toString().split(" ")[4].split(":")[1];
  const departureHours = departureTime.toString().split(" ")[4].split(":")[0];
  const airlines = matchAirlinesCode(flight, airportCodes);

  const markup = `
    <li class="flight__card">
      <img src="https://images.kiwi.com/airlines/64/${flight.airlines[0]}.png ">
      <p>${(airlines.length > 1) ? airlines.join(' - '): airlines[0]}<p>
      <div class="flight__schedule">
        <p>${departureHours}:${departureMinutes} - ${arrivalHours}:${arrivalMinutes}</p>
        <p class="flight__days__added">${(arrivalTime.getDate() - departureTime.getDate() > 0) ? "+" + `${(arrivalTime.getDate() - departureTime.getDate())}`: ""}</p>
      </div>
      <div class="flight__duration__code">
      <p>${flight.fly_duration}</p>
      <p>${flight.flyFrom}-${flight.flyTo}</p>
      </div>
      <p>${getTransferNumber(flight)}</p>
      <p>${flight.price}€</p>
      <a href=${flight.deep_link} target="_blank"><button>Sélectionner</button></a>
    </li>
  `;
  elements.displayFlights.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = (flights, airportCodes) => {
    // render results of current page
    flights.slice(0, 10).forEach( flight => {
      renderFlight(flight, airportCodes)
    });
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

const matchAirlinesCode = (flight, airportCodes) => {
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
