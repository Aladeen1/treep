// import { createUiSlider } from './sliderRange';
import noUiSlider from "nouislider";
import 'nouislider/distribute/nouislider.css';
import './compensation-slider.css';

window.addEventListener('load', () => {
	if ($('#title-target')[0] != null) {
      const flight = JSON.parse(localStorage.getItem('userFlight'));
     
      
      const render = createCompensationMarkup(flight);
      document.getElementById('title-target').insertAdjacentHTML('afterend', render);

      const sliderAnchor = document.getElementById('slider__compensation');

      initializeUislider(sliderAnchor, flight);
      sliderDesign(flight);
      switchIcons(flight);
	}
})

function sliderDesign(flight) {
	document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="position__square"></div><p class="position__lower">0.00€</p>`);
    document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<p class="position__upper">${(flight.price * 0.02).toFixed(2)}€</p>`);
    document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="end__square"></div>`);
    document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="participation__treep"><p>La part de Treep</p></div>`);
    document.querySelector('.noUi-base').insertAdjacentHTML('beforeEnd', `<div class="participation__user"><p>La part du User</p></div>`);
}


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
	const detteEcologique = (flight.price * 0.02).toFixed(2);
	const handle = document.getElementsByClassName('noUi-handle-upper')[0].dataset.value;
	if (measure === 'T') {
	  document.querySelector('.position__lower').innerHTML = '0T';
      document.querySelector('.position__upper').innerHTML = `${Math.round((flight.price * 0.02).toFixed(2)/ 0.2)}T</p>`;
      if (handle.includes('€')) {
      	const money = handle;
      	document.getElementsByClassName('noUi-handle-upper')[0].dataset.value = `${Math.round(parseFloat(money.split('€')[0]) / 0.2)}T`;
      } else if (handle.includes('%')) {
      	const percent = handle;
      	document.getElementsByClassName('noUi-handle-upper')[0].dataset.value = `${Math.round( ((parseInt(percent.split('%')[0]) / 100) * detteEcologique) / 0.2)}T`;
      }
	} else if (measure === '%') {
	  document.querySelector('.position__lower').innerHTML = '0%';
      document.querySelector('.position__upper').innerHTML = '100%';

      if (handle.includes('€')) {
      	const money = handle;
      	document.getElementsByClassName('noUi-handle-upper')[0].dataset.value = `${((parseFloat(money.split('€')[0]) / detteEcologique).toFixed(2)) * 100}%`;
      } else if (handle.includes('T')) {
      	const trees = handle;
      	document.getElementsByClassName('noUi-handle-upper')[0].dataset.value = `${((parseInt(trees.split('T')[0]) * 0.2) / detteEcologique).toFixed(2) * 100}%`;
      }
	} else {

	  document.querySelector('.position__lower').innerHTML = '0.00€';
      document.querySelector('.position__upper').innerHTML = `${(flight.price * 0.02).toFixed(2)}€</p>`;

      if (handle.includes('T')) {
      	const trees = handle;
      	document.getElementsByClassName('noUi-handle-upper')[0].dataset.value = `${(parseInt(trees.split('T')[0]) * 0.2).toFixed(2)}€`;
      } else if (handle.includes('%')) {
      	const percent = handle;
      	document.getElementsByClassName('noUi-handle-upper')[0].dataset.value = `${((parseInt(percent.split('%')[0]) / 100) * detteEcologique).toFixed(2)}€`;
      }

	}
}


function initializeUislider(sliderAnchor, flight) {
    const sliderCreated = createCompensationSlider(sliderAnchor, flight);
    connectUiSlider(sliderCreated, sliderAnchor.children[0], flight);
    updateHandles(sliderCreated, flight);
}

const updateSliderValue = (slider, flight, handle = 0) => {

  const detteEcologique = flight.price * 0.02;
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
      children[i].dataset.value = `${Math.round(val / 0.2)}T`;
    } else if (document.getElementById('active__measure').innerHTML === '%') {
      children[i].dataset.value = `${Math.round(val / detteEcologique * 100)}%`;
    } else {
      children[i].dataset.value = `${val}€`;
    }
    i++
  }
}

function updateHandles(slider, flight) {
  slider.on('update', () => {
    updateSliderValue(slider, flight)
  })
}


function connectUiSlider(slider, sliderInput, flight) {
  // slider.off('update');
	slider.on("update", () => {
      let formattedValue = slider.get()[2];
      sliderInput.value = formattedValue;
      updateFields(formattedValue, flight);
    });
};

// create function measure change % -> € -> T




//create function that connects the value of the slider to all the fields in the view. 

function updateFields(formattedValue, flight) {
	const detteEcologique = flight.price * 0.02;
	document.getElementById('percentage').innerHTML = Math.round((formattedValue / detteEcologique) * 100);
    document.getElementById('euros').innerHTML = formattedValue;
    document.getElementById('number__trees').innerHTML = Math.round(formattedValue / 0.2);
}

function createCompensationSlider(sliderAnchor, flight) {

	const treepCompensation = flight.price * 0.0064;
    const detteEcologique = flight.price * 0.02;
    
	noUiSlider.create(sliderAnchor, {
	    start: [0, treepCompensation, treepCompensation],
	    connect: true,
	    range: {
	        'min': 0,
	        'max': detteEcologique
	    },
	    step: 0.2
    });

	const handles = sliderAnchor.getElementsByClassName('noUi-handle');
	const connects = sliderAnchor.getElementsByClassName('noUi-connect');
	handles[0].style.display = 'none';
	handles[1].style.display = 'none';
	connects[0].style.background = '#36ACB8';
	connects[1].style.background = '#00C896';

	return sliderAnchor.noUiSlider
}


function styleFirstHandle(handle){
	width = '5px';
	height = '30px';
	borderRadius = '3px';
	marginRight = '9px';
	backgroundColor = '#36ACB8';
}



function createCompensationMarkup(flight) {
    const detteEcologique = (flight.price * 0.02).toFixed(2);

	const markup = `
	    <div class="background__container">
		    <h2 style="margin-top:0;padding-top:20px;">Bravo, en passant par Treep, vous avez déja remboursé 9% de votre dette écologique !</h2>
			<div class="compensation__container">

				<div class="compensation__stats__container">
				  	<div class="compensation__first__part">
					  	<div class="compensation__montant">
						  	<p id="compensation__titre">Dette écologique:</p>
						  	<p>${detteEcologique} euros</p>
					    </div>
					  	<ul class="compensation__icons">
					  	  <li class="custom__icons" id="active__measure">€</li>
					  	  <li class="custom__icons">%</li>
					  	  <li class="custom__icons">T</li>
					    </ul>
				  	</div>
	                 
				  	<div class="compensation__second__part">
				  	  <div id="slider__compensation">
				  	    <input class="" id="" type="hidden" value="">
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

				<button class="checkout__button" style="width: 80%">PAYER MA DETTE ECOLOGIQUE</button>
			</div>
		</div>
	`
	return markup
}



