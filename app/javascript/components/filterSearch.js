import { elements, renderLoader, clearLoader } from '../views/base';
import { ecological } from '../views/sliderCreation';
import { clearFlights } from '../views/searchView';
import * as searchView from '../views/flightView';
import { sortFlights } from '../views/sliderUtilisation';



// create function that when we click on one block, clearFlights and then render the result with the array sorted

const airlines = JSON.parse(localStorage.getItem('Airlines'));

function addDetteco(flights) {
  
  flights.map( flight => {
    flight.detteco = ecological(flight)[1]
  })
  
}

export const flightsArraySorted = () =>  {
  // Cette fonction doit retourner 3 array des vols triée dans différents ordres
  let flights = JSON.parse(localStorage.getItem('Recherche'));

  addDetteco(flights);

  let priceArray, ecoloArray, durationArray;

  priceArray = flights.slice();
  ecoloArray = flights.slice().sort((a, b) => {
    return a.detteco - b.detteco;
  });
  durationArray = flights.slice().sort((a,b) => {
    return a.duration.total - b.duration.total;
  });

  return [priceArray, ecoloArray, durationArray]
}


function switchIcons(arrayflights) {
	const icons = Array.from(document.querySelectorAll('.filter__text'));

  icons.forEach( icon => {
    	icon.addEventListener('click', event => {
    		if (event.target.id != 'active__measure__in') {
          document.getElementById('active__measure__in').id = '';
          event.target.id = 'active__measure__in';
          sortFlights();		
    		};
      })
  })
}


// entrer vers flight controller // Faudra mettre au propre un jour
export const createFilterMarkup = () => {
  const arrayflights = flightsArraySorted();
  createTopFiltersAnchor();
	const markup = `
	  <div class="filter__square front"><p class="filter__text front" id="active__measure__in">Vol le moins cher<br>${arrayflights[0][0].price} EUR</br></p></div>
      <div class="filter__square"><p class="filter__text">Vol le plus écologique<br>${arrayflights[1][0].price} EUR</br></p></div>
      <div class="filter__square back"><p class="filter__text back">Vol le plus rapide<br>${arrayflights[2][0].price} EUR</br></p></div>
	`
   document.querySelector('.flights__filter__display').insertAdjacentHTML('afterbegin', markup)
   switchIcons(arrayflights);
}

// créer une fonction à mettre dans switch icons pour prendre en compte tous les cas


function createTopFiltersAnchor() {
  const markup = `
    <div class="flights__second__container">
        <div class="flights__filter__display">
        </div>
    </div>
  `
  elements.searchContainer.insertAdjacentHTML('beforeend', markup);
}



















