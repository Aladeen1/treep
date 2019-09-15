import { elements } from './base';
import { handleFieldTransition } from '../components/calendarInputSwitch';


// export const clearInput = () => {
//     elements.searchDepartInput.value = '';
//     elements.searchReturnInput.value = '';
// };
 
export const getInput = location => {
  const element = elements[location].value;
  return element;
}

export const clearInterface = () => {
	elements.searchContainer.innerHTML = '';
}

export const clearFlights = () => {
    document.querySelector('.flights__list').innerHTML = '';
};

export const setInput = (location, params) => {
	elements[location].value = params;
}

export const populateSearchFields = () => {

	const input = JSON.parse(localStorage.getItem('UserInputs'));
    
	setInput('searchDepartInput', input.ville_aller);
  setInput('searchReturnInput', input.ville_retour);
  setInput('searchDepartDateFrom', input.date_aller);
  setInput('searchFlightType', input.flight_type);
  setInput('searchPassengers', input.passengers);
  if (input.flight_type === 'round') {
    setInput('searchReturnDateFrom', input.date_retour);
    elements.searchFlightType.children[0].setAttribute('selected', 'selected');
    handleFieldTransition(elements.searchFlightType.value);
  } else {
    elements.searchFlightType.children[1].setAttribute('selected', 'selected');
    handleFieldTransition(elements.searchFlightType.value);
  }   
}









