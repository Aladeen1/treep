import 'components/calendar';
import "bootstrap";
import { elements } from '../views/base';
import * as flights from '../controllers/flightController';
import * as airports from '../controllers/locationController';
import Search from '../models/Search';
import { getInput } from '../views/searchView';


console.log('Hello from webpacker');

airports.displayAirports();
elements.searchForm.addEventListener('submit', e => {
    console.log(e);
    e.preventDefault();
    flights.controlSearch();
});

// elements.searchDuration.addEventListener('input', () => {
//   const point = document.querySelector('.hello');
//   const text = getInput('searchDuration');
//   point.innerHTML = '';
//   point.insertAdjacentHTML('afterbegin', text);
// })





























// console.log("on va constriuire")

// const proxy = 'https://cors-anywhere.herokuapp.com/';

// const test = () => {

//   // const hey = new Search();
//   // hey.sayHello();
//   axios(`${proxy}https://api.skypicker.com/flights?flight_type=round&fly_from=CDG&fly_to=LAX&date_from=19/01/2019&date_to=19/01/2019&return_from=25/01/2019&return_to=25/01/2019&direct_flights=1&partner=picky`)
//   .then((resultat) => {
//     resultat.data.data.slice(0,20).forEach( result => {
//     //   const date = new Date(result.dTime * 1000)
//     //   const jour = date.getDate()
//     //   let mois = date.getMonth()
//     //   if (mois === 0) {
//     //     mois = 'janvier'
//     //   } else if (mois === 1) {
//     //     mois = 'février'
//     //   }
//       console.log(result)
//     })
//   })
//   .catch( error => alert(error))
// }

// // new Date(result.dTime * 1000);

//  window.setTimeout(test, 1000)

// const res = axios(`${proxy}https://api.skypicker.com/flights?flyFrom=${this.departLoc}&to=${this.returnLoc}&dateFrom=${this.departureDate}&dateTo=${this.returningDate}&partner=picky`);
