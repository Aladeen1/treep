import { elements } from './base';


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
	// console.log(params);
	elements[location].value = params;
}

