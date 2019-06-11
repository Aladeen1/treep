import { triggerPayment, createCompensationMarkup, initializeUislider, sliderDesign, switchIcons } from './redirection';
import { fillHiddenFields } from './modalApparition';
import { toHumanPrice, renderLoader, clearLoader } from '../views/base';
import { customStripeButton } from './stripe';


window.addEventListener('load', () => {
	if ($('#title-target-compensation')[0] != null) {
	    const flight = JSON.parse(localStorage.getItem('userFlight'));
	    const compensation = compensationUpperMarkup();
	    const render = createCompensationMarkup(flight, compensation);
	    clearLoader($('#title-target-compensation')[0]);
	    document.getElementById('title-target-compensation').insertAdjacentHTML('afterbegin', render);
	    customStripeButton();
	    fillHiddenFields(flight);
	    const sliderAnchor = document.getElementById('slider__compensation');
	    initializeUislider(sliderAnchor, flight, 'yes');
	    sliderDesign(flight);
	    switchIcons(flight);
	}
});

function compensationUpperMarkup() {
	const markup = `
		<div class="modal-like-frame-compensation">
			<h4>Utilisez la molette afin de régler votre dette écologique</h4>
		</div>
	`
	return markup
}

