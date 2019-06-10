// import { createUiSlider } from './sliderRange';
import noUiSlider from "nouislider";
import 'nouislider/distribute/nouislider.css';
import './compensation-slider.css';
import { toHumanPrice, renderLoader, clearLoader } from '../views/base';
import { customStripeButton } from './stripe';
import { renderAll } from '../controllers/flightController';
import { populateSearchFields } from '../views/searchView';

window.addEventListener('load', () => {
	if ($('#title-target')[0] != null) {
    const flight = JSON.parse(localStorage.getItem('userFlight'));
    const render = createCompensationMarkup(flight);
    clearLoader($('#title-target')[0]);
    document.getElementById('title-target').insertAdjacentHTML('afterbegin', render);
    // customStripeButton();
    const sliderAnchor = document.getElementById('slider__compensation');

    initializeUislider(sliderAnchor, flight);
    sliderDesign(flight);
    switchIcons(flight);
    goBackToResearch();
	}
})

function goBackToResearch() {
  const target = document.getElementById('back-to-research-target');
  target.addEventListener('click', () => {
    clearLoader($('#title-target')[0]);
    $('#title-target')[0].style.minHeight = '0px';
    renderAll($('#title-target')[0]);
    document.getElementById('back-to-research-bar').style.display = 'block';
    populateSearchFields();
  })
}

function sliderDesign(flight) {
	document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="position__square"></div><p class="position__lower">0.00€</p>`);
  document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<p class="position__upper">${toHumanPrice(flight.treepDetteEcologique)}€</p>`);
  document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="end__square"></div>`);
  document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="participation__treep"><p>La part de Skytree'p</p></div>`);
  document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="participation__user"><p>Votre mission écologique si vous l'acceptez</p></div>`);
}

function triggerPayment(slider) {
const payment = document.getElementById('amount');

  slider.on('end', () => {
    console.log('sending')
    const userCompensation = Math.round(Number(document.getElementById('user-compensation').value));
    console.log(userCompensation);
    payment.setAttribute('value', userCompensation);
  })
}

// Mettre cette fonction en bibliothèque

function switchIcons(flight) {
	const icons = Array.from(document.querySelector('.compensation__icons').children);
    icons.forEach( icon => {
      	icon.addEventListener('click', event => {
      		if (event.target.id != 'active__measure') {
      			document.getElementById('active__measure').id = '';
      			event.target.id = 'active__measure';
      			updateMeasure(event.target.innerHTML, flight);
      		};
        })
    })
}  

function updateMeasure(measure, flight) {
  
	const detteEcologique = flight.treepDetteEcologique;
  let totalCompensation = Number(document.getElementById('total-compensation').value);
  let valeurDepart, valeurArrivee, handle;

	if (measure === 'T') {
    valeurDepart = '0T';
    valeurArrivee = `${detteEcologique / 20}T`;
    handle = ` ${totalCompensation / 20}T`;
	} else if (measure === '%') {
    valeurDepart = '0%';
    valeurArrivee = '100%';
    handle = `${Math.round((totalCompensation / detteEcologique) * 100)}%`;
	} else {
	  valeurDepart = '0.00€';
    valeurArrivee = `${toHumanPrice(detteEcologique)}€`;
    handle = `${toHumanPrice(totalCompensation)}€`;
	}

  document.querySelector('.position__lower').innerHTML = valeurDepart;
  document.querySelector('.position__upper').innerHTML = valeurArrivee;
  document.getElementsByClassName('noUi-handle-upper')[0].dataset.value = handle;
  
}


function initializeUislider(sliderAnchor, flight) {
    const sliderCreated = createCompensationSlider(sliderAnchor, flight);
    connectUiSlider(sliderCreated, sliderAnchor, flight);
    updateHandles(sliderCreated, flight);
    triggerPayment(sliderCreated);
}

const updateSliderValue = (slider, flight, handle = 0) => {

  const detteEcologique = flight.treepDetteEcologique;
  const children = slider.target.getElementsByClassName('noUi-handle');
  const values = slider.get();
  let i = 0;
  let val;
  while (i < children.length) {
    if (children.length === 1) {
       val = values;
    } else {
       val = values[i];
    }
    
    if (document.getElementById('active__measure').innerHTML === 'T'){
      children[i].dataset.value = `${Math.round(val / 20)}T`;
    } else if (document.getElementById('active__measure').innerHTML === '%') {
      children[i].dataset.value = `${Math.round(val / detteEcologique * 100)}%`;
    } else {
      children[i].dataset.value = `${toHumanPrice(val)}€`;
    }
    i++
  }
}

function updateHandles(slider, flight) {
  slider.on('update', () => {
    updateSliderValue(slider, flight)
  })
}

// Ces 3 fonctions ont pour objet de passer la valeur du slider dans l'input caché.

function setUserShare(slider, sliderInput) {
  const share = Math.round(slider.get()[1]) - Math.round(slider.get()[0]);
  sliderInput.children[1].value = share;
}

function setGlobalShare(slider, sliderInput, flight) {
  let formattedValue = slider.get()[1];
  sliderInput.children[0].value = Math.round(formattedValue);
  updateFields(formattedValue, flight);
}


function connectUiSlider(slider, sliderInput, flight) {
	slider.on("update", () => {
    setGlobalShare(slider, sliderInput, flight);
    setUserShare(slider, sliderInput);
    });
};

