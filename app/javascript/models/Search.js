import axios from 'axios';
import { proxy } from '../views/base.js';

export default class Search {
    constructor(departLoc, returnLoc, departureDateFrom, departureDateTo, flightType, passengers, returnDateFrom, returnDateTo ) {
      this.departLoc = departLoc;
      this.returnLoc = returnLoc;
      this.departureDateFrom = departureDateFrom;
      this.departureDateTo = departureDateTo;
      this.returnDateFrom = returnDateFrom;
      this.returnDateTo = returnDateTo;
      this.flightType = flightType;
      this.passengers = passengers;
    }

    getLocation(query, locationType) {
      let res = axios(`${proxy}https://api.skypicker.com/locations?term=${query}&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name&partner=picky`);
      res.then((location) => {
        this[locationType] = location.data.locations;
      })
      .catch( error => alert(error))
      return res
    }

    getFlights(maxDuration, minPrice, maxPrice, dtimeFrom, dtimeTo, atimeFrom, atimeTo) {
      let res;
      if (this.flightType === 'oneway') {
        res = axios(`${proxy}https://api.skypicker.com/flights?flyFrom=${this.departLoc}&to=${this.returnLoc}&dateFrom=${this.departureDateFrom}&dateTo=${this.departureDateTo}&flight_type=${this.flightType}&adults=${this.passengers}&max_fly_duration=${maxDuration}&price_to=${maxPrice}&dtime_from=${dtimeFrom}&atime_from=${atimeFrom}&limit=20&partner=picky`);
      } else if (this.flightType === 'round' && (document.getElementById('loaded') != null) ) {
        res = axios(`${proxy}https://api.skypicker.com/flights?flyFrom=${this.departLoc}&to=${this.returnLoc}&dateFrom=${this.departureDateFrom}&dateTo=${this.departureDateTo}&return_from=${this.returnDateFrom}&return_to=${this.returnDateTo}&flight_type=${this.flightType}&adults=${this.passengers}&max_fly_duration=${maxDuration}&price_from=${minPrice}&price_to=${maxPrice}&dtime_from=${dtimeFrom}&dtime_to=${dtimeTo}&atime_from=${atimeFrom}&atime_to=${atimeTo}&limit=20&partner=picky`);
      } else {
        res = axios(`${proxy}https://api.skypicker.com/flights?flyFrom=${this.departLoc}&to=${this.returnLoc}&dateFrom=${this.departureDateFrom}&dateTo=${this.departureDateTo}&return_from=${this.returnDateFrom}&return_to=${this.returnDateTo}&flight_type=${this.flightType}&adults=${this.passengers}`);
      }
      res.then((flight) => {
        this.result = flight.data.data;
        console.log(this.result);
      })
      .catch( error => alert(error))
      return res
    }

    getAirlinesCode() {
      let airline = axios(`${proxy}https://api.skypicker.com/airlines?`);
      airline.then((result) => {
        this.airlines = result.data
      })
      .catch( error => alert(error + 'les airlines ont bugué'))
      return airline
    }
}

//const res = await axios(`${proxy}https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=02/02/2019&dateTo=05/02/2019&partner=picky`);

// max_fly_duration
// price_from
// price_to
// dtime_from
// dtime_to
// atime_from
// atime_to
// ret_dtime_from
// ret_dtime_to
// ret_atime_from
// ret_atime_to
// stopover_from
// stopover_to
// max_stopovers

