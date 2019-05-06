import * as searchView from '../views/flightView';
import { getInput, clearInterface } from '../views/searchView';
import { elements, search, renderLoader, clearLoader } from '../views/base';
import Search from '../models/Search';
import { displayOptions } from '../views/sliderCreation';
import { getOptionValues } from '../views/sliderUtilisation';
import { globalSliderInitialization } from '../components/sliderRange';
import { targetRedirection } from '../components/modalApparition';
import { createFilterMarkup } from '../components/filterSearch';
import { createRouteArray, distanceFlight } from '../views/renderDetails';


const state = {};

export const controlSearch = () => {

  if (localStorage.getItem('Recherche')) {
    console.log('clearStorage')
    localStorage.removeItem('Recherche')
  }

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
    if (document.querySelector('.flights__display')) {
      clearInterface();
    }
    
    renderLoader(elements.searchContainer);
    // searchView.clearInput();
    
    // 4) Search for flights
    
    const call = Promise.all([state.search.getFlights(), state.search.getAirlinesCode()]);
    call.then(() => {
      // Les deux fonctions ont cachés les réponses donc on les récupère et on les assigne à deux variables
      const airlines = JSON.parse(localStorage.getItem('Airlines'));
      const resultat = JSON.parse(localStorage.getItem('Recherche'));

      console.log(resultat);
      // showDistanceToParis(resultat);
      
      // 5) Render results on UI

      clearLoader(elements.searchContainer);

      // slider
        if (resultat[0].routes.length >= 2) {
          var optionsElement = displayOptions(resultat, 1);
          globalSliderInitialization(optionsElement.searchCarbon, optionsElement.searchDistance, optionsElement.searchDuration, optionsElement.searchPrix, optionsElement.searchDepart, optionsElement.searchArrivee, optionsElement.searchDurationRetour, optionsElement.searchDepartRetour, optionsElement.searchArriveeRetour);
        } else {
          var optionsElement = displayOptions(resultat, 0);
          globalSliderInitialization(optionsElement.searchCarbon, optionsElement.searchDistance, optionsElement.searchDuration, optionsElement.searchPrix, optionsElement.searchDepart, optionsElement.searchArrivee);
        }
        
      // filter
        createFilterMarkup();

      // flights
        searchView.renderResults(resultat, airlines);
        targetRedirection();

     })

     // .catch(err => console.log(err))
   }
}

// Arguments of the getFlight Method => options.duration, options.prix, options.depart, options.arrivee

// function showDistanceToParis(resultat) {
  
  
//   const separation = createRouteArray(resultat[0])[0];
//   const last = separation.length - 1;

//   console.log(separation[0])
//   console.log(separation[last])

//   const latDepart = separation[0].latFrom
//   const lngDepart = separation[0].lngFrom
//   const latRetour = separation[last].latTo
//   const lngRetour = separation[last].lngTo

//   console.log(distanceFlight(latDepart, lngDepart, latRetour, lngRetour, 'K') + 'kilomètres')

// };





