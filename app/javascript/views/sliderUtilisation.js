import * as searchView from '../views/flightView';
import { clearResults } from '../views/searchView';
import { ecological, formatageCreationSlider } from './sliderCreation';
import { renderReturnFlights } from './renderFlight';
import { flightType } from './base';
import { getNumberBoxChecked, getEscalesNumber } from './sliders/escalesFilter';
import { renderLoader, clearLoader } from './base';
import { clearFlights } from './searchView';
import { flightsArraySorted } from '../components/filterSearch';
import { targetRedirection } from '../components/modalApparition';


// Fonction qui récupère la valeur des inputs connectés au slider. Récupère le min et max. 
// Les valeurs sont récupérées sous forme de string déjà formattés

export const getOptionValues = (flights) => {
   let optionValues = {
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
   
   
   if (flightType(flights[0])) {
   	optionValues.durationRetourMax = document.getElementById('maxDurationRetourInput').value;
   	optionValues.departRetourMax = document.getElementById('maxDepartRetourInput').value;
   	optionValues.departRetourMin = document.getElementById('minDepartRetourInput').value;
   	optionValues.arriveeRetourMax = document.getElementById('maxArriveeRetourInput').value;
   	optionValues.arriveeRetourMin = document.getElementById('minArriveeRetourInput').value;
   }
   
   return optionValues
}

function rightArray(element, arrayFlights) {
	let rightArray = [];
	if (element.includes('cher')) {
	  console.log('pacher array')
      rightArray = arrayFlights[0].slice();
    } else if (element.includes('écolo')) {
      console.log('écolo array')
	  rightArray = arrayFlights[1].slice();
    } else if (element.includes('rapide')) {
      console.log('rapide array')
      rightArray = arrayFlights[2].slice();
    }
    return rightArray
}

// La array des vols se trouve dans localstorage

export const sortFlights = () => {
	
	const airlines = JSON.parse(localStorage.getItem('Airlines'));
    const flightList = document.querySelector('.flights__list');
    const arraynOptions = getArraynOptions();
    
    
    clearFlights();
    renderLoader(flightList);

    window.setTimeout( () => {
    	clearLoader(flightList)
    	renderSortedFlights(arraynOptions[0], airlines, arraynOptions[1]);
    }, 750)
}

// fonction qui retourne les options + la bonne array

export const getArraynOptions = () => {
	const arrayFlights = flightsArraySorted();
  console.log(arrayFlights);
  const activeFilter = document.querySelector('#active__measure__in').innerHTML;
  const arrayToUse = rightArray(activeFilter, arrayFlights);

  
  const sliderValues = getOptionValues(arrayToUse);


  return [arrayToUse, sliderValues]
}

// Créer une fonction qui rend les vols en fonction des options sélectionnées. 
// Rendre les vols on a ça il faut pouvoir les sélectionnés en fonction de critère qu'on a.
// On a déjà toutes les valeurs pour chaque vol, donc on récupère ça et on display les vols qui remplissent tous les critères.
// Pour lesquelles ces valeurs sont > au min et < max. 

function renderSortedFlights(flights, airlines, optionValues) {

	// On va devoir mettre un if pour différencier les vols aller/retour et les vols simple.
    
    // renvoi l'array avec le type d'escale qui est coché

    const arrayCheckedBox = getNumberBoxChecked();

    // pour checker si le bail il faut le nombre d'escale de chaque routes pour chaque vol (array de 2 nombres)
    
    
	flights.forEach( (flight, id) => {
        
        const escales = checkEscaleCompatibility(arrayCheckedBox, flight);
		    const prealable = ecological(flight);
        const ecology = checkCompatibility(prealable[1], optionValues.carbonMin, optionValues.carbonMax)
        const distance = checkCompatibility(prealable[0], optionValues.distanceMin, optionValues.distanceMax)
        const prix = checkCompatibility(flight.price, optionValues.prixMin, optionValues.prixMax)
        const duree = checkCompatibility(flight.duration.departure, 0 , optionValues.durationMax)
        const heureDepart = checkCompatibilityTime(flight.dTime, optionValues.departMin, optionValues.departMax)
        const heureArrivee = checkCompatibilityTime(flight.aTime, optionValues.arriveeMin, optionValues.arriveeMax)

        // Si tous les critères sont remplis (Tous les variables retourne "true"), le vol est affiché.     
        // Ecrire une grosse fonction pour les autres sliders qui donneront des données en plus en aller/retour.

        if (flightType(flight)) {
        	
			const dureeRetour = checkCompatibility(flight.duration.return, 0 , optionValues.durationRetourMax)
			const heureDepartRetour = checkCompatibilityTime(retourHoraire(flight)[0], optionValues.departRetourMin, optionValues.departRetourMax)
            const heureArriveeRetour = checkCompatibilityTime(retourHoraire(flight)[1], optionValues.arriveeRetourMin, optionValues.arriveeRetourMax)

			if ( ecology && distance && prix && duree && heureDepart && heureArrivee && dureeRetour && heureDepartRetour && heureArriveeRetour && escales) {
				renderReturnFlights(flight, airlines, id)
	        } 
		} else if ( ecology && distance && prix && duree && heureDepart && heureArrivee && escales) {
			  renderReturnFlights(flight, airlines, id)
		}    
	})
  targetRedirection();
}

// Check si la value du vol est comprise entre la valeur min et max.
// Passe la valeur qu'on avait en string en integer pour les comparer.
// Retourne vrai si la valeur est comprise entre les valeurs et faux autrement.
// Du coup le vol se fait exclure par la fonction au dessus. 

function checkEscaleCompatibility(arrayBox, flight) {

    let check = false;
	const escale = getEscalesNumber(flight);

	if (arrayBox.includes(escale[0]) || arrayBox.includes(escale[1]) || arrayBox.length === 0) {
		check = true;
	}
    
    return check;
}


function checkCompatibility(flightValue, valueMin = 0, valueMax) {
	let check;
	const value1 = parseInt(valueMin)
	const value2 = parseInt(valueMax)

	// 1er cas est celui de la durée du départ seulement. On va devoir implémenter pour retour aussi.
	// (Et pour la durée des escales aussi). 

	if (valueMin === 0) {
	  const duree = Math.ceil((flightValue / 60))
      check = (duree <= value2)
	} else {
	  check = ((flightValue >= value1) && (flightValue <= value2))
	}
	return check
}

// Fonction spécial pour checker la compatibilité pour les horaires. 

function checkCompatibilityTime(option, valueMin, valueMax) {
	const timeMin = hourToInteger(valueMin);
	const timeMax = hourToInteger(valueMax);
	const flightTime = formatageCreationSlider(option);
	return ((flightTime >= timeMin) && (flightTime <= timeMax))
}


// Fonction qui formatte les horaires de départ et d'arrivée pour les comparer
// entre la valeur du slider et celle du vol


function hourToInteger(time) {
	const array = time.split(':')
    const format = (parseInt(array[0]) * 60) + parseInt(array[1])
    // renvoi un entier qui correspond aux minutes écoulées dans la journée
    return format
}

function retourHoraire(flight) {
	let routesRetourArray = [];
	flight.route.forEach( route => {
		if (route.return === 1) {
			routesRetourArray.push(route)
		}
	})
	return [routesRetourArray[0].dTime, routesRetourArray[routesRetourArray.length - 1].aTime]
}








