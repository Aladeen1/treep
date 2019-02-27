// import { createUiSlider } from './sliderRange';
import noUiSlider from "nouislider";
import 'nouislider/distribute/nouislider.css';
import 'nouislider/distribute/compensation.css';

window.addEventListener('load', () => {
	if ($('#title-target')[0] != null) {
      const flight = JSON.parse(localStorage.getItem('userFlight'));
     
      
      const render = createCompensationMarkup(flight);
      document.getElementById('title-target').insertAdjacentHTML('afterend', render);

      const sliderAnchor = document.getElementById('slider__compensation');

      initializeUislider(sliderAnchor, flight);

	}
}) 

function initializeUislider(sliderAnchor, flight) {
    const sliderCreated = createCompensationSlider(sliderAnchor, flight);
    connectUiSlider(sliderCreated, sliderAnchor.children[0]);
    updateHandles(sliderCreated);
}

const updateSliderValue = (slider, handle = 0) => {
  const children = slider.target.getElementsByClassName('noUi-handle');
  console.log(children)
  const values = slider.get();
  let i = 0;
  let val;
  while (i < children.length) {
    if (children.length === 1) {
       val = parseInt(values);
    } else {
       val = parseInt(values[i]);
    }
    children[i].dataset.value = val
    i++
  }
}

function updateHandles(slider) {
  slider.on('update', () => {
    updateSliderValue(slider)
  })
}


function connectUiSlider(slider, sliderInput) {
  // slider.off('update');
	slider.on("update", () => {
		let formattedValue = parseInt(slider.get()[2]);
    sliderInput.value = formattedValue;
  });
};



function createCompensationSlider(sliderAnchor, flight) {

	const treepCompensation = flight.price * 0.0064;
    const detteEcologique = flight.price * 0.02;
    
	noUiSlider.create(sliderAnchor, {
	    start: [0, treepCompensation, treepCompensation],
	    connect: true,
	    range: {
	        'min': 0,
	        'max': detteEcologique
	    }
    });

	const handles = sliderAnchor.getElementsByClassName('noUi-handle');
	const connects = sliderAnchor.getElementsByClassName('noUi-connect');
	handles[0].style.display = 'none';
	handles[1].style.display = 'none';
	connects[0].style.background = '#36ACB8';
	connects[1].style.background = '#00C896';

	return sliderAnchor.noUiSlider
}

function createCompensationMarkup(flight) {
    const detteEcologique = flight.price * 0.02;

	const markup = `
	    <h2>Bravo, en passant par Treep, vous avez déja remboursé 9% de votre dette écologique !</h2>
		<div class="compensation__container">

			<div class="compensation__stats__container">
			  	<div class="compensation__first__part">
				  	<div class="compensation__montant">
					  	<p id="compensation__titre">Dette écologique:</p>
					  	<p>${detteEcologique} euros</p>
				    </div>
				  	<ul class="compensation__icons">
				  	  <li>€</li>
				  	  <li id="active__measure">%</li>
				  	  <li>T</li>
				    </ul>
			  	</div>
                 
			  	<div class="compensation__second__part">
			  	  <div id="slider__compensation">
			  	    <input class="" id="" type="hidden" value="4">
			  	  </div>
			  	</div>

			  	<div class="compensation__third__part">
			  		<ul class="compensation__stats__list">
						<li>Pourcentage:</li>
						<li class='border-middle'>Euros:</li>
						<li>Nombres d'arbres:</li>
			  		</ul>
			  	</div>
			</div>

			<button class="checkout__button">PAYER MA DETTE ECOLOGIQUE</button>
		</div>
	`

	return markup
}



