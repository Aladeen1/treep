import { proxy } from '../views/base.js';

import 'js-autocomplete/auto-complete.css';
import autoComplete from 'js-autocomplete';
import './suggestion.css';

var xhr;
const departInput = document.getElementById('departLoc__search');
const arriveeInput = document.getElementById('returnLoc__search');     

const renderItem = function (item, search) {
	const markup =`
		<div class="autocomplete-suggestion line-suggestion">
			<img class="tour-de-control" src="https://res.cloudinary.com/tark-industries/image/upload/v1561724813/control_tower.png">
			<p class="suggestion-text">${item.code} <strong>${item.city.name}</strong>, ${item.city.country.name} - ${item.name}</p>
		</div>`
	return markup
}; 

function createAutocomplete(input) {

	new autoComplete({
	    selector: input,
	    minChars: 2,
	    source: function(term, response){	    	
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
	    menuClass: 'test-suggestion',
	    renderItem: renderItem,
	    onSelect: function(e, term, item) {    	
			const code = item.children[1].innerText.split(" ")[0];
    		const city = item.children[1].children[0].innerText;
    		input.value = `${city}, ${code}`
		}
	});
}
    
createAutocomplete(departInput);
createAutocomplete(arriveeInput);


















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