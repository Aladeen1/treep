import { proxy } from '../views/base.js';

import 'js-autocomplete/auto-complete.css';
import autoComplete from 'js-autocomplete';

var xhr;


const renderItem = function (item, search) {

    return `<div class="autocomplete-suggestion">${item.name}, ${item.city.name}, ${item.code}</div>`
};

new autoComplete({
    selector: 'input[id="departLoc__search"]',
    minChars: 2,
    source: function(term, response){
    	console.log(term)
        try { xhr.abort(); } catch(e){}
        xhr = $.getJSON(`${proxy}https://api.skypicker.com/locations?term=${term}&locale=fr-FR&location_types=airport&limit=10&active_only=true&sort=name&partner=picky`,
         function(data){ return data;
        }).then((data) => {
        	const matches = [];
        	data.locations.forEach( (location) => {
        		matches.push(location)
        	})
        	response(matches); 
        });
    },
    renderItem: renderItem,
    onSelect: function(e, term, item){
    	console.log(e)
        console.log(term)
        console.log(item)
    }
});








// import Bloodhound from "bloodhound-js";
// import typeahead from "typeahead.js";



// console.log('suggestion');

// const airport_suggestions = new Bloodhound({
//     datumTokenizer: Bloodhound.tokenizers.obj.whitespace(['code', 'name', 'city', 'country']),
//     queryTokenizer: Bloodhound.tokenizers.whitespace,
//     remote: {
//         url: `${proxy}https://api.skypicker.com/locations?term=%QUERY&locale=fr-FR&location_types=airport&limit=10&active_only=true&sort=name&partner=picky`,
//         wildcard: '%QUERY', // %QUERY will be replace by users input in the url option.
//         transform: function (data) {          
//             console.log(data)
//         }                    
//     },                                        
// });
 
// console.log($('#departLoc__search'))

// // init Typeahead
// $('#departLoc__search').typeahead(
// 	{
// 	    minLength: 2,
// 	    highlight: true
// 	},
// 	{
// 	    name: 'Airports',
// 	    source: airport_suggestions,   // suggestion engine is passed as the source
// 	    limit: 5
// 	}
// );

// departLoc__search
// returnLoc__search