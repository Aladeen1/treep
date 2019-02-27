import { elements } from './base';


// export const clearInput = () => {
//     elements.searchDepartInput.value = '';
//     elements.searchReturnInput.value = '';
// };

export const getInput = location => {
  const element = elements[location].value;
  return element;
}

export const clearResults = () => {
    // document.getElementById('airports__depart').innerHTML = '';
    // document.getElementById('airports__return').innerHTML = '';
    document.querySelector('.flights__list').innerHTML = '';
};


export const setInput = (location, params) => {
	// console.log(params);
	elements[location].value = params;
}

export const clearSliders = () => {
	document.querySelector('.flights__options').innerHTML = '';
}