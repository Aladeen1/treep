import { elements } from '../views/base'


export const handleFieldTransition = event => {
    if (event === 'oneway') {
    document.getElementById('departDate__search').classList.add('expand-date-field');
    document.getElementById('returnDate__search').classList.add('retract-date-field');
  } else {
    document.getElementById('departDate__search').classList.remove('expand-date-field');
    document.getElementById('returnDate__search').classList.remove('retract-date-field');
  }
}

// Use offset to make a better transition (pas primordial)