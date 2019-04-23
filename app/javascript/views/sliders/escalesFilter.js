import { getTransferNumber } from '../renderFlight';
import { createRouteArray } from '../renderDetails';
import { sortFlights } from '../sliderUtilisation';


export const createEscaleMarkup = (flights, id) => {

	const price = getPricesForFlights(flights);

	const markup =
	`
		<div class="container" id="loaded">
		  	<div class="row">
			    <div style="width:100%;">
                    
                    <div class="slider__presentation__target" id="" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="false" aria-controls="collapse-${id}">
			        	<p class="option__title">Escales</p>
			        	<img src="https://res.cloudinary.com/tark-industries/image/upload/v1553081403/Arrow_SKYTREEP.png" class="slider__presentation__arrow"> 
			        </div>

                    <div class="collapse" id="collapse-${id}">
                      	<ul class="escale__list__container">
                      		${displayMarkup('Direct', price[0])}
                      		${displayMarkup('1 escale', price[1])}
                      		${displayMarkup('2 escales', price[2])}
                      		${displayMarkup('3 escales', price[3])}
                      	</ul>
			        </div>
			      
			    </div>
		  	</div>
		</div>
		<div class="straight__details"></div>
    `
    document.querySelector('.flights__options').insertAdjacentHTML('beforeend', markup);
    triParEscales(flights);
}

function getPricesForFlights(flights) {
	let direct, oneEscale, twoEscale, threeEscale;
    direct = [];
    oneEscale = [];
    twoEscale = [];
    threeEscale = [];

    // I have to divide the routes into 2. 


	flights.forEach( flight => {

		const escales = getEscalesNumber(flight);
		
		assignRoute(flight, escales[0], direct, oneEscale, twoEscale, threeEscale)
		assignRoute(flight, escales[1], direct, oneEscale, twoEscale, threeEscale)
	})

	const cheapestDirect = getCheapestFlight(direct)
	const cheapestOneEscale = getCheapestFlight(oneEscale)
	const cheapestTwoEscale = getCheapestFlight(twoEscale)
	const cheapesthreeEscale = getCheapestFlight(threeEscale)

	return [cheapestDirect, cheapestOneEscale, cheapestTwoEscale, cheapesthreeEscale]
    
}


function assignRoute (flight, type, direct, oneEscale, twoEscale, threeEscale) {
	if (type === '0') {
		direct.push(flight)
	} else if (type === '1') {
		oneEscale.push(flight)
	} else if (type === '2') {
		twoEscale.push(flight)
	} else if (type === '3') {
		threeEscale.push(flight)
	}
}


function getCheapestFlight(array) {
	if (array.length > 0) {
		array.sort((a,b) => {
			return a.price - b.price;
		})
    
		return array[0].price
	}
}

function displayMarkup(type, price) {
	let markup = '';
	if (price != null) {
    	markup = `
    		<li class="escale__list__element">
      			<label>
      				<input type="checkbox" class="filter__checkbox">
      				${type}
      			</label>
      			<p>${price} EUR</p>
      		</li>
    	`
	}

	return markup
}

function triParEscales(flights) {
    const checkboxes = Array.from(document.querySelectorAll('.filter__checkbox'));
    checkboxes.forEach( checkbox => {
    	checkbox.addEventListener('click', () => {
    		sortFlights();
    	})
    });
}

export const getNumberBoxChecked = () => {
	const checkboxes = Array.from(document.querySelectorAll('.filter__checkbox'));
	let array = [];
	checkboxes.forEach( (checkbox) => {
		if (checkbox.checked) {
		  const escaleType = getEscaleType(checkbox.parentElement.innerText);
          array.push(escaleType)
		}
	})
	console.log(array);
	return array
}

function getEscaleType(text) {
  let type = text.split(' ')[1];
  if (type === 'Direct') {
  	type = '0';
  }
  return type
}

export const getEscalesNumber = (flight) => {

	let aller = createRouteArray(flight)[0];
	let retour = createRouteArray(flight)[1];
	
	aller = getTransferNumber(aller).split(" ")[0];
	if (retour.length > 0) {
		retour = getTransferNumber(retour).split(" ")[0];
	}
	

	if (aller === "direct") {
		aller = "0";
	}

	if (retour === "direct") {
		retour = "0";
	}

	return [aller, retour]
}





