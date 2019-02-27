import * as searchView from '../views/flightView';
import { clearResults } from '../views/searchView';
import { ecological, formatageCreationSlider } from './sliderCreation';
import { renderReturnFlights } from './renderFlight';

export const getOptionValues = () => {
   const optionValues = {
   	carbonMax: document.getElementById('maxCarbonInput').value,
   	carbonMin: document.getElementById('minCarbonInput').value,
   	distanceMax: document.getElementById('maxDistanceInput').value,
   	distanceMin: document.getElementById('minDistanceInput').value,
	durationMax: document.getElementById('maxDurationInput').value,
	prixMax: document.getElementById('maxPrixInput').value,
	prixMin: document.getElementById('minPrixInput').value,
	departMax: document.getElementById('maxDepartInput').value,
	departMin: document.getElementById('minDepartInput').value,
	arriveeMax: document.getElementById('maxArriveeInput').value,
	arriveeMin: document.getElementById('minArriveeInput').value
   }
   return optionValues
}

// La array des vols se trouve dans localstorage

export const sortFlights = () => {
	const values = getOptionValues();
    console.log(values)
	const airlines = JSON.parse(localStorage.getItem('Airlines'));
    const resultat = JSON.parse(localStorage.getItem('Recherche'));
    
    console.log('clear')
    clearResults();

    // Mettre un spinner ici pour bien montrer que les résultats sont updatés
    

    renderSortedFlights(resultat, airlines, values);
}

// Créer une fonction qui rend les vols en fonction des options sélectionnées. 
// Rendre les vols on a ça il faut pouvoir les sélectionnés en fonction de critère qu'on a.
// On a déjà toutes les valeures pour chaque vol, donc on récupère ça et on display les vols 
// Pour lesquelles ces valeurs sont > au min et < max. 



function renderSortedFlights(flights, airlines, optionValues) {
    
    console.log(flights)
	flights.forEach( (flight, id) => {

		const prealable = ecological(flight);
        const ecology = checkCompatibility(prealable[1], optionValues.carbonMin, optionValues.carbonMax)
        const distance = checkCompatibility(prealable[0], optionValues.distanceMin, optionValues.distanceMax)
        const prix = checkCompatibility(flight.price, optionValues.prixMin, optionValues.prixMax)
        const duree = checkCompatibility(flight.duration.departure, 0 , optionValues.durationMax)
        const heureDepart = checkCompatibilityTime(flight.dTime, optionValues.departMin, optionValues.departMax)
        const heureArrivee = checkCompatibilityTime(flight.aTime, optionValues.arriveeMin, optionValues.arriveeMax)
        
		if ( ecology && distance && prix && duree && heureDepart && heureArrivee) {
			renderReturnFlights(flight, airlines, id)
		}
	})
}

function checkCompatibility(flightValue, valueMin = 0, valueMax) {
	let check;
	const value1 = parseInt(valueMin)
	const value2 = parseInt(valueMax)
	if (valueMin === 0) {
	  const spe = Math.ceil((flightValue / 60) / 60)
      check = (spe <= value2)
	} else {
	  check = ((flightValue >= value1) && (flightValue <= value2))
	}
	return check
}

function checkCompatibilityTime(option, valueMin, valueMax) {
	

	const timeMin = hourToInteger(valueMin);
	const timeMax = hourToInteger(valueMax);
	const flightTime = formatageCreationSlider(option);
	return ((flightTime >= timeMin) && (flightTime <= timeMax))
}


// créer une fonction pour comparer les heures de départ et d'arrivée. 


function hourToInteger(time) {
	const array = time.split(':')
    const format = (parseInt(array[0]) * 60) + parseInt(array[1])
    return format
}







