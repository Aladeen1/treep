import { elements } from './base';
import { getInput } from './searchView';
import { createRouteArray, distanceFlight } from './renderDetails';
import { getSliderReady } from './sliderUtilisation';

// Le but de cette fonction est de créer les sliders avec les bonnes valeurs en recevant l'array des vols
// stockées dans le cache (flights)


export const displayOptions = flights => {
    
	// Dans cette fonction la que je dois mettre les informations que j'ai sûrement en m'aidant 
	// de ce que j'ai fait pour le render des vols. (Des fonctions)

	// On crée des empty arrays 
	let arrivals, departures, durations, prices, distances, carbonEmissions;
	arrivals = [];
	departures = [];
	durations = [];
	prices = [];
	distances = [];
	carbonEmissions = [];

	// Pour chaque vol (chaque élément de la liste de vol que nous renvoie l'Api)
	// On rempli les arrays vides avec les informations disponible sur le vol (On a que des informations basiques
	// et directement accessibles ici). Il faudrait en faire des plus complexes pour prendre en compte
	// le C02 global, la distance et l'aller et le retour si il s'en est un

	flights.forEach( flight => {
		prices.push(flight.price);
		durations.push(flight.duration.departure);
		departures.push(flight.dTime);
		arrivals.push(flight.aTime);
		distances.push(ecological(flight)[0]);
		carbonEmissions.push(ecological(flight)[1]);
	})
   

    // Une fois qu'on a les array remplis on assigne la valeur minimal
    // et maximal de chaque array à une variable.

    let maxDistance = optionalMaxValue(distances);
    let minDistance = optionalMinValue(distances);
    let maxCarbon = optionalMaxValue(carbonEmissions);
    let minCarbon = optionalMinValue(carbonEmissions);
    let maxArrivalTime = optionalMaxValue(arrivals);
    let minArrivalTime = optionalMinValue(arrivals);
    let maxDepartureTime = optionalMaxValue(departures);
    let minDepartureTime = optionalMinValue(departures);
    let maxPrice = optionalMaxValue(prices);
    let minPrice = optionalMinValue(prices);
    let maxDuration = optionalMaxValue(durations);
    let minDuration = optionalMinValue(durations);
    
    // On fait un peu de formatage ici pour que l'on puisse créer les
    // sliders.

    maxArrivalTime = 1439;
    minArrivalTime = 0;
    maxDepartureTime = formatageCreationSlider(maxDepartureTime);
    minDepartureTime = formatageCreationSlider(minDepartureTime);
    maxDuration = Math.ceil((maxDuration / 60) / 60);
    minDuration = Math.floor((minDuration / 60) / 60);
    
    console.log(maxDuration)
    console.log(minDuration)
    
    console.log(` Les min values sont: ${minArrivalTime}, ${minDepartureTime}, ${minPrice}, ${minDuration}, ${minCarbon}, ${minDistance}`)

    // Ici on utilise les variables + le code qu'on s'est fixé pour les ids des sliders 
    // et on créer les receptacles des Uislider (markup)
    createSliderMarkup('sliderCarbon', 'minCarbonInput', 'maxCarbonInput', minCarbon, maxCarbon, 'C02/personne')
	createSliderMarkup('sliderDistance', 'minDistanceInput', 'maxDistanceInput', minDistance, maxDistance, 'Distance')
	createSliderMarkup('sliderDuration', 'minDurationInput', 'maxDurationInput', minDuration, maxDuration, 'Durée')
	createSliderMarkup('sliderPrix', 'minPrixInput', 'maxPrixInput', minPrice, maxPrice, 'Prix')
	createSliderMarkup('sliderDepart', 'minDepartInput', 'maxDepartInput', minDepartureTime, maxDepartureTime, 'Départ')
	createSliderMarkup('sliderArrivee', 'minArriveeInput', 'maxArriveeInput', minArrivalTime, maxArrivalTime, 'Arrivée')
    
    // On connecte les input des sliders pour écouter et lancer une fonction chaque qu'un utilisateur change
    // sa valeur.

   
   

    // On déclare les éléments à ce moment la par qu'il n'existait pas avant
    // on vient de les créer. 


	const optionsElements = {
		searchCarbon: document.getElementById('sliderCarbon'),
		searchDistance: document.getElementById('sliderDistance'),
		searchDuration: document.getElementById('sliderDuration'),
		searchPrix: document.getElementById('sliderPrix'),
		searchDepartHour: document.getElementById('sliderDepart'),
		searchArriveeHour: document.getElementById('sliderArrivee'),
		optionLoaded: document.getElementById('loaded')
	}
    
    // On les retourne car on va les utiliser pour créer les UiSliders à partir de ça.
    // Une fois que cette function est appelée et qu'elle a retourner, 'loaded' est != de null. 

    return optionsElements

    // Comment on a créer les functions (De par le markup surtout)
    // la fonction de création des UiSlider à juste besoin de l'ID
    // du markup pour gérer la suite. 
}

// Function qui créer deux arrays avec les vols aller et retour



// Pour chaque vol on prend la distance et le C02 rejeté calculé avec formule du render

// On additionne tout dans une variable qu'on retourne

// On retourne le résultat pour chaque vol dans une array. On trouve le min max ensuite, suite logique .. 

export const ecological = (flight) => {
	const aller = createRouteArray(flight)[0];
	const retour = createRouteArray(flight)[1];
    
    const sumDistance = distanceWay(aller) + distanceWay(retour);

    // changer le calcul du carbon en fonction du tableau qu'on aura établi

    const totalCarbon = Math.round((sumDistance * 141) / 1000);

    return [sumDistance, totalCarbon]
}

function distanceWay(array) {
	let distance = 0
    array.forEach ( route => {
    	distance += distanceFlight(route.latFrom, route.lngFrom, route.latTo, route.lngTo, 'K')
    })
    return distance
}



function optionalMaxValue(array) {
	return Math.max.apply(null, array)
}

function optionalMinValue(array) {
	return Math.min.apply(null, array)
}

function createSliderMarkup(sliderType, sliderMinValueTarget, sliderMaxValueTarget, minValue, maxValue, option) {
	const markup =`
		<div class="container" id="loaded">
		  	<div class="row">
			    <div style="width:100%;">

			      <h4 class="option__title">${option}</h3>

			      <div id="${sliderType}" style="margin: 20px;">
				  	<input class="target-option" id="${sliderMinValueTarget}" type="hidden" value="${minValue}"> 
				  	<input class="target-option" id="${sliderMaxValueTarget}" type="hidden" value="${maxValue}"> 
				  </div>
			      
			      
			    </div>
		  	</div>
		</div>
    `
    document.querySelector('.flights__options').insertAdjacentHTML('beforeend', markup);
}


export const formatageCreationSlider = (unixStamp) => {
	
	let result, heures, minutes;
	
	result = (new Date(unixStamp * 1000)).toTimeString().split(':');
	heures = parseInt(result[0]) * 60;
	minutes = parseInt(result[1]);
    result = heures + minutes;

    return result
}



