// Global app controller
import * as searchView from '../views/searchView';
import { elements } from '../views/base';
import Search from '../models/Search';


const state = {};
let airlines;

/**
 * SEARCH CONTROLLER
 */

// function qui a pour but de récupérer le code de l'aéroport
// et de le placer dans une variable exploitable pour une recherche flight

// On écoute un changement dans le field ou ça tape

// On envoie une requête avec la valeur de l'input grace au callback

const callLocationAPI = async (targetInput) => {

  // crée un nouvel object vide pour y mettre des choses dedans

  state.search = new Search();

  // clean the interface

  searchView.clearResults();


  // get the input value
  const query = searchView.getInput(targetInput);

  // make the API call
  try {

    // Store the result in the 'locations' property of the search Object
    // Only store the locations which is an array
    await state.search.getLocation(query, 'locations');


    //print the result for convenience
    console.log(state.search.locations);

    // Iterate over this array an render each element in a list on the interface

      // Besoin d'un if statement pour savoir dans quelle liste on met la liste

    if (targetInput == 'searchDepartInput' && state.search.locations) {
      state.search.locations.forEach( result => {
        searchView.renderDestination(result, '#airports__depart');
      });
    } else if (targetInput == 'searchReturnInput' && state.search.locations) {
      state.search.locations.forEach( result => {
        searchView.renderDestination(result, '#airports__return');
      });
    }
  } catch (err) {
    alert(err)
  }
}

export const displayAiports = () => {
  document.addEventListener('keydown', (event) => {
    if (event.target.id === "returnLoc__search") {
      callLocationAPI('searchReturnInput');
    }
    else if (event.target.id === "departLoc__search") {
      callLocationAPI('searchDepartInput');
    }
  });
}


export const controlSearch = async () => {
    // 1) Get airport codes from locations queried in the view
  // const departLoc = searchView.getAirportCode(searchView.getInput('searchDepartInput'));
  // const returnLoc = searchView.getAirportCode(searchView.getInput('searchReturnInput'));
  // const departureDate = searchView.getInput('searchDepartDate');
  // const returningDate = searchView.getInput('searchReturnDate');

  // Pour les tests //
  const departLoc = "London, STN"
  const returnLoc = "Paris, CDG"
  const departureDate = "05/02/2019"
  const returningDate = "15/02/2019"
    // const queryDeparture = searchView.getInput('searchDepartInput');
    // const queryReturn = searchView.getInput('searchReturnInput');


    // "https://api.skypicker.com/locations?term=PRG&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name";
    // "https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=02/02/2019&dateTo=05/02/2019&partner=picky";

  if (departLoc && returnLoc && departureDate && returningDate) {
    console.log(`The destination is ${departLoc}, the return location is ${returnLoc}, the depart day is ${departureDate}, the return date is ${returningDate}`);
        // 2) New search object and add to state
        state.search = new Search(departLoc, returnLoc, departureDate, returningDate);

        // 3) Prepare UI for results
        // searchView.clearInput();


        try {

            // await state.search.getAirportCode();
            await state.search.getAirlinesCode();
            // 4) Search for flights
            await state.search.getFlights();



            // 5) Render results on UI
            // state.search.result.forEach( result => {
            //   searchView.renderFlight(result.name);
            searchView.renderResults(state.search.result, state.search.airlines);
            // });


            // searchView.renderFlight(state.search.resultat);


        } catch (err) {
            alert(err);
        }
  }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});




