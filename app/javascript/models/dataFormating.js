import { createRouteArray, distanceFlight } from '../views/renderDetails';
import { toCents, toHumanPrice } from '../views/base';

export const addRelevantData = (data) => {
	let flights = data.data.data;
	let routeRetour = [];

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
		distanceTotal += distanceFlight(route.latFrom, route.lngFrom, route.latTo, route.lngTo, 'K');
	})
	flight.treepDistanceEffective = distanceTotal;
}

function addCarbonEmission(flight) {
	flight.treepCarbonEmission = Math.round((flight.treepDistanceEffective * 250) / 1000);
}

function addTreepCommissionCompensation(flight) {
	const treepCommission = treeCompatibility(toCents(flight.price * 0.02));
	flight.treepCommission = treepCommission;
    flight.treepCompensation = treeCompatibility(treepCommission * 0.45);
}

function addDetteeco(flight) {
  const treeAbsorptionKg = 20;
  const treePriceCents = 20;

  // On utilise ceil pour avoir un nombre d'abres toujours capable d'absorber le co2 entièrement

  flight.treepDetteEcologique = Math.ceil(flight.treepCarbonEmission / treeAbsorptionKg) * treePriceCents;
}

function addDetteecoUser(flight) {
  flight.treepDetteUser = flight.treepDetteEcologique - flight.treepCompensation;
}

function treeCompatibility(amountInCents) {
	return Math.floor( amountInCents / 20) * 20
}
















































