import { getInput } from '../views/searchView';

export const targetRedirection = () => {
	console.log('target redirection')
	const targets = document.querySelectorAll('.redirection__target');
	console.log(targets)
    const flights = JSON.parse(localStorage.getItem('Recherche'));
	targets.forEach( button => {
		button.addEventListener( 'click', event => {
            console.log('ça part');
			if (localStorage.getItem('userFlight')) {
   			  localStorage.removeItem('userFlight');
 			}
			event.preventDefault()

			const test = event.target;
			const buttonId = test.parentElement.parentElement.className;
			const flight = flights.find( element => {
				return element.id === buttonId
			});
			console.log(flight);
		    localStorage.setItem('userFlight', JSON.stringify(flight));
		    fillHiddenFields(flight);
            insertCompensationText(flight);
            
            $('#compensation').modal('show');
            // $('#compensationWanted')[0].addEventListener('click', () => {
            
            // })
		})
	})
}


// dans la fonction global ça part au click.
function fillHiddenFields(flight) {
	console.log('feeling it');
	sendValueInField('price', flight, 'price')
	sendValueInField('ville_aller', flight, 'cityFrom')
	sendValueInField('ville_retour', flight, 'cityTo' )
	sendValueInField('date_aller', flight, 'date_aller')
	sendValueInField('date_retour', flight, 'date_retour')
	sendValueInField('distance', flight, 'treepDistanceEffective')
	sendValueInField('co2', flight, 'treepCarbonEmission')
	sendValueInField('status', flight, 'status')
	sendValueInField('total', flight, 'treepDetteEcologique')
	sendValueInField('skytreep_participation', flight, 'treepCompensation')
}


function sendValueInField(id, flight, type) {
    let element;
	const target = document.getElementById(id);  
    
    if (type == "date_aller") {
      element = getInput('searchDepartDateFrom');
    } else if (type == "date_retour" && flight.routeRetour.length > 0) {
      element = getInput('searchReturnDateFrom');
    } else if (type == 'status') {
    	element = 'pending';
    } else {
    	element = flight[type];
    }

    
    target.setAttribute('value', element);
}

 
function insertCompensationText(flight) {
	const markup = `	      
		<p> Voulez vous compenser une partie de votre empreinte carbone qui sera émise lors de votre séjour à ${flight.cityTo}?</p>
		<p> Cette dernière s'élève à ${flight.price * 0.02}€ pour 120kg de CO2 rejeté </p>	      
	`
	document.getElementById('insert-compensation-text').insertAdjacentHTML('afterbegin', markup)
}





