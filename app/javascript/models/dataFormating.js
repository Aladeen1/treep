import { createRouteArray, distanceFlight } from '../views/renderDetails';

export const addRelevantData = (data) => {
	let flights = data.data.data;
	let routeRetour = [];
	console.log(flights)

	flights.map( flight => {      
		addRouteArrays(flight)
		addDistanceEffective(flight)
		addCarbonEmission(flight)
		addTreepCommissionCompensation(flight)
		addDetteeco(flight)
		addDetteecoUser(flight)
	})
	return flights
}

function addRouteArrays(flight) {
	flight.routeRetour = [];
	flight.routeAller = createRouteArray(flight)[0];
    if ( flight.routes.length >= 2 ) {
		flight.routeRetour = createRouteArray(flight)[1];	
	}
}

function addDistanceEffective(flight) {
	let distanceTotal = 0;
	let array = flight.routeAller;

	if (flight.routeRetour.length > 0) {
		array = flight.routeAller.concat(flight.routeRetour);
	}

	array.forEach( route => {
		console.log(route)
		distanceTotal += distanceFlight(route.latFrom, route.lngFrom, route.latTo, route.lngTo, 'K');
	})
	flight.treepDistanceEffective = distanceTotal;
}

function addCarbonEmission(flight) {
	console.log(flight.treepDistanceEffective)
	flight.treepCarbonEmission = Math.round((flight.treepDistanceEffective * 190) / 1000);
}

function addTreepCommissionCompensation(flight) {
	const treepCommission = Number((flight.price * 0.02).toFixed(2));
	flight.treepCommission = treepCommission;
    flight.treepCompensation = Number((treepCommission * 0.45).toFixed(2));
}

function addDetteeco(flight) {
  flight.treepDetteEcologique = Number((Math.round(flight.treepCarbonEmission / 20) * 0.2).toFixed(2));
}

function addDetteecoUser(flight) {
  flight.treepDetteUser = Number((flight.treepDetteEcologique - flight.treepCompensation).toFixed(2));
}

















