////////////////////////////////////////////////////////////////////////////////////

// create function measure change % -> € -> T

//create function to get the amount the user wants to pay when he clicks.




//create function that connects the value of the slider to all the fields in the view. 

function updateFields(formattedValue, flight) {
	const detteEcologique = flight.treepDetteEcologique;
	document.getElementById('percentage').innerHTML = Math.round((formattedValue / detteEcologique) * 100);
  document.getElementById('euros').innerHTML = toHumanPrice(formattedValue);
  document.getElementById('number__trees').innerHTML = Math.round(formattedValue / 20);
}

function createCompensationSlider(sliderAnchor, flight) {

	const treepCompensation = flight.treepCompensation;
  const detteEcologique = flight.treepDetteEcologique;
    
	noUiSlider.create(sliderAnchor, {
	    start: [treepCompensation, treepCompensation],
	    connect: [true, true, false],
      padding: [treepCompensation, 0],
	    range: {
	        'min': 0,
	        'max': detteEcologique
	    },
	    step: 20
    });

	const handles = sliderAnchor.getElementsByClassName('noUi-handle');
	const connects = sliderAnchor.getElementsByClassName('noUi-connect');
  
	handles[0].style.display = 'none';
	
	connects[0].style.background = '#36ACB8';
  connects[1].style.background = '#00C896';

	return sliderAnchor.noUiSlider
}


function createCompensationMarkup(flight) {
    
  const pourcentageSkytreep = Math.round((flight.treepCompensation / flight.treepDetteEcologique) * 100);

	const markup = `
	  <div class="background__container">
      <div class="compensation-background-layer">
        <div class="modal-like-frame">
          <h4>bienvenue sur la page de compensation, ici vous pouvez:</h4>
          <div class="compensation-choix-user">
            <button style="background-color: #0ADEA9;">Régler votre dette</button>
            <button style="background-color: #0CC094;">Verser la part de Skytree'p uniquement</button>
            <button id="back-to-research-target" style="background-color: #1CA8B9;">Continuer vos recherches</button>
          </div>

        </div>
  		  <h3>Bravo, en passant par Skytree'p, vous avez déja remboursé ${pourcentageSkytreep}% de votre dette écologique !</h2>
  			<div class="compensation__container">

  				<div class="compensation__stats__container">
  				  	<div class="compensation__first__part">
  					  	<div class="compensation__montant">
  						  	<p id="compensation__titre">Dette écologique:</p>
  						  	<p>${toHumanPrice(flight.treepDetteEcologique)} euros</p>
  					    </div>
  					  	<ul class="compensation__icons">
  					  	  <li class="custom__icons" id="active__measure">€</li>
  					  	  <li class="custom__icons">%</li>
  					  	  <li class="custom__icons">T</li>
  					    </ul>
  				  	</div>
  	                 
  				  	<div class="compensation__second__part">
  				  	  <div id="slider__compensation">
  				  	    <input  id="total-compensation" type="hidden" value="">
                  <input  id="user-compensation" type="hidden" value="">
  				  	  </div>
  				  	</div>

  				  	<div class="compensation__third__part">
  				  		<ul class="compensation__stats__list">
  							<li>Pourcentage:  <span id="percentage"></span> %</li>
  							<li class='border-middle'>Euros:  <span id="euros"></span> EUR</li>
  							<li>Nombres d'arbres:  <span id="number__trees"></span></li>
  				  		</ul>
  				  	</div>
  				</div>
  			</div>
      </div>
		</div>
	`
	return markup
}


// function insertSearchBar() {
//   const markupBar = `
//       <div class="search__bar__container">
//         <div class="search__bar__element__container">
//             <div class="search__bar__options">
//                 <div class="aller-retour">
//                     <select id="flight_type">
//                         <option value="oneway">Aller simple</option>
//                       <option value="round">Aller retour</option>
//                     </select>
//                 </div>


//                 <p class="passager__description">Passagers</p>
//                 <div class="passager">
//                     <div class="value-button" id="decrease"  value="Decrease Value"><p>-</p></div>
//                         <input type="number" id="passengers" min="1" max="9" value="1" />
//                     <div class="value-button" id="increase"  value="Increase Value"><p>+</p></div>
//                 </div>
//             </div>
//             <div class="search__bar__frame">
//                 <form class="search">
//                     <div class="search__bar__box">
//                         <input type="text" class="search__field left-element" id="departLoc__search" autocomplete="off" placeholder="Partir de" list="airports__depart">
//                         <input type="text" class="search__field right-element" id="returnLoc__search" autocomplete="off" placeholder="Aller à" list="airports__return">
//                     </div>
//                     <div class="search__bar__box">
//                         <input type="text" class="search__field left-element" id="departDate__search" placeholder="Aller le">
//                         <input type="text" class="search__field right-element" id="returnDate__search" placeholder="Retour le">
//                     </div>
//                     <button class="checkout__button blue" id="">
//                         Rechercher
//                     </button>

//                 </form>
//             </div>
//         </div>
//     </div>

//     <datalist id="airports__depart"></datalist>
//     <datalist id="airports__return"></datalist>
//   `
//   document.querySelector('.flights__container').insertAdjacentHTML('beforeBegin', markupBar)
// }
 




// <button class="checkout__button" id="trigger-payment" style="width: 80%">PAYER MA DETTE ECOLOGIQUE</button>

