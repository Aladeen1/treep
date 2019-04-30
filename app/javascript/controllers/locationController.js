import { renderDestination } from '../views/locationView';
import { elements } from '../views/base';
import Search from '../models/Search';
import { getInput, clearResults } from '../views/searchView';

const state = {};

// function qui a pour but de récupérer le code de l'aéroport
// et de le placer dans une variable exploitable pour une recherche flight
// On écoute un changement dans le field ou ça tape
// On envoie une requête avec la valeur de l'input grace au callback

const callLocationAPI = (targetInput) => {

  // crée un nouvel object vide pour y mettre des choses dedans
  state.search = new Search();

  // clean the interface
  // clearResults();

  // get the input value
  const query = getInput(targetInput);

  // make the API call
  // Store the result in the 'locations' property of the search Object
  // Only store the locations which is an array
  //print the result for convenience
  // Iterate over this array an render each element in a list on the interface
  // Besoin d'un if statement pour savoir dans quelle liste on met la liste

  state.search.getLocation(query, 'locations')
  .then(() => {
    if (targetInput == 'searchDepartInput' && state.search.locations) {
      state.search.locations.forEach( result => {
        renderDestination(result, '#airports__depart');
      });
    } else if (targetInput == 'searchReturnInput' && state.search.locations) {
      state.search.locations.forEach( result => {
        renderDestination(result, '#airports__return');
      });
    }
  })
  .catch(err => alert(err))
}

export const displayAirports = () => {
  document.addEventListener('keydown', (event) => {
    if (event.target.id === "returnLoc__search") {
      callLocationAPI('searchReturnInput');
    }
    else if (event.target.id === "departLoc__search") {
      callLocationAPI('searchDepartInput');
    }
  });
}
