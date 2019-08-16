import { matchAirlinesCode } from './flightView';
import { elements, toHumanPrice } from './base';
import { markupDetails, markupRoute, calculateEcoWidth } from './renderDetails';
import { targetRedirection } from '../components/modalApparition';

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
  // targetRedirection();
}


function render(flight, airlines, allerInfoFormatted, allerDepartDay, allerArrivalDay, routesAller, id, retourInfoFormatted = [], retourDepart = 0, retourArrivee = 0, retourDepartDay = [], retourArrivalDay = [], routesRetour = []) {

    const airportDepart = localStorage.getItem('airportDepart');
    const airportArrivee = localStorage.getItem('airportArrivee');


	const markup = `

	  <li class="flight__card">


          <div style="display:flex;width: 100%;">
	          <div class="flight__card__container">
	              <div class="flight__presentation__container">
					  <div class="flight__card__div">

						    <img src="https://images.kiwi.com/airlines/64/${flight.airlines[0]}.png ">

							<div class="flight__card__div__info">
							    <div class="flight__card__info__depart">
							      <div class="flight__card__depart__code__heure">
							        <p>${flight.flyFrom}</p>
							        <p class="heure">${allerInfoFormatted[0]}:${allerInfoFormatted[1]}</p>
							      </div>
							      <div class="flight__card__nom__airport">
				                    <p>${airportDepart}</p>
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
							        	<p class="flight__days__added">${(allerArrivalDay.getUTCDate() - allerDepartDay.getUTCDate() > 0) ? "+" + `${(allerArrivalDay.getUTCDate() - allerDepartDay.getUTCDate())}`: ""}</p>
							        </div>
							      </div>
							      <div class="flight__card__nom__airport">
							        <p>${airportArrivee}</p>
							      </div>
							    </div>
						    </div>

					  </div>

	                  ${(retourDepart != 0) ? createMarkupRetour(flight, retourInfoFormatted, routesRetour, retourDepart, retourArrivee, retourDepartDay, retourArrivalDay) : ''}
                  </div>

				  <div class="details__div">
				  <button class="checkout__button" id="details" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="false" aria-controls="collapse-${id}">Détails</button>
				  ${graphDetteEco(flight, id)}

				  </div>
			  </div>


			  <div class="flight__card__checkout back">
			  	  <div class="search-tooltip-control">
			          <div class="flight__info white-tooltip" data-toggle="tooltip-${id}" data-html="true" data-placement="left" title='
					  	<div class="carte-dette-ecologique" id="dette-id-hide-${id}">
						  <h5 class="search-tooltip-main-title">Dette écologique <img src="https://res.cloudinary.com/tark-industries/image/upload/v1556638788/Feuilles_skytreep.png"></h5>
						  <div>
						  	<p class="search-button-style-title">Dette écologique du trajet:</p>
						  	<p class="search-button-style">${toHumanPrice(flight.treepDetteEcologique)} EUR</p>
						  </div>
						  <h5>Qu’est-ce que la dette écologique ?</h5>
						  <div class="search-tooltip-separation-line"></div>

						  	<p>La dette est calculée à partir de votre trajet. Le prix correspond au nombre d’arbres qu’il faut planter pour compenser votre empreinte carbone. </p>

						  <h5>Comprendre votre dette ?</h5>
						  <div class="search-tooltip-separation-line"></div>
						  <div class="search-tooltip-repartition-text">
						  	<p>En bleu le montant que nous finançons.</p>
						  	<p>En vert ce que vous choisissez de payer.</p>
						  </div>

					  	  <div class="search-tooltip-repartition-box">
					  		<p class="tooltip-blue-box">${toHumanPrice(flight.treepCompensation)}€</p>
					  		<p class="tooltip-green-box">${toHumanPrice(flight.treepDetteUser)}€</p>
					  	  </div>
					  	</div>'>
			            <img src="https://res.cloudinary.com/tark-industries/image/upload/v1556035926/Ticketinfo.png">
			          </div>
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
    toolTipAction(id);

// Utiliser pour faire un design stylé pour les airlines

		// <div class="flight__card__header">
		// 	<p>${(airlines.length > 1) ? airlines.join(' - '): airlines[0]}<p>
		// </div>

//
}

function toolTipAction(id) {
	$(`[data-toggle="tooltip-${id}"]`).tooltip();
	document.getElementById(`dette-id-${id}`).addEventListener('mouseover', () => {
		$(`[data-toggle="tooltip-${id}"]`).tooltip('toggle');
		document.querySelector('.carte-dette-ecologique').addEventListener('mouseleave', () => {
			$(`[data-toggle="tooltip-${id}"]`).tooltip('hide');
		})
	});
}

function graphDetteEco(flight, id) {

    const width = calculateEcoWidth(flight.treepDetteEcologique, flight.treepCompensation);

	const markup = `
		<div class="dette__infographie__container__front" id="dette-id-${id}">
		  	<div class="dette__infographie__skyparticipation__preview" style="width: 40%;">
			  	<div><p>${flight.treepCompensation / 13}</p></div>
			  	<img src="https://res.cloudinary.com/tark-industries/image/upload/v1553192647/Arbre.png" style="height:32px;width:32px;">
		  	</div>
		  	<div class="dette__infographie__reste__preview" style="width: 60%;">
			  	<div><p>${flight.treepDetteUser / 13}</p></div>
			  	<img src="https://res.cloudinary.com/tark-industries/image/upload/v1553192647/Arbre.png" style="height:32px;width:32px;">
		  	</div>
		</div>
	`
	return markup
}



function createMarkupRetour(flight, retourInfoFormatted, routesRetour, retourDepart,  retourArrivee, retourDepartDay, retourArrivalDay ) {
	const airportDepart = localStorage.getItem('airportDepart');
	const airportArrivee = localStorage.getItem('airportArrivee');
  	const markupRetour = `
		<div class="flight__card__div">

		    <img src="https://images.kiwi.com/airlines/64/${flight.airlines[0]}.png ">

		    <div class="flight__card__div__info">
			    <div class="flight__card__info__depart">
			      <div class="flight__card__depart__code__heure">
			        <p>${retourDepart.flyFrom}</p>
			        <p class="heure">${retourInfoFormatted[0]}:${retourInfoFormatted[1]}</p>
			      </div>
			      <div class="flight__card__nom__airport">
			        <p>${airportArrivee}</p>
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
			      <div class="flight__card__nom__airport">
			        <p>${airportDepart}</p>
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

    const departureMinutes = departureTime.toUTCString().split(" ")[4].split(":")[1];
	const departureHours = departureTime.toUTCString().split(" ")[4].split(":")[0];
	const arrivalMinutes = arrivalTime.toUTCString().split(" ")[4].split(":")[1];
	const arrivalHours = arrivalTime.toUTCString().split(" ")[4].split(":")[0];


	return [departureHours, departureMinutes, arrivalHours, arrivalMinutes]
}


