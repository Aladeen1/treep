import { fillHiddenFields, switchTitle } from './modalApparition';
import noUiSlider from "nouislider";
import 'nouislider/distribute/nouislider.css';
import './compensation-slider.css';
import { toHumanPrice, renderLoader, clearLoader } from '../views/base';
import { renderAll } from '../controllers/flightController';
import { populateSearchFields } from '../views/searchView';

window.addEventListener('load', () => {
	if ($('#title-target-redirection')[0] != null) {
    switchTitle();
    const flight = JSON.parse(localStorage.getItem('userFlight'));
    const redirection = redirectionMarkup(flight);
    const render = createCompensationMarkup(flight, redirection);
    uniquementSkytreepShare(flight);
    clearLoader($('#title-target-redirection')[0]);
    document.getElementById('title-target-redirection').insertAdjacentHTML('afterbegin', render);
    versementSkytreep(flight);
    reglementDetteEco();

    const sliderAnchor = document.getElementById('slider__compensation');
    initializeUislider(sliderAnchor, flight);
    sliderDesign(flight);
    switchIcons(flight);
    goBackToResearch();
    $('[data-toggle="tooltip"]').tooltip()
	}
})

function reglementDetteEco() {
  const target = document.getElementById('regler-dette-eco');
  target.addEventListener('click', () => {
    window.location.href = "https://www.skytreep.fr/compensations/new";
  })
}
// www.skytreep.fr
// localhost:3000

function versementSkytreep(flight) {
  const form = document.querySelector('.hide__form');
  const container = document.querySelector('.compensation-choix-user');
  container.appendChild(form);
  form.style.display = 'block';
  fillHiddenFields(flight);
}

function goBackToResearch() {
  const target = document.getElementById('back-to-research-target');
  target.addEventListener('click', () => {
    clearLoader($('#title-target-redirection')[0]);
    $('#title-target-redirection')[0].style.minHeight = '0px';
    renderAll($('#title-target-redirection')[0]);
    document.getElementById('back-to-research-bar').style.display = 'block';
    populateSearchFields();
  })
}


export const sliderDesign = (flight) => {
	document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="position__square"></div><p class="position__lower">0Kg</p>`);
  document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="end__square"></div>`);
  document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="participation__treep"><p>La part de Skytree'p</p></div>`);
  document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="participation__user"><p>Votre mission écologique si vous l'acceptez</p></div>`);
}

export const triggerPayment = (slider) => {

  const payment = document.getElementById('user_participation');

  slider.on('end', () => {
    console.log('sending')
    const userCompensation = Math.round(Number(document.getElementById('user-compensation').value));
    console.log(userCompensation);
    payment.setAttribute('value', userCompensation);
  })
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


function renderTextSquareSliders(type, element, element1) {
  let markup;

  if (type == "tree") {
    markup = `
      <div class="compensation-slider-tree-positionning">
        <div><p>${element}</p>${element1}</div>
      </div>
    `
  } else if (type == "money" || type == "co2") {
    markup = `
      <div class="compensation-slider-text-positionning"><p>${element}${element1}</p></div>
    `
  }
  

  return markup
}

function updateMeasure(measure, flight) {
  const tree = `<img src="https://res.cloudinary.com/tark-industries/image/upload/v1553192647/Arbre.png" style="height:45px;">`
	const detteEcologique = flight.treepDetteEcologique;
  let compensationUser = Number(document.getElementById('total-compensation').value) - flight.treepCompensation;
  let valeurDepart, valeurArrivee, handle;

	if (measure.className.includes('t-target')) {
    valeurDepart = `<div class="compensation-slider-tree-positionning" style="top: -47px; left: -3px;">
                      <div style="position:relative;"><p>0</p>${tree}</div>
                    </div>`;
    handle = updateSliderProperly((compensationUser === 0), 'tree', (flight.treepCompensation / 20), (compensationUser / 20), tree);
	} else if (measure.className.includes('c-target')) {
    valeurDepart = '0Kg';
    handle = updateSliderProperly((compensationUser === 0), 'co2', flight.treepCompensation, compensationUser, 'Kg');
	} else {
	  valeurDepart = '0.00€';
    handle = updateSliderProperly((compensationUser === 0), 'money', toHumanPrice(flight.treepCompensation), (toHumanPrice(compensationUser)), '€');
	}

  document.querySelector('.position__lower').innerHTML = valeurDepart;
  document.getElementsByClassName('noUi-handle-upper')[0].innerHTML = handle;
}


export const initializeUislider = (sliderAnchor, flight, payment) => {
    const sliderCreated = createCompensationSlider(sliderAnchor, flight);
    connectUiSlider(sliderCreated, sliderAnchor, flight);
    updateHandles(sliderCreated, flight);
    if (payment == 'yes') {
      triggerPayment(sliderCreated);
    }
}

const updateHandleValue = (slider, flight, handle = 0) => {

  const tree = `<img src="https://res.cloudinary.com/tark-industries/image/upload/v1553192647/Arbre.png" style="height:45px;">`
  const detteEcologique = flight.treepDetteEcologique;
  const skytreepParticipation = flight.treepCompensation;
  const treeSkytreep = (skytreepParticipation / 20);
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
    
    
    if (document.getElementById('active__measure').className.includes('t-target')){
      updateSliderProperly((val  - skytreepParticipation === 0), 'tree', treeSkytreep, (Math.round(val / 20) - treeSkytreep), tree, children[i]);
    } else if (document.getElementById('active__measure').className.includes('c-target')) {
      updateSliderProperly((val  - skytreepParticipation === 0), 'co2', val.split('.')[0], (val - skytreepParticipation), 'Kg', children[i]);
    } else {
      updateSliderProperly((val  - skytreepParticipation === 0), 'money', toHumanPrice(skytreepParticipation), (toHumanPrice(val - skytreepParticipation)), '€', children[i]);
    }
    i++
  }
}

