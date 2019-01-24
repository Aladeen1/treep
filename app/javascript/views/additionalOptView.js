import { elements } from './base';
import { getInput } from './searchView';

// flights => the array of all flights that are stored in state.search.result and that we can use in the controller.

export const optionalP = () => {
   const name = {
	duration: getInput('searchDuration'),
	prix: getInput('searchPrix'),
	depart: getInput('searchDepart'),
	arrivee: getInput('searchArrivee')
   }
   return name
}

// searchDuration: document.getElementById('Duration'),
//     searchPrix: document.getElementById('Prix'),
//     searchDepart: document.getElementById('Depart'),
//     searchArrivee: document.getElementById('Arrivee'),