
export const targetRedirection = () => {
	const targets = document.querySelectorAll('.redirection__target');
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
			
		    localStorage.setItem('userFlight', JSON.stringify(flight));

            const modalContent = intrusion(flight);
            console.log($('#searchPage')[0]);
            $('#searchPage')[0].insertAdjacentHTML('afterend', modalContent);
            $('#compensation').modal('show');
            $('#compensationWanted')[0].addEventListener('click', () => {
            	window.location.href = "http://localhost:3000/compensation";
            })
		})
	})
}

function intrusion(flight) {
	const markup = `
	  <!-- Modal -->
		<div class="modal fade" id="compensation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel">Merci de nous faire confiance</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <p> Voulez vous compenser une partie de votre empreinte carbone qui sera émise lors de votre séjour à ${flight.cityTo}?</p>
		        <p> Cette dernière s'élève à ${flight.price * 0.02}€ pour 120kg de CO2 rejeté </p>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Non</button>
		        <button type="button" class="btn btn-primary" id="compensationWanted">Je le souhaite</button>
		      </div>
		    </div>
		  </div>
		</div>
	`
	return markup
}





