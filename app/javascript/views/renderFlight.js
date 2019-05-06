import { matchAirlinesCode } from './flightView';
import { elements } from './base';
import { markupDetails, markupRoute, calculateEcoWidth } from './renderDetails';

export const renderReturnFlights = (flight, airportCodes, id) => {
  let returnade = []
  let go = []
  flight.route.forEach( route => {
  	if (route.return === 0) {
  		go.push(route);
  	} else if (route.return === 1) {
  		returnade.push(route);
  	}
  })

  const airlines = matchAirlinesCode(flight, airportCodes);
  const allerInfo  = departArriveeTime(go);
  const allerInfoFormatted = getFormattedTime(allerInfo[0], allerInfo[1])

  if (returnade.length != 0) {
  	const retourDepart = returnade[0]
    const retourArrivee = returnade[returnade.length - 1]
    const retourInfo = departArriveeTime(returnade)
    const  retourInfoFormatted = getFormattedTime(retourInfo[0], retourInfo[1])
    render(flight, airlines, allerInfoFormatted, allerInfo[0], allerInfo[1], go, id, retourInfoFormatted, retourDepart, retourArrivee, retourInfo[0], retourInfo[1], returnade)
  } else {


  	render(flight, airlines, allerInfoFormatted, allerInfo[0], allerInfo[1], go, id)
  }
}


function render(flight, airlines, allerInfoFormatted, allerDepartDay, allerArrivalDay, routesAller, id, retourInfoFormatted = [], retourDepart = 0, retourArrivee = 0, retourDepartDay = [], retourArrivalDay = [], routesRetour = []) {

	const markup = `

	  <li class="flight__card">


          <div style="display:flex;width: 100%;">
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
			                    <p>Aiport name</p>
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
						        <p>Airport name</p>
						      </div>
						    </div>
					    </div>

				  </div>

                  ${(retourDepart != 0) ? createMarkupRetour(flight, retourInfoFormatted, routesRetour, retourDepart, retourArrivee, retourDepartDay, retourArrivalDay) : ''}

				  <div class="details__div">
				  <button class="checkout__button" id="details" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="false" aria-controls="collapse-${id}">Détails</button>
				  ${graphDetteEco(flight)}

				  </div>
			  </div>


			  <div class="flight__card__checkout back">
          <div class="flight__info">
            <img src="https://res.cloudinary.com/tark-industries/image/upload/v1556035926/Ticketinfo.png">
          </div>
				  <p class="flight__price">${flight.price}€</p>
				  <div class="${flight.id}">
		          <a href=${flight.deep_link} target="_blank" class="flight__card__link_target"><button  class="checkout__button redirection__target">Sélectionner</button></a>
		          </div>
			  </div>
	    </div>
		  ${markupDetails(flight, id)}
	  </li>
	`

	document.querySelector('.flights__list').insertAdjacentHTML('beforeend', markup)

}

function graphDetteEco(flight) {
	
    const width = calculateEcoWidth(flight.treepDetteEcologique, flight.treepCompensation);

	const markup = `
		<div class="dette__infographie__container__front">
		  	<div class="dette__infographie__skyparticipation" style="width: 35%;">${flight.treepCompensation}€</div>
		  	<div class="dette__infographie__reste" style="width: 65%;">${flight.treepDetteUser}€</div>
		</div>
	`
	return markup
}



function createMarkupRetour(flight, retourInfoFormatted, routesRetour, retourDepart,  retourArrivee, retourDepartDay, retourArrivalDay ) {
  const markupRetour = `
		<div class="flight__card__div">

		    <img src="https://images.kiwi.com/airlines/64/${flight.airlines[0]}.png ">

		    <div class="flight__card__div__info">
			    <div class="flight__card__info__depart">
			      <div class="flight__card__depart__code__heure">
			        <p>${retourDepart.flyFrom}</p>
			        <p class="heure">${retourInfoFormatted[0]}:${retourInfoFormatted[1]}</p>
			      </div>
			      <div class="flight__card__depart__nom__airport">
			        <p>Airport name</p>
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
			        <p>Airport Name</p>
			      </div>
			    </div>
		    </div>
	    </div>
	`
	return markupRetour
}


export const getTransferNumber = route => {
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


