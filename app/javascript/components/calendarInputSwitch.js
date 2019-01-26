import { elements } from '../views/base'

elements.searchFlightType.addEventListener('change', e => {
  if (e.target.value === 'oneway') {
    setTimeout( () => {
      elements.searchDepartDateFrom.classList.toggle('oneway__search');
      setTimeout ( () => {
        elements.searchReturnDateFrom.style.display = 'none';
      }, 700)
    }, 500)
    elements.searchReturnDateFrom.classList.toggle('hide__return');
  } else if (e.target.value === 'round') {
    elements.searchReturnDateFrom.style.display = 'block';
    setTimeout( () => {
     elements.searchReturnDateFrom.classList.toggle('hide__return');
     elements.searchDepartDateFrom.classList.toggle('oneway__search');
    }, 30)
  }
});