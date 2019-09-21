import { toHumanPrice, renderLoader, clearLoader } from '../views/base';
import { goBackToResearch } from './compensation/redirection/backToResearch';
import { redirectionMarkup } from './compensation/redirection/htmlMarkup';
import { cadreCompensationMarkup } from './compensation/cadre/htmlMarkup';
import { injectionDashboardRedirection } from './compensation/redirection/dashboardRedirection';
import { payDetteEco } from './compensation/redirection/payDetteEco';
import { initializeUislider } from './compensation';
import { updateMeasure } from './compensation/cadre/slider/updateDataDisplayed';


window.addEventListener('load', () => {
  const pageTarget = document.getElementById('title-target-redirection');
	if (pageTarget != null) {
    switchTitle();
    const flight = JSON.parse(localStorage.getItem('userFlight'));
    const render = cadreCompensationMarkup(flight, redirectionMarkup(flight));
    clearLoader(pageTarget);
    pageTarget.insertAdjacentHTML('afterbegin', render);
    injectionDashboardRedirection(flight);
    payDetteEco();


    const sliderAnchor = document.getElementById('slider__compensation');
    initializeUislider(sliderAnchor, flight);
    sliderDesign(flight);
    switchIcons(flight);
    goBackToResearch();
	}
})


export const sliderDesign = (flight) => {
  initializeSliderData(flight)
	document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="position__square"></div>`);
  document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="end__square"></div>`);
}

function initializeSliderData(flight) {
  const sliderLimitTargetText = document.querySelector('.position__upper');
  sliderLimitTargetText.innerHTML = `<p>${flight.treepCarbonEmission} kg</p>`;
}

// Mettre cette fonction en bibliothèque

export const switchIcons = (flight) => {
	const icons = Array.from(document.querySelector('.compensation__icons').children);
    icons.forEach( icon => {
      	icon.addEventListener('click', event => {
      		if (event.target.id != 'active__measure') {
      			document.getElementById('active__measure').id = '';
      			event.target.id = 'active__measure';
      		  updateMeasure(event.target, flight);
      		};
        })
    })
}

function switchTitle() {
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










