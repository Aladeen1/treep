import { elements } from './base';
import { getInput } from './searchView';

// flights => the array of all flights that are stored in state.search.result and that we can use in the controller.

export const optionalP = () => {
   const name = {
	durationMax: document.getElementById('maxDurationInput').value,
	prixMax:document.getElementById('maxPrixInput').value,
	prixMin:document.getElementById('minPrixInput').value,
	departMax: document.getElementById('maxDepartInput').value,
	departMin: document.getElementById('minDepartInput').value,
	arriveeMax: document.getElementById('maxArriveeInput').value,
	arriveeMin: document.getElementById('minArriveeInput').value
   }
   return name
}


export const displayOptions = flights => {
	let arrivals, departures, durations, prices;
	arrivals = [];
	departures = [];
	durations = [];
	prices = [];
	flights.forEach( flight => {
		prices.push(flight.price);
		durations.push(flight.duration.departure);
		departures.push(flight.dTime);
		arrivals.push(flight.aTime);
	})
   
    let maxArrivalTime = optionalMaxValue(arrivals);
    let minArrivalTime = optionalMinValue(arrivals);
    let maxDepartureTime = optionalMaxValue(departures);
    let minDepartureTime = optionalMinValue(departures);
    let maxPrice = optionalMaxValue(prices);
    let minPrice = optionalMinValue(prices);
    let maxDuration = optionalMaxValue(durations);
    let minDuration = optionalMinValue(durations);
    
    
    maxArrivalTime = 1439;
    minArrivalTime = 0;
    maxDepartureTime = formatageCreationSlider(maxDepartureTime);
    minDepartureTime = formatageCreationSlider(minDepartureTime);
    maxDuration = Math.ceil((maxDuration / 60) / 60);
    minDuration = Math.floor((minDuration / 60) / 60);
    
    console.log(maxDuration)
    console.log(minDuration)
    
    console.log(` Les min values sont: ${minArrivalTime}, ${minDepartureTime}, ${minPrice}, ${minDuration}`)

  createSliderMarkup('sliderDuration', 'minDurationInput', 'maxDurationInput', minDuration, maxDuration, 'Durée')
  createSliderMarkup('sliderPrix', 'minPrixInput', 'maxPrixInput', minPrice, maxPrice, 'Prix')
  createSliderMarkup('sliderDepart', 'minDepartInput', 'maxDepartInput', minDepartureTime, maxDepartureTime, 'Départ')
  createSliderMarkup('sliderArrivee', 'minArriveeInput', 'maxArriveeInput', minArrivalTime, maxArrivalTime, 'Arrivée')

   const optionsElements = {
  	searchDuration: document.getElementById('sliderDuration'),
    searchPrix: document.getElementById('sliderPrix'),
    searchDepartHour: document.getElementById('sliderDepart'),
    searchArriveeHour: document.getElementById('sliderArrivee'),
    optionLoaded: document.getElementById('loaded')
  }

  return optionsElements
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
				  	<input id="${sliderMinValueTarget}" type="hidden" value="${minValue}"> 
				  	<input id="${sliderMaxValueTarget}" type="hidden" value="${maxValue}"> 
				  </div>
			      
			      
			    </div>
		  	</div>
		</div>
    `
    document.querySelector('.flights__options').insertAdjacentHTML('beforeend', markup);
}


function formatageCreationSlider(unixStamp) {
	
	let result, heures, minutes;
	
	result = (new Date(unixStamp * 1000)).toTimeString().split(':');
	heures = parseInt(result[0]) * 60;
	minutes = parseInt(result[1]);
    result = heures + minutes;

    return result
}



