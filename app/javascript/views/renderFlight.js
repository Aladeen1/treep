import { matchAirlinesCode } from './flightView';
import { elements } from './base';

export const renderReturnFlights = (flight, airportCodes) => {
  let returnade = []
  let go = []
  flight.route.forEach( route => {
  	if (route.return === 0) {
  		go.push(route);
  	} else if (route.return === 1) {
  		returnade.push(route);
  	}
  })

  const retourDepart = returnade[0]
  const retourArrivee = returnade[returnade.length - 1]
  const airlines = matchAirlinesCode(flight, airportCodes);

  const allerInfo  = departArriveeTime(go);
  const retourInfo = departArriveeTime(returnade);



  const allerInfoFormatted = getFormattedTime(allerInfo[0], allerInfo[1])
  const retourInfoFormatted = getFormattedTime(retourInfo[0], retourInfo[1])
  
  rendouz(flight, airlines, allerInfoFormatted, retourInfoFormatted, retourDepart, retourArrivee, allerInfo[0], allerInfo[1], retourInfo[0], retourInfo[1], go, returnade)
 
}


function rendouz(flight, airlines, allerInfoFormatted, retourInfoFormatted, retourDepart, retourArrivee, allerDepartDay, allerArrivalDay, retourDepartDay, retourArrivalDay, routesAller, routesRetour) {
	const markup = `

	  <li class="flight__card">

          <div class="flight__flex">
	          <div class="flight__card__container">

	          <div class="flight__card__header">
		        <p>${(airlines.length > 1) ? airlines.join(' - '): airlines[0]}<p>
		      </div>
				  <div class="flight__card__div">
		                 
					    <img src="https://images.kiwi.com/airlines/64/${flight.airlines[0]}.png ">

						<div class="flight__card__div__info">
						    <div class="flight__card__info__depart">
						      <div class="flight__card__depart__code__heure">
						        <p>${flight.flyFrom}</p>
						        <p class="heure">${allerInfoFormatted[0]}:${allerInfoFormatted[1]}</p>
						      </div>
						      <div class="flight__card__depart__nom__airport">
			                    <p>Charles de Gaulle</p>
						      </div>
						    </div>

						    <div class="flight__card__duree__trajet">
			                  <p>${flight.fly_duration}</p>
			                  <div class="straight"></div>
			                  <p>${getTransferNumber(routesAller)}</p>
						    </div>

						    <div class="flight__card__info__arrivee">
						      <div class="flight__card__arrivee__code__heure">
						        <p>${flight.flyTo}</p>
						        <div class="flight__schedule">
						        	<p class="heure">${allerInfoFormatted[2]}:${allerInfoFormatted[3]}</p>
						        	<p class="flight__days__added">${(allerArrivalDay.getDate() - allerDepartDay.getDate() > 0) ? "+" + `${(allerArrivalDay.getDate() - allerDepartDay.getDate())}`: ""}</p>
						        </div>
						      </div>
						      <div class="flight__card__arrivee__nom__airport">
						        <p>Denpasar Aiport</p>
						      </div>
						    </div>
					    </div>

				  </div>

				  <div class="flight__card__div">

					    <img src="https://images.kiwi.com/airlines/64/${flight.airlines[0]}.png ">

					    <div class="flight__card__div__info">
						    <div class="flight__card__info__depart">
						      <div class="flight__card__depart__code__heure">
						        <p>${retourDepart.flyFrom}</p>
						        <p class="heure">${retourInfoFormatted[0]}:${retourInfoFormatted[1]}</p>
						      </div>
						      <div class="flight__card__depart__nom__airport">
						        <p>Denpasar Airport</p>
						      </div>
						    </div>

						    <div class="flight__card__duree__trajet">
						      <p>${flight.return_duration}</p>
						      <div class="straight"></div>
			                  <p>${getTransferNumber(routesRetour)}</p>
						    </div>

						    <div class="flight__card__info__arrivee">
						      <div class="flight__card__arrivee__code__heure">
						        <p>${retourArrivee.flyTo}</p>
						        <div class="flight__schedule">
						        	<p class="heure">${retourInfoFormatted[2]}:${retourInfoFormatted[3]}</p>
						        	<p class="flight__days__added">${(retourArrivalDay.getDate() - retourDepartDay.getDate() > 0) ? "+" + `${(retourArrivalDay.getDate() - retourDepartDay.getDate())}`: ""}</p>
						        </div>
						      </div>
						      <div class="flight__card__arrivee__nom__airport">
						        <p>Charles de Gaulle</p>
						      </div>
						    </div>
					    </div>

				  </div>
				  <div class="details__div"><button class="checkout__button" id="details">Détails</button></div>
			  </div>


			  <div class="flight__card__checkout">
				  <p class="flight__price">${flight.price}€</p>
		          <a href=${flight.deep_link} target="_blank" class="flight__card__link_target"><button  class="checkout__button">Sélectionner</button></a>
			  </div>
		  </div>
		  
	  </li>
	`

	elements.displayFlights.insertAdjacentHTML('beforeend', markup)
}


const getTransferNumber = route => {
  let transferNumber;

  if (route.length === 2) {
    transferNumber = '1 escale';
  } else if (route.length > 2) {
    transferNumber = `${route.length - 1} escales`;
  } else if (route.length === 1) {
    transferNumber = 'direct';
  }
  return transferNumber
}




function departArriveeTime(routes) {
  
  let depart = routes[0];
  let arrivee = routes[routes.length - 1];

  const allerDepart = new Date(depart.dTime * 1000);
  const allerArrivee = new Date(arrivee.aTime * 1000);
  
  return [allerDepart, allerArrivee]
}

function getFormattedTime(departureTime, arrivalTime) {

    const departureMinutes = departureTime.toString().split(" ")[4].split(":")[1];
	const departureHours = departureTime.toString().split(" ")[4].split(":")[0];
	const arrivalMinutes = arrivalTime.toString().split(" ")[4].split(":")[1];
	const arrivalHours = arrivalTime.toString().split(" ")[4].split(":")[0];
	

	return [departureHours, departureMinutes, arrivalHours, arrivalMinutes]
}



// const arrivalTime = new Date(flight.aTime * 1000);
// const arrivalMinutes = arrivalTime.toString().split(" ")[4].split(":")[1];
// const arrivalHours = arrivalTime.toString().split(" ")[4].split(":")[0];

// const departureTime = new Date(flight.dTime * 1000);
// const departureMinutes = departureTime.toString().split(" ")[4].split(":")[1];
// const departureHours = departureTime.toString().split(" ")[4].split(":")[0];