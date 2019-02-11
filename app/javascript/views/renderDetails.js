// import { convertMinsToHrsMins } from '../components/sliderRange'

export const markupDetails = (flight, id) => { 

  const routeAller = createRouteArray(flight)[0];
  const routeRetour = createRouteArray(flight)[1]; 

  const markupDetails = `
	<div class="collapse" id="collapse-${id}">
	  <div class="card card-body details">
	   
	    ${miniMarkup('Aller', flight, routeAller)}

	    ${markupRoute(routeAller)}

	    ${(flight.routes.length >= 2) ? miniMarkup('Retour', flight, routeRetour) : ''}

	    ${(flight.routes.length >= 2) ? markupRoute(routeRetour) : ''}

	  </div>
	</div>
  `

  return markupDetails
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

function markupEscales(vol, indice, table) {
    const timeEscale = convertMinsToHrsMinutes((vol.dTime - table[indice - 1].aTime) / 60);
   	let markupEscale = `
	  <div class="escale__container">
	  <p>Escale de ${timeEscale} à ${vol.cityFrom} (${vol.flyFrom}) </p>
	  </div>
	`
   
   return markupEscale
}

function markupRoute(array) {

    let newArray = array.map( (route, index, tableau) => {

     	const distance = distanceFlight(route.latFrom, route.lngFrom, route.latTo, route.lngTo, 'K');
	    const time = timeFormating(route.aTime, route.dTime);
	
	    const markupFlight = `
        
        ${(index != 0) ? markupEscales(route, index, tableau) : ''}

		<div class="big__info__container straight__details">

		    <div class="date">
	        	<p>${time[4]}. ${time[5]}</p>
		    </div>

	        <div class="main__details__info__container">
			    <div class="schedule__city__flightNumber">
		            <p>${route.flyFrom} ${time[0]}:${time[1]} - ${time[2]}:${time[3]}</p>
		        	<p>${route.cityFrom} - ${route.cityTo}</p>
		            <p> Vol n°${route.flight_no}</p>
			    </div>

			    <div class="straight__vertical"></div>

			    <div class="equipement__consommationC02__commission">
			            <p>equipment: ${route.equipment}</p>
			            <p>Distance in Km: ${distance}</p>
			            <p>Rejet de CO2 en Kg: ${Math.round((distance * 141) / 1000)}</p>
			    </div>
		    </div>

	        <div class="dette-ecologique">
	          <button class="checkout__button">Dette Ecologique</button>
	        </div>

	    </div>

	  `
	
	  return markupFlight
    })

    return newArray.join('')
}


function createRouteArray(flight) {
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
	let moisDepart = mois[depart.getMonth()]

  	return [departHours, departMinutes, arriveeHours, arriveeMinutes, jourDepart, jourNumberDepart, moisDepart]
}


function distanceFlight(lat1, lon1, lat2, lon2, unit) {
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


function miniMarkup(trajet, flight, retour) {
	const timeAller = timeFormating(flight.aTime, flight.dTime);
	if (retour != undefined) {
      var timeRetour = timeFormating(retour[0].aTime, retour[0].dTime);
	}

    let markupTrajet;
    if ( trajet === 'Aller') {
	   markupTrajet = `

	    <div class="flight__details__aller">
		    <p>${trajet}</p>
		    <p>${flight.fly_duration}</p>
		    <p>${flight.flyFrom} - ${flight.flyTo}<p>
		    <p>${timeAller[4]}. ${timeAller[5]} ${timeAller[6]}</p>
		</div>
	  `
    } else if (trajet === 'Retour') {
    	markupTrajet = `

	    <div class="flight__details__aller">
		    <p>${trajet}</p>
		    <p>${flight.return_duration}</p>
		    <p>${flight.routes[1][0]} - ${flight.routes[1][1]}<p>
		    <p>${timeRetour[4]}. ${timeRetour[5]} ${timeRetour[6]}</p>
		</div>
	  `
    }
    return markupTrajet
}









