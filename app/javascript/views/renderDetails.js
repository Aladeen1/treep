// import { convertMinsToHrsMins } from '../components/sliderRange'

export const markupDetails = (flight, id) => { 

  let routeRetour = [];
  let timeRetour;
  const routeAller = flight.routeAller;
  const timeAller = timeFormating(flight.aTime, flight.dTime);
  
  if ( flight.routes.length >= 2 ) {
    routeRetour = flight.routeRetour;
    timeRetour = timeFormating(routeRetour[routeRetour.length - 1].aTime, routeRetour[0].dTime);
  }


  const markupDetails = `
	<div class="collapse" id="collapse-${id}">
	  <div class="card card-body">
	  	<div class="details" ${(flight.routes.length >= 2) ? 'style="justify-content: space-between"' : ''}>        
		   	${displayDetailedRoute(routeAller, timeAller, 'Aller')}
		    ${(flight.routes.length >= 2) ? displayDetailedRoute(routeRetour, timeRetour, 'Retour') : ''}
		    ${displayDetteEcoInfos(routeAller.concat(routeRetour), flight, routeRetour.length)}
      	</div>
	  </div>
	</div> 
  `

  return markupDetails
}


function displayDetailedRoute(routes, time, type) {
	// console.log(routes)

	const markup = `
		<div class="overall__details__container">
	   	    <h3>${type}</h3>
	   	    <div class="info__details__container">
		   		<p style="margin: 15px 0px;">Départ: ${time[4]} ${time[5]} ${time[6]}</p>
	            
	            ${markupRoute(routes)}

	            <p style="margin-top: 30px;">Arrivée: ${time[7]} ${time[8]} ${time[9]}</p>
	        </div>
	   	</div>
    `
    return markup
}

function displayDetteEcoInfos(array, flight, type) {

	const distanceTotal = flight.treepDistanceEffective;
	
    const treepCommission = (flight.price * 0.02).toFixed(2);
    const treepCompensation = (treepCommission * 0.45).toFixed(2);
    const carbonEmission = Math.round((distanceTotal * 190) / 1000);
    const detteEcologique = (Math.round(carbonEmission / 20) * 0.2).toFixed(2);
    const width = calculateEcoWidth(detteEcologique, treepCompensation);
    const detteUser = (detteEcologique - treepCompensation).toFixed(2);

	const markup = `

		<div class="dette__ecologique__container">
			<h3>Dette Ecologique</h3>
			<div class="info__details__container">
			  <p style="margin: 15px 0px;">${type > 0 ? 'Aller - Retour': 'Aller'}</p>
			  <p>Distance effective: ${distanceTotal}Km</p>
			  <p>co2 émis: ${carbonEmission}Kg</p>
			  <p>Skytreep Commission: ${treepCommission}€</p>
			  <p>Skytreep Participation: ${treepCompensation}€</p>
			  <p>Montant total: ${detteEcologique}€</p>
			  <div class="dette__infographie__container">
			  	<div class="dette__infographie__skyparticipation" style="width: ${width[0]}%;">${treepCompensation}€</div>
			  	<div class="dette__infographie__reste" style="width: ${width[1]}%;">${detteUser}€</div>
			  </div>
			</div>
		</div>
	`
	return markup
}

// export const graphDetteEco = () => {

//     const treepCompensation = (treepCommission * 0.45).toFixed(2);
//     const carbonEmission = Math.round((distanceTotal * 190) / 1000);
//     const detteEcologique = (Math.round(carbonEmission / 20) * 0.2).toFixed(2);
//     const width = calculateEcoWidth(detteEcologique, treepCompensation);
//     const detteUser = (detteEcologique - treepCompensation).toFixed(2);

// 	const markup = `
// 		<div class="dette__infographie__container">
// 		  	<div class="dette__infographie__skyparticipation" style="width: ${width[0]}%;">${treepCompensation}€</div>
// 		  	<div class="dette__infographie__reste" style="width: ${width[1]}%;">${detteUser}€</div>
// 		</div>
// 	`

