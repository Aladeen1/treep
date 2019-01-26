import * as searchView from '../views/flightView';
import { getInput, clearResults } from '../views/searchView';
import { elements, search } from '../views/base';
import Search from '../models/Search';
import { optionalP } from '../views/additionalOptView';

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


  
  if (search != null) {
    var options = optionalP();
    console.log(options)
  } 

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
    // 5) Render results on UI
  
    Promise.all([state.search.getFlights(options.duration, options.prix, options.depart, options.arrivee), state.search.getAirlinesCode()])
    .then(() => {
      console.log(state.search.result)
      searchView.renderResults(state.search.result, state.search.airlines);
    })
    .catch(err => console.log(err))
  }
}








