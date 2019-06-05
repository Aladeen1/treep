import { elements } from './base'; 
import { getInput } from './searchView';
import { createRouteArray, distanceFlight } from './renderDetails';
import { getSliderReady } from './sliderUtilisation';
import { convertMinsToHrsMins } from '../components/sliderRange';
import { createMarkupDurationRetour } from './sliders/returnDurationSliders';
import { markupHoraire, sliderOnlyMarkup, horaireSwitch } from './sliders/horaireSlider';
import { createEscaleMarkup } from './sliders/escalesFilter';


// Le but de cette fonction est de créer les sliders avec les bonnes valeurs en recevant l'array des vols
// stockées dans le cache (flights)
 
export const displayOptions = (flights, type) => {

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
    let maxDepartureTime = optionalMaxValue(departures);
    let minDepartureTime = optionalMinValue(departures);
    let maxPrice = optionalMaxValue(prices);
    let minPrice = optionalMinValue(prices);
    let maxDuration = optionalMaxValue(durations);
    let minDuration = optionalMinValue(durations);
    
    // On fait un peu de formatage ici pour que l'on puisse créer les
    // sliders. (Prend que des nombres entiers).

    let maxArrivalTime = 1439;
    let minArrivalTime = 0;
    maxDepartureTime = formatageCreationSlider(maxDepartureTime);
    minDepartureTime = formatageCreationSlider(minDepartureTime);
    
    maxDuration = Math.ceil((maxDuration / 60));
    minDuration = Math.floor((minDuration / 60));

    if (maxDuration == minDuration) {
        maxDuration += 1;
    }
    
    // console.log(` Les max values sont: ${maxArrivalTime}, ${maxDepartureTime}, ${maxPrice}, ${maxDuration}, ${maxCarbon}, ${maxDistance}`)
    // console.log(` Les min values sont: ${minArrivalTime}, ${minDepartureTime}, ${minPrice}, ${minDuration}, ${minCarbon}, ${minDistance}`)

    // Ici on utilise les variables + le code qu'on s'est fixé pour les ids des sliders 
    // et on créer les receptacles des Uislider (markup)

    // Quick fix pour les departure time

    if (minDepartureTime >= maxDepartureTime) {
    	maxDepartureTime = 1439;
    	minDepartureTime = 0;
    }
    
    createOptionsAnchor();
    createEscaleMarkup(flights, 'A');
    createSliderMarkup('sliderPrix', 'minPrixInput', 'maxPrixInput', minPrice, maxPrice, 'Prix', 'B')
    createSliderMarkup('sliderCarbon', 'minCarbonInput', 'maxCarbonInput', minCarbon, maxCarbon, 'C02 émis par personne', 'C')
	createSliderMarkup('sliderDistance', 'minDistanceInput', 'maxDistanceInput', minDistance, maxDistance, 'Distance', 'D')
	createSliderMarkup('sliderDuration', 'minDurationInput', 'maxDurationInput', minDuration, maxDuration, 'Durée', 'E')
	createMarkupDurationRetour(flights, type);
	createMarkupHoraire(flights, type, minDepartureTime, maxDepartureTime, minArrivalTime, maxArrivalTime);
    arrowTurn();

    // On connecte les input des sliders pour écouter et lancer une fonction chaque fois qu'un utilisateur change
    // sa valeur.

    // On déclare les éléments à ce moment la par qu'il n'existait pas avant,
    // on vient de les créer. 


	let optionsElements = { 
		searchCarbon: document.getElementById('sliderCarbon'),
		searchDistance: document.getElementById('sliderDistance'),
		searchDuration: document.getElementById('sliderDuration'),
		searchPrix: document.getElementById('sliderPrix'),
		searchDepart: document.getElementById('sliderDepart'),
		searchArrivee: document.getElementById('sliderArrivee'),
		optionLoaded: document.getElementById('loaded') 
	}

	if (type === 1) {
		optionsElements.searchDurationRetour = document.getElementById('sliderDurationRetour');
		optionsElements.searchDepartRetour = document.getElementById('sliderDepartRetour');
		optionsElements.searchArriveeRetour = document.getElementById('sliderArriveeRetour');
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

	// createRouteArray place les différentes routes du trajet (aller et retour) dans deux arrays différents.
	// Prend chaque trajet de l'allée et du retour en compte.

	const aller = createRouteArray(flight)[0];
	const retour = createRouteArray(flight)[1];
    
    const sumDistance = distanceWay(aller) + distanceWay(retour);

    // Changer le calcul du carbon en fonction du tableau qu'on aura établi

    const totalCarbon = Math.round((sumDistance * 190) / 1000);

    return [sumDistance, totalCarbon]
}

// Calcul la distance total à partir d'une array de routes.

function distanceWay(array) {
	let distance = 0
    array.forEach ( route => {
    	distance += distanceFlight(route.latFrom, route.lngFrom, route.latTo, route.lngTo, 'K')
    })
    return distance
}

// Deux fonctions qui trouvent la valeur max et min de l'array

export const optionalMaxValue = (array) => {
	return Math.max.apply(null, array)
}

export const optionalMinValue = (array) => {
	return Math.min.apply(null, array)
}

// Créé le markup des sliders et l'insert dans la bonne div. 
// Faire une fonction qui créer différents sliders en fonction du type. 

function createSliderMarkup(sliderType, sliderMinValueTarget, sliderMaxValueTarget, minValue, maxValue, option, id) {

	const markup =`	
			    <div style="width:230px;" id="loaded">
                    <div class="slider__presentation__target" id="" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="false" aria-controls="collapse-${id}">
			        	<p class="option__title">${option}</p>
			        	<img src="https://res.cloudinary.com/tark-industries/image/upload/v1553081403/Arrow_SKYTREEP.png" class="slider__presentation__arrow"> 
			        </div>

                    <div class="collapse in" id="collapse-${id}">
                        <div class="slider__update__display">
                          <p class="value__target__update" id="min-${id}"></p>
                          <p class="value__target__update" id="max-${id}"></p>
                        </div>
				        <div id="${sliderType}" class="slider__style">
					  	    <input class="target-option" id="${sliderMinValueTarget}" type="hidden" value="${minValue}"> 
					  	    <input class="target-option" id="${sliderMaxValueTarget}" type="hidden" value="${maxValue}"> 
					    </div>					    
			        </div>			      
			    </div>
		<div class="straight__details"></div>
    `
    document.querySelector('.flights__options').insertAdjacentHTML('beforeend', markup);
} 

// Le timeStamp correspond a la date de départ en seconde a partir de 1970. 
// Prend un unixStamp en seconde et le transforme en minutes dans une journée. 

export const formatageCreationSlider = (unixStamp) => {
	
	let result, heures, minutes;
	
	result = (new Date(unixStamp * 1000)).toTimeString().split(':');
	heures = parseInt(result[0]) * 60;
	minutes = parseInt(result[1]);
    result = heures + minutes;

    return result
}


function createMarkupHoraire(flights, type, minDepartureTime, maxDepartureTime, minArrivalTime, maxArrivalTime) {

  markupHoraire('G');
  const horaireDepartTarget = document.getElementById('horaire__depart__target');
  const horaireArriveeTarget = document.getElementById('horaire__arrivee__target');

  const horaireDepart = sliderOnlyMarkup('sliderDepart', 'minDepartInput', 'maxDepartInput', minDepartureTime, maxDepartureTime, 'H', `départ de ${flights[0].flyFrom}`, 'départ')
  const horaireArrivee = sliderOnlyMarkup('sliderArrivee', 'minArriveeInput', 'maxArriveeInput', minArrivalTime, maxArrivalTime, 'I', `arrivée à ${flights[0].flyTo}`, 'arrivée')
  horaireDepartTarget.insertAdjacentHTML('beforeend', horaireDepart)
  horaireArriveeTarget.insertAdjacentHTML('beforeend', horaireArrivee)

  if (type === 1) {
  	let departuresRetour, arrivalsRetour;
    departuresRetour = [];
    arrivalsRetour = [];
    // I want to get the departure time and arrival time of return flight. 


	flights.forEach( flight => {
        let returnRoutesArray = [];
		flight.route.forEach( route => {
			if (route.return === 1) {
				returnRoutesArray.push(route)
			}
		})
		departuresRetour.push(returnRoutesArray[0].dTime)
		arrivalsRetour.push(returnRoutesArray[returnRoutesArray.length - 1].aTime)
	});

    // arrivalsRetour.sort().forEach( stamp => {
    //     console.log(formatageCreationSlider(stamp));
    // });
    
    let maxDepartureRetourTime = optionalMaxValue(departuresRetour);
    let minDepartureRetourTime = optionalMinValue(departuresRetour);
    let maxArrivalRetourTime = optionalMaxValue(arrivalsRetour);
    let minArrivalRetourTime = optionalMinValue(arrivalsRetour);
    

    maxDepartureRetourTime = formatageCreationSlider(maxDepartureRetourTime);
    minDepartureRetourTime = formatageCreationSlider(minDepartureRetourTime);
    maxArrivalRetourTime = formatageCreationSlider(maxArrivalRetourTime);
    minArrivalRetourTime = formatageCreationSlider(minArrivalRetourTime);

    

    // if (minDepartureRetourTime > maxDepartureRetourTime || minDepartureRetourTime === maxDepartureRetourTime) {
    	maxDepartureRetourTime = 1439;
    	minDepartureRetourTime = 0;
    // } 
    // bug du fait que le time est le lendemain mais après le min donc le prend pas en compte. J'ai besoin de réguler les jours.
    // if (minArrivalRetourTime > maxArrivalRetourTime || minArrivalRetourTime === maxArrivalRetourTime) {
    	maxArrivalRetourTime = 1439;
    	minArrivalRetourTime = 0;
    // }

    const horaireDepartRetour = sliderOnlyMarkup('sliderDepartRetour', 'minDepartRetourInput', 'maxDepartRetourInput', minDepartureRetourTime, maxDepartureRetourTime, 'J', `départ de ${flights[0].flyTo}`, 'départRetour')
    const horaireArriveeRetour = sliderOnlyMarkup('sliderArriveeRetour', 'minArriveeRetourInput', 'maxArriveeRetourInput', minArrivalRetourTime, maxArrivalRetourTime, 'K', `arrivée à ${flights[0].flyFrom}`, 'arrivéeRetour')
    horaireDepartTarget.insertAdjacentHTML('beforeend', horaireDepartRetour)
    horaireArriveeTarget.insertAdjacentHTML('beforeend', horaireArriveeRetour)
  }

  horaireSwitch();
}



function arrowTurn() {
    const arrows = Array.from(document.querySelectorAll('.slider__presentation__target'));
    arrows.forEach( arrow => {
        arrow.addEventListener('click', () => {
            arrow.children[1].classList.toggle('arrow__loop');
        })
    }); 
}



function createOptionsAnchor() {

    const markup = `
        <div class="flights__options">

        </div>
    `
    elements.searchContainer.insertAdjacentHTML('afterbegin', markup)
}









