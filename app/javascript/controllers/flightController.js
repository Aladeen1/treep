import * as searchView from '../views/flightView';
import { getInput, clearResults } from '../views/searchView';
import { elements, search } from '../views/base';
import Search from '../models/Search';
import { optionalP } from '../views/additionalOptView';

const state = {};

export const controlSearch = () => {

  clearResults();

    // 1) Get airport codes from locations queried in the view
  const departLoc = searchView.getAirportCode(getInput('searchDepartInput'));
  const returnLoc = searchView.getAirportCode(getInput('searchReturnInput'));
  const departureDate = getInput('searchDepartDate');
  const returningDate = getInput('searchReturnDate');
  const flightType = getInput('searchFlightType');
  const passengers = getInput('searchPassengers');
  
  if (search != null) {
    var options = optionalP();
    console.log(options)
  } else {
    var options = {
      duration: '40',
      prix: '1500',
      depart: '06:00',
      arrivee: '06:00'
    }
  }

  if (departLoc && returnLoc && departureDate && returningDate && flightType && passengers) {
    console.log(`The destination is ${departLoc}, the return location is ${returnLoc}, the depart day is ${departureDate}, the return date is ${returningDate}, for ${passengers} passengers and it's a ${flightType} ticket`);
    // 2) New search object and add to state
    state.search = new Search(departLoc, returnLoc, departureDate, returningDate, flightType, passengers);

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
