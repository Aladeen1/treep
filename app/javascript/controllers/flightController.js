import * as searchView from '../views/flightView';
import { getInput, clearResults } from '../views/searchView';
import { elements } from '../views/base';
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
  
  // const search = document.getElementById('searchPage')
  // if (search != null) {
  //   const options = optionalP();
  //   console.log(options)
  // } else {
    const options = {
      duration: '40',
      prix: '1500',
      depart: '06:00',
      arrivee: '06:00'
    }
  //   return options
  // }

  if (departLoc && returnLoc && departureDate && returningDate) {
    console.log(`The destination is ${departLoc}, the return location is ${returnLoc}, the depart day is ${departureDate}, the return date is ${returningDate}`);
    // 2) New search object and add to state
    state.search = new Search(departLoc, returnLoc, departureDate, returningDate);

    // 3) Prepare UI for results
    // searchView.clearInput();
    
    // 4) Search for flights
    // 5) Render results on UI
  

    Promise.all([state.search.getFlights(options.duration, options.prix, options.depart, options.arrivee), state.search.getAirlinesCode()])
    .then(() => {
      searchView.renderResults(state.search.result, state.search.airlines);
    })
    .catch(err => console.log(err))
  }
}
