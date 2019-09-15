import { sliderDesign, switchIcons } from './redirection';
import { fillHiddenFields } from './modalApparition';
import { toHumanPrice, renderLoader, clearLoader } from '../views/base';
import { customStripeButton } from './stripe';
import { cadreCompensationMarkup } from './compensation/cadre/htmlMarkup';
import { connectUiSlider } from './compensation/cadre/slider/updateDataInputs';
import { updateHandles } from './compensation/cadre/slider/updateDataDisplayed';
import { createCompensationSlider } from './compensation/cadre/slider/createCompensationSlider';

window.addEventListener('load', () => {
	if ($('#title-target-compensation')[0] != null) {
	    const flight = JSON.parse(localStorage.getItem('userFlight'));
	    const compensation = compensationUpperMarkup();
	    const render = cadreCompensationMarkup(flight, compensation);
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


function triggerPayment(slider) {

  const payment = document.getElementById('user_participation');

  slider.on('end', () => {
    console.log('sending')
    const userCompensation = Math.round(Number(document.getElementById('user-compensation').value));
    console.log(userCompensation);
    payment.setAttribute('value', userCompensation);
  })
}

export const initializeUislider = (sliderAnchor, flight, payment) => {
    const sliderCreated = createCompensationSlider(sliderAnchor, flight);
    connectUiSlider(sliderCreated, sliderAnchor);
    updateHandles(sliderCreated, flight);
    if (payment == 'yes') {
      triggerPayment(sliderCreated);
    }
}