// 	return markup
// }



export const calculateEcoWidth = (detteEcologique, treepCompensation) => {
	let widthTreep = Math.round((treepCompensation / detteEcologique) * 100);
	let widthUser = 100 - widthTreep;

	if (widthTreep < 25) {
      widthTreep = 25;
      widthUser = 75;
	}
    
    return [widthTreep, widthUser]
}

function displayFlightTimeRoute(routeArrivee, routeDepart) {
	let duration = (routeArrivee - routeDepart) / 60;
	duration = convertMinsToHrsMinutes(duration);
	return duration
}

function markupRoute(array) {

	let newArray = array.map( (route, index, tableau) => {
        
        const time = timeFormating(route.aTime, route.dTime)

		const markupFlight = `

			<div class="container__details__secondary">
				<div class="tranche__container">
		   		<p class="text__formatting__details first__row ${index != 0 ? 'escale__color' : ''}">${time[0]}:${time[1]}</p>
		   		<div class="round__div ${index != 0 ? 'red__round' : ''}">
		   		</div>
		   		<div class="text__formatting__details details__anchor">
		   		  ${index === 0 ? renderCityNCode(index, route) : ''}
		   		</div>
				</div>

				<div class="tranche__container second__tranche">
					<p class="text__formatting__details first__row">${displayFlightTimeRoute(route.aTime, route.dTime)}</p>
					<div class="details__straight__experiment"></div>
					<p class="text__formatting__details"></p>					
				</div>

				${markupEscales(route, index, tableau, time)}
			</div>	
		`
		return markupFlight
	})

	return newArray.join('')
}

function renderCityNCode(index, route) {

    let markup;
    if (index === 0) {
    	markup = `
		<p>${route.cityFrom}</p>
		<div class="details__airport__code__up">${route.flyFrom}</div>
	`
    } else {
    	markup = `
    	<p>${route.cityTo}</p>
		<div class="details__airport__code__up">${route.flyTo}</div>
	`
    }
  	return markup;
}


// ${routeAller.map( route => markupRoute(route)).join('')}
// Faire une fonction qui s'insère à la fin du markup route et s'active à chaque fois que c'est pas le dernier vol de l'arrêt

