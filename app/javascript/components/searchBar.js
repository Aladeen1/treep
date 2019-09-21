import { getInput } from '../views/searchView';
import { searchValidation } from './searchBarValidations';
import { home, search, compensation } from '../views/base';
import { controlSearch } from '../controllers/flightController';

class UserInputs {
  constructor(ville_aller, ville_retour, date_aller, date_retour, flight_type, passengers) {
  	this.ville_aller = ville_aller;
  	this.ville_retour = ville_retour;
  	this.date_aller = date_aller;
  	this.date_retour = date_retour;
  	this.flight_type = flight_type;
  	this.passengers = passengers;
  }
}


function cacheInputs() {
	
    localStorage.removeItem('userFlight');
    
	const ville_aller = getInput('searchDepartInput');
	const ville_retour = getInput('searchReturnInput');
	const date_aller = getInput('searchDepartDateFrom');
	const date_retour = getInput('searchReturnDateFrom');
	const flight_type = getInput('searchFlightType');
	const passengers = getInput('searchPassengers');

	let inputs = new UserInputs(ville_aller, ville_retour, date_aller, date_retour, flight_type, passengers);
	inputs = JSON.stringify(inputs);

	localStorage.setItem('UserInputs', inputs);	
}
 

function sendData() {
	document.querySelector('.checkout__button').addEventListener('click', (envoi) => {
		console.log("sending data, imply reload")
		envoi.preventDefault();
		const validation = searchValidation();
		if (validation) {
			cacheInputs();
			if (home) {
				window.location.href = "http://localhost:3000/search";
			} else {
				controlSearch();
			}	
		}
		// "http://localhost:3000/search"
		// "http://www.skytreep.fr/search"
	})
}

if (home != null || search != null || compensation != null) {
	sendData();
}








