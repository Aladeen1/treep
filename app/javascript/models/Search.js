import axios from 'axios';
import { proxy } from '../views/base.js';

export default class Search {
    constructor(departLoc, returnLoc, departureDate, returningDate) {
      this.departLoc = departLoc;
      this.returnLoc = returnLoc;
      this.departureDate = departureDate;
      this.returningDate = returningDate;
    }

    async getLocation(query, locationType) {
        try {

            let res = await axios(`${proxy}https://api.skypicker.com/locations?term=${query}&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name&partner=picky`);
            this[locationType] = res.data.locations;

        } catch (error) {
            alert(error);
        }
    }

    async getFlights() {
        try {
            const res = await axios(`${proxy}https://api.skypicker.com/flights?flyFrom=${this.departLoc}&to=${this.returnLoc}&dateFrom=${this.departureDate}&dateTo=${this.returningDate}&partner=picky`);
            this.result = res.data.data;
            console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }

    async getAirlinesCode() {
      try {
        let airlines = await axios(`${proxy}https://api.skypicker.com/airlines?`);
        this.airlines = airlines.data
      } catch (error) {
        alert(error + 'les airlines ont bugué');
      }
    }
}

//const res = await axios(`${proxy}https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=02/02/2019&dateTo=05/02/2019&partner=picky`);