function updateSliderProperly(condition, type, value1, value2, visual, element){
  let value;
  if ( condition ){
    value = renderTextSquareSliders(type, value1, visual);
  } else {
    value = renderTextSquareSliders(type, value2, visual);
  }

  if (element) {
    element.innerHTML = value
  } else {
    return value
  }

}

function updateHandles(slider, flight) {
  slider.on('update', () => {
    updateHandleValue(slider, flight)
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
	document.getElementById('percentage').innerHTML = `${Math.round((formattedValue / detteEcologique) * 100)} %`;
  document.getElementById('euros').innerHTML = `${toHumanPrice(formattedValue)} EUR`;
  document.getElementById('number__trees').innerHTML = `${Math.round(formattedValue / 20)}`;
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


function redirectionMarkup(flight) {
  
  const markupRedirect = `
    <div class="modal-like-frame">
      <h4>bienvenue sur la page de compensation, ici vous pouvez:</h4>
      <div class="compensation-choix-user">
        <div class="compensation-compensation-tooltip-control">
          <button id="back-to-research-target" style="background-color: #6b847d;" data-toggle="tooltip" data-html="true" data-placement="top" 
          title='
            ${displayTooltipDate(flight)}
          '>Continuer vos recherches</button>
        </div>
        <div class="compensation-pay-debt-control">
          <button id="regler-dette-eco" style="background-color: #0ADEA9;" data-toggle="tooltip" data-html="true" data-placement="top" 
          title='
            <p>La participation de skytree’p à votre dette sera automatiquement ajoutée lors de votre paiement</p>
          '>Régler votre dette</button>
        </div>
      </div>  
    </div>
  `
  return markupRedirect
}

function displayTooltipDate(flight) {

  const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  let moisDateAller, jourDateAller, jourDateRetour, moisDateRetour, anneeDate, markup;
  let infos = JSON.parse(localStorage.getItem('UserInputs'))

  jourDateAller = infos.date_aller.split('/')[0]
  moisDateAller = Number(infos.date_aller.split('/')[1])
  anneeDate = infos.date_aller.split('/')[2]

  console.log(jourDateAller)
  console.log(moisDateAller)

  markup = `<p>${flight.cityFrom} - ${flight.cityTo} le ${jourDateAller} ${mois[moisDateAller]} ${anneeDate}</p>`

  if (infos.date_retour) {
    jourDateRetour = infos.date_retour.split('/')[0]
    moisDateRetour = Number(infos.date_retour.split('/')[1])
    markup = `<p>${flight.cityFrom} - ${flight.cityTo} du ${jourDateAller} ${mois[moisDateAller - 1]} au ${jourDateRetour} ${mois[moisDateRetour - 1]} ${anneeDate}</p>`
  }

  return markup
}

export const createCompensationMarkup = (flight, option) => {
  
  const pourcentageSkytreep = Math.round((flight.treepCompensation / flight.treepDetteEcologique) * 100);

	const markup = `
	  <div class="background__container">
      <div class="compensation-background-layer">
        ${option}
  		  <h3>Bravo, en passant par Skytree'p, vous avez déja remboursé ${pourcentageSkytreep}% de votre dette écologique !</h2>
  			<div class="compensation__container">

  				<div class="compensation__stats__container">
  				  	<div class="compensation__first__part">
  					  	<div class="compensation__montant">
  						  	<p id="compensation__titre">Dette écologique:</p>
  						  	<p>${toHumanPrice(flight.treepDetteEcologique)} euros</p>
  					    </div>
  					  	<ul class="compensation__icons">
                  <li class="c-target" id="active__measure"><img src="https://res.cloudinary.com/tark-industries/image/upload/v1562370362/Co2_icon.png" style="height:45px;"></li>
  					  	  <li>€</li>
  					  	  <li class="tree__pictures__compensation t-target" ><img src="https://res.cloudinary.com/tark-industries/image/upload/v1553192647/Arbre.png" style="height:45px;padding-left: 8px;margin-bottom: 14px;"></li>
  					    </ul>
  				  	</div>
  	                 
  				  	<div class="compensation__second__part">
  				  	  <div id="slider__compensation" style="height: 14px;">
  				  	    <input  id="total-compensation" type="hidden" value="">
                  <input  id="user-compensation" type="hidden" value="">
  				  	  </div>
  				  	</div>

  				  	<div class="compensation__third__part">
  				  		<ul class="compensation__stats__list">
  							<li>Pourcentage:  <span id="percentage"></span></li>
  							<li class='border-middle'>Euros:  <span id="euros"></span></li>
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

function uniquementSkytreepShare(flight) {
  const pourcentageSkytreep = Math.round((flight.treepCompensation / flight.treepDetteEcologique) * 100);

  document.getElementById('verser-uniquement').innerHTML = `
    Uniquement faire payer à skytree'p les ${pourcentageSkytreep}% de votre dette
  `

}



