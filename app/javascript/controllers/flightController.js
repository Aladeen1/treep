import * as searchView from '../views/flightView';
import { getInput, clearResults, clearSliders } from '../views/searchView';
import { elements, search } from '../views/base';
import Search from '../models/Search';
import { displayOptions } from '../views/sliderCreation';
import { getOptionValues } from '../views/sliderUtilisation';
import { globalSliderInitialization } from '../components/sliderRange';
import { targetRedirection } from '../components/modalApparition';

const state = {};

export const controlSearch = () => {

  clearResults();

    // 1) Get airport codes from locations queried in the view
  const departLocation = searchView.getAirportCode(getInput('searchDepartInput'));
  const returnLocation = searchView.getAirportCode(getInput('searchReturnInput'));
  const departDateFrom = getInput('searchDepartDateFrom');
  const departDateTo = departDateFrom;
  const flightType = getInput('searchFlightType');
  const passengers = getInput('searchPassengers');



  if (departLocation && returnLocation && departDateTo && departDateFrom && flightType && passengers) {
    console.log(`The destination is ${departLocation}, the return location is ${returnLocation}, the depart day is ${departDateFrom}, the return date is ${departDateTo}, for ${passengers} passengers and it's a ${flightType} ticket`);
    // 2) New search object and add to state
 
    if (flightType == 'round') {
      const returnDateFrom = getInput('searchReturnDateFrom');
      const returnDateTo = returnDateFrom;
      state.search = new Search(departLocation, returnLocation, departDateFrom, departDateTo, flightType, passengers, returnDateFrom, returnDateTo);
    } else if (flightType == 'oneway') {
      state.search = new Search(departLocation, returnLocation, departDateFrom, departDateTo, flightType, passengers);
    }
    

    // 3) Prepare UI for results
    // searchView.clearInput();
    
    // 4) Search for flights
    clearSliders();
    const call = Promise.all([state.search.getFlights(), state.search.getAirlinesCode()]);
    call.then(() => {
      // Les deux fonctions ont cachés les réponses donc on les récupère et on les assigne à deux variables
      const airlines = JSON.parse(localStorage.getItem('Airlines'));
      const resultat = JSON.parse(localStorage.getItem('Recherche'));
      console.log(resultat)
      // if (document.getElementById('loaded') == null) {
      var optionsElement = displayOptions(resultat);
      globalSliderInitialization(optionsElement.searchCarbon, optionsElement.searchDistance, optionsElement.searchDuration, optionsElement.searchPrix, optionsElement.searchDepartHour, optionsElement.searchArriveeHour);
      // }
      // 5) Render results on UI
      searchView.renderResults(resultat, airlines);
      targetRedirection();
     })
  //   .catch(err => console.log(err))
   }
}

// Arguments of the getFlight Method => options.duration, options.prix, options.depart, options.arrivee







