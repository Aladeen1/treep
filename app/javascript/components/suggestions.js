import { proxy, home, compensation, search } from '../views/base.js';

import 'js-autocomplete/auto-complete.css';
import autoComplete from 'js-autocomplete';
import './suggestion.css';
 
var xhr;     

const renderItem = function (item, search) {
	console.log(item)
	let markup;
	if (item.type === "airport") {
		markup =`
		${handleOnlyResult(item)}
			<img class="tour-de-control" src="https://res.cloudinary.com/tark-industries/image/upload/v1561724813/control_tower.png">
			<p class="suggestion-text">${item.code} <strong>${item.city.name}</strong>, ${item.city.country.name} - ${item.name}</p>
		</div>`
	} else if (item.type === "city") {
		markup =`
		<div class="autocomplete-suggestion line-suggestion" style="padding-left: 4px;">
			<img class="icon-ville" src="https://res.cloudinary.com/tark-industries/image/upload/v1568131016/city-icon-suggestion.png">
			<p class="suggestion-text">${item.code} <strong>${item.name}</strong>, ${item.country.name} - Tous les aéroports</p>
		</div>`
	}
	return markup  
};  

function handleOnlyResult(item) {
	let markup;
	if (item.only === "yes") {
		markup = `<div class="autocomplete-suggestion line-suggestion" style="padding-left: 4px;">`
	} else {
		markup = `<div class="autocomplete-suggestion line-suggestion">`
	}
	return markup
}

function createAutocomplete(input) {

	new autoComplete({
	    selector: input,
	    minChars: 2,
	    source: function(term, response){
	    	let city;
	        try { xhr.abort(); } catch(e){}
	        xhr = $.getJSON(`${proxy}https://api.skypicker.com/locations?term=${term}&locale=fr-FR&location_types=city&limit=3&active_only=true&sort=rank`,
	        function(data){
	        	console.log(data.locations[0])
	         	embeddedCall(data.locations[0], response)
	         	// return data;
	        })
	    },
	    menuClass: 'test-suggestion',
	    renderItem: renderItem,
	    onSelect: function(event, term, item) {    	
	    	// console.log(term)
	    	// console.log(item)
			const code = item.children[1].innerText.split(" ")[0];
    		const city = item.children[1].children[0].innerText;
    		input.value = `${city}, ${code}`
		}
	});
}

if (home != null || search != null || compensation != null) {
	console.log('create autocomplete')
	const departInput = document.getElementById('departLoc__search');
	const arriveeInput = document.getElementById('returnLoc__search');  
	createAutocomplete(departInput);
	createAutocomplete(arriveeInput);
}

function embeddedCall(term, response) {
	const array = [];
	$.getJSON(`${proxy}https://api.skypicker.com/locations?type=subentity&term=${term.id}&locale=fr-FR&location_types=airport&limit=10&active_only=true&sort=rank`,
        function(data){
         	return data;
        }).then((data) => {
        	data.locations.forEach( (location, index, all) => {
        		if (all.length == 1) {
        			location.only = "yes"
        		}
        		// console.log(location)
        		array.push(location)
        	})
        	if (array.length > 1) {
        		array.unshift(term)
        	}
        	// let arrayPlus = [array]
        	console.log(array)
        	response(array)
        });
}














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