import { getInput } from '../views/searchView';
import { toHumanPrice } from '../views/base'; 



export const targetRedirection = () => {
	
	const targets = document.querySelectorAll('.redirection__target');
    const flights = JSON.parse(localStorage.getItem('Recherche'));
    
	targets.forEach( button => {
		
		button.addEventListener( 'click', event => {
            console.log('ça part');
			if (localStorage.getItem('userFlight')) {
   			  localStorage.removeItem('userFlight');
 			}

			const test = event.target;
			const buttonId = test.parentElement.className;
			const flight = flights.find( element => {
				return element.id === buttonId
			});
			// switchTitle();
			console.log(flight);
			const deeplink = flight.deep_link;
		    window.open(deeplink, 'noopener');
		    localStorage.setItem('userFlight', JSON.stringify(flight));
		    // fillHiddenFields(flight);
            
            window.location.href = "https://www.skytreep.fr/compensation";
            // "http://www.skytreep.fr/compensation"
            // "http://localhost:3000/compensation"
		})
	})
}

export const switchTitle = () => {
	console.log('switch title')
	const title = document.querySelector('title');
	
	setInterval( () => {
		if (title.innerHTML == "Skytree'p") {
			title.innerHTML = `(1) Compensation available`;
		} else {
			title.innerHTML = "Skytree'p";
		}
	}, 1500)
}


// dans la fonction global ça part au click.
export const fillHiddenFields = (flight) => {
	console.log('filling it');
	sendValueInField('price', flight, 'price')
	sendValueInField('ville_aller', flight, 'cityFrom')
	sendValueInField('ville_retour', flight, 'cityTo' )
	sendValueInField('date_aller', flight, 'date_aller')
	sendValueInField('date_retour', flight, 'date_retour')
	sendValueInField('distance', flight, 'treepDistanceEffective')
	sendValueInField('co2', flight, 'treepCarbonEmission')
	sendValueInField('status', flight, 'status')
	sendValueInField('dette_eco', flight, 'treepDetteEcologique')
	sendValueInField('skytreep_participation', flight, 'treepCompensation')
}

const inputs = JSON.parse(localStorage.getItem('UserInputs'))

function sendValueInField(id, flight, type) {
    let element;
	const target = document.getElementById(id);
	
    
    if (type == "date_aller") {
      element = inputs.date_aller;
      console.log(element)
    } else if (type == "date_retour" && flight.routeRetour.length > 0) {
      element = inputs.date_retour;
      console.log(element)
    } else if (type == 'status') {
    	element = 'pending';
    } else {
    	element = flight[type];
    }

    target.setAttribute('value', element);
}

 
// function insertCompensationText(flight) {
// 	const markup = `	      
// 		<p> Voulez vous compenser une partie de votre empreinte carbone qui sera émise lors de votre séjour à ${flight.cityTo}?</p>
// 		<p> Cette dernière s'élève à ${toHumanPrice(flight.treepDetteEcologique)}€ pour ${flight.treepCarbonEmission}kg de CO2 rejeté </p>	      
// 	`
// 	document.getElementById('insert-compensation-text').insertAdjacentHTML('afterbegin', markup)
// }