function convertMinsToHrsMinutes(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${h}h ${m}min`;
}

function markupEscales(route, indice, tableau, time) {
    
	let markupEscale; 

	if (indice != (tableau.length - 1)) {
		markupEscale = `
			<div class="tranche__container">
		   		<p class="text__formatting__details first__row escale__color">${time[2]}:${time[3]}</p>
		   		<div class="round__div red__round">
		   		</div>
		   		<p class="text__formatting__details">Escale</p>
			</div>

			<div class="tranche__container escale__tranche">
		   		<p class="text__formatting__details first__row">${displayFlightTimeRoute(tableau[indice + 1].dTime, route.aTime)}</p>
		   		<div class="details__straight__escale"></div>
		   		<p class="text__formatting__details">${route.cityTo}</p>
			</div>
		`
	} else {
		// prendre en compte le cas ou il n'y a qu'un vol (ajd bug)
	    markupEscale = `

			<div class="tranche__container">
		   		<p class="text__formatting__details first__row">${time[2]}:${time[3]}</p>
		   		<div class="round__div green__round">
		   		</div>
		   		<div class="text__formatting__details details__anchor">
		   		  ${renderCityNCode(indice, route)}
		   		</div>
			</div>
		`
	}
    
   return markupEscale
}

// <div class="dette-ecologique">
//   <button class="checkout__button">Dette Ecologique</button>
// </div>


export const createRouteArray = flight => {
	let routeAller = [];
	let routeRetour = [];

	flight.route.forEach( route => {
		if (route.return === 0 ) {
			routeAller.push(route)
		} else if (route.return === 1 ) {
			routeRetour.push(route)
		}
	})

	return [routeAller, routeRetour]
}


function timeFormating(aTime, dTime) {
	const depart = new Date(dTime * 1000);
	const arrivee = new Date(aTime * 1000);

	let departHours = depart.toString().split(" ")[4].split(":")[0];
	let departMinutes = depart.toString().split(" ")[4].split(":")[1];
	let arriveeHours = arrivee.toString().split(" ")[4].split(":")[0];
	let arriveeMinutes = arrivee.toString().split(" ")[4].split(":")[1];
    
    const jours = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

	let jourDepart = jours[depart.getDay()];
	let jourNumberDepart = depart.getDate();
	let moisDepart = mois[depart.getMonth()];

	let jourArrivee = jours[arrivee.getDay()];
	let jourNumberArrivee = arrivee.getDate();
	let moisArrivee = mois[arrivee.getMonth()]

  	return [departHours, departMinutes, arriveeHours, arriveeMinutes, jourDepart, jourNumberDepart, moisDepart, jourArrivee, jourNumberArrivee, moisArrivee]
}


export const distanceFlight = (lat1, lon1, lat2, lon2, unit) => {
	
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return Math.round(dist);
	}
}

// function miniMarkup(trajet, flight, retour) {
// 	const timeAller = timeFormating(flight.aTime, flight.dTime);
// 	if (retour != undefined) {
//       var timeRetour = timeFormating(retour[0].aTime, retour[0].dTime);
// 	}

//     let markupTrajet;
//     if ( trajet === 'Aller') {
// 	   markupTrajet = `

// 	    <div class="flight__details__aller">
// 		    <p>${trajet}</p>
// 		    <p>${}
// 		</div>
// 	  `
//     } else if (trajet === 'Retour') {
//     	markupTrajet = `

// 	    <div class="flight__details__aller">
// 		    <p>${trajet}</p>
// 		    <p>${flight.return_duration}</p>
// 		    <p>${flight.routes[1][0]} - ${flight.routes[1][1]}<p>
// 		    <p>${timeRetour[4]}. ${timeRetour[5]} ${timeRetour[6]}</p>
// 		</div>
// 	  `
//     }
//     return markupTrajet
// }


// <p>${flight.fly_duration}</p>
// <p>${flight.flyFrom} - ${flight.flyTo}<p>


// function markupRoute(array) {

//     let newArray = array.map( (route, index, tableau) => {

//      const distance = distanceFlight(route.latFrom, route.lngFrom, route.latTo, route.lngTo, 'K');
// 	    const time = timeFormating(route.aTime, route.dTime);
	
// 	    const markupFlight = `
        
//         ${(index != 0) ? markupEscales(route, index, tableau) : ''}

// 		<div class="big__info__container straight__details">

// 		    <div class="date">
// 	        	<p>${time[4]} ${time[5]}</p>
// 		    </div>

// 	        <div class="main__details__info__container">
// 			    <div class="schedule__city__flightNumber">
// 		            <p>${route.flyFrom} ${time[0]}:${time[1]}</p>
// 		            <div class="details__square__1"></div>
// 		            <p>${time[2]}:${time[3]}</p>
// 		        	<p>${route.cityFrom} - ${route.cityTo}</p>
// 		            <p> Vol n°${route.flight_no}</p>
// 			    </div>

// 			    <div class="straight__vertical"></div>

// 			    <div class="equipement__consommationC02__commission">
// 			            <p>equipment: ${route.equipment}</p>
// 			            <p>Distance in Km: ${distance}</p>
// 			            <p>Rejet de CO2 en Kg: ${Math.round((distance * 141) / 1000)}</p>
// 			    </div>
// 		    </div>
// 	    </div>

// 	  `
	
// 	  return markupFlight
//    })

//     return newArray.join('')
// }



