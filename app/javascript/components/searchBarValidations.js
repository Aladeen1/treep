import { getInput, clearInterface } from '../views/searchView';
import { getAirportCode } from '../views/flightView';

export const searchValidation = () => {
	console.log("sending validation");
	

	let valide, datesValide;
	const departDate = getInput('searchDepartDateFrom');
	const returnDate = getInput('searchReturnDateFrom');
	const departLocation = getAirportCode(getInput('searchDepartInput')).length;
	const returnLocation = getAirportCode(getInput('searchReturnInput')).length;
	const airportsValide = validateAirports(departLocation, returnLocation);

	if (airportsValide) {
		datesValide = compareDates(departDate, returnDate);
	}

	if (airportsValide && datesValide) {
		valide = true;
	} else {
		valide = false;
	}

	window.setTimeout( () => {
		nettoyerSearchErrorMessage();
	}, 300)

	return valide;
}


function validateAirports(departLocation, returnLocation) {
	let verdict;

	if (departLocation != 3 && returnLocation != 3) {
		verdict = false;
		addSearchErrorMessage("Les 2 aéroports saisis sont invalides, veuillez les sélectionner en cliquant dessus dans la liste");
	} else if (departLocation != 3) {
		verdict = false;
		addSearchErrorMessage("L'aéroport de départ n'est pas valide, veuillez en sélectionner un en cliquant dessus dans la liste");
	} else if (returnLocation != 3) {
		verdict = false;
		addSearchErrorMessage("L'aéroport d'arrivée n'est pas valide, veuillez en sélectionner un en cliquant dessus dans la liste");
	} else {
		verdict = true;
	}

	return verdict;
}

function compareDates(departDate, returnDate) {
	let dateRetour, dateDuJour, verdict;
	dateDuJour = new Date();
	dateDuJour = (new Date(dateDuJour.getFullYear() ,dateDuJour.getMonth(), dateDuJour.getDate())).getTime();
	const dateDepart = turnDateIntoStamp(departDate);

	if (dateDepart >= dateDuJour) {
		if (returnDate) {
			dateRetour = turnDateIntoStamp(returnDate);
			if (dateRetour >= dateDuJour) {
				if (dateRetour >= dateDepart) {
					verdict = true;
				} else {
					verdict = false;
					addSearchErrorMessage("La date de retour ne peut précéder la date de départ");
				}
			} else if (dateDuJour >= dateRetour) {
				verdict = false;
				addSearchErrorMessage("La date de retour est déjà passée");
			} else {
				verdict = false;
				addSearchErrorMessage("Il manque une date de retour pour effectuer la recherche");
			}
		} else {
			verdict = true;
		}
	} else if (dateDuJour >= dateDepart) {
		verdict = false;
		addSearchErrorMessage("La date de départ est déjà passée");
	} else {
		verdict = false;
		addSearchErrorMessage("Il manque une date de départ pour effectuer la recherche");
	}

	return verdict;
}

function turnDateIntoStamp(inputDate) {
	let dateStamp = inputDate.split('/');
	dateStamp = new Date(dateStamp[2], (dateStamp[1] - 1), dateStamp[0]);
	return dateStamp.getTime();
}

function addSearchErrorMessage(string) {
	const ancre = document.querySelector('.search__bar__frame');
	ancre.insertAdjacentHTML('beforeend', `<p class="search__error__message">${string}</p>`)
}

function nettoyerSearchErrorMessage() {
	const target = document.querySelector('.search__error__message');

	if (target) {
		window.addEventListener('click', () => { 
			console.log('deleting target')
			target.remove() 
		})
	}
}













