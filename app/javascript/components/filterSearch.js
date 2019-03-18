import { ecological } from '../views/sliderCreation';
import { clearResults } from '../views/searchView';
import * as searchView from '../views/flightView';


let flights = JSON.parse(localStorage.getItem('Recherche'));
const airlines = JSON.parse(localStorage.getItem('Airlines'));

// create function that when we click on one block, clearResults and then render the result with the array sorted

function renderFilteredFlights(flights, event) {

    if (event.target.innerHTML.includes('écolo')) {
        let array = flights;
	    array.map( flight => {
		  flight.detteco = ecological(flight)[1];
	    })

	    array.sort((a,b) => {
		  return a.detteco - b.detteco;
	    })
	    clearResults();
	    searchView.renderResults(array, airlines)
	    	
    } else if (event.target.innerHTML.includes('cher')) {
    	let array = flights;
    	clearResults();
    	
    	array.sort((a,b) => {
		  return a.price - b.price;
	    })
	    searchView.renderResults(flights, airlines)

    } else if (event.target.innerHTML.includes('rapide')) {
    	let array = flights;
    	clearResults();
    	array.sort((a,b) => {
		  return a.duration.total - b.duration.total;
	    })  
        searchView.renderResults(array, airlines)
    }
}


function switchIcons() {
	const icons = Array.from(document.querySelectorAll('.filter__text'));
    icons.forEach( icon => {
      	icon.addEventListener('click', event => {
      		if (event.target.id != 'active__measure__in') {
      			document.getElementById('active__measure__in').id = '';
      			event.target.id = 'active__measure__in';
                renderFilteredFlights(flights, event);
      		};
        })
    })
}

export const createFilterMarkup = () => {
	const markup = `
	  <div class="filter__square front"><p class="filter__text front" id="active__measure__in">Vol le moins cher<br>57 EUR</br></p></div>
      <div class="filter__square"><p class="filter__text">Vol le plus écologique<br>59 EUR</br></p></div>
      <div class="filter__square back"><p class="filter__text back">Vol le plus rapide<br>79 EUR</br></p></div>
	`
   document.querySelector('.flights__filter__display').insertAdjacentHTML('afterbegin', markup)
   switchIcons();
}

// créer une fonction à mettre dans switch icons pour prendre en compte tous les cas






