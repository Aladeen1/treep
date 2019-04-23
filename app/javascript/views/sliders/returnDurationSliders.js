import { optionalMaxValue, optionalMinValue } from '../sliderCreation';

let durationsRetour;
export const createMarkupDurationRetour = (flights, type) => {
	if (type === 1) {
		
		durationsRetour = [];
		flights.forEach( flight => {
	      durationsRetour.push(flight.duration.return);
		})

		let maxDurationRetour = Math.ceil((optionalMaxValue(durationsRetour) / 60));
		let minDurationRetour = Math.floor((optionalMinValue(durationsRetour) / 60));
		let markup = sliderReturnCase('sliderDuration', 'minDurationRetourInput', 'maxDurationRetourInput', minDurationRetour, maxDurationRetour, 'F');
		document.getElementById('sliderDuration').insertAdjacentHTML('afterend', markup);
	}
}


function sliderReturnCase(sliderType, sliderMinValueTarget, sliderMaxValueTarget, minValue, maxValue, id) {
	let markupReturn;
	if (sliderType === 'sliderDuration') {

		markupReturn = `
		    <p>Retour</p>
		    <div class="slider__update__display">
		          <p class="value__target__update" id="minRetour-${id}"></p>
		          <p class="value__target__update" id="maxRetour-${id}"></p>
            </div>
			<div id="sliderDurationRetour" class="slider__style">
		  	    <input class="target-option" id="${sliderMinValueTarget}" type="hidden" value="${minValue}"> 
		  	    <input class="target-option" id="${sliderMaxValueTarget}" type="hidden" value="${maxValue}"> 
		    </div> 
	    `
	}
	return markupReturn
}