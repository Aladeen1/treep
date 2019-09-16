import noUiSlider from "nouislider";
import 'nouislider/distribute/nouislider.css';
import './compensation-slider.css';

export const createCompensationSlider = (sliderAnchor, flight) => {

	const treepCarbonCompensation = (flight.treepCompensation / 13) * 20;
  const totalCarbonEmission = flight.treepCarbonEmission;
    
	noUiSlider.create(sliderAnchor, {
	    start: [treepCarbonCompensation, treepCarbonCompensation],
	    connect: [true, true, false],
      padding: [treepCarbonCompensation, 0],
	    range: {
	        'min': 0,
	        'max': totalCarbonEmission
	    },
	    step: 20
    });

	const handles = sliderAnchor.getElementsByClassName('noUi-handle');
	const connects = sliderAnchor.getElementsByClassName('noUi-connect');

	setDataTextPosition(flight)
	setExplicationTextPosition(flight)

	handles[0].style.display = 'none';
	
	connects[0].style.background = '#36ACB8';
    connects[1].style.background = '#00C896';

	return sliderAnchor.noUiSlider
}

function setDataTextPosition(flight) {

	const skytreepTargetDiv = document.getElementById('compensation__data__target__skytreep');
	const userTargetDiv = document.getElementById('compensation__data__target__user');
	const pourcentageSkytreep = Math.round((flight.treepCompensation / flight.treepDetteEcologique) * 100);
	const skytreepConnectSize = Math.round((650 * pourcentageSkytreep) / 100);
	const userConnectSize = 650 - skytreepConnectSize;

	skytreepTargetDiv.style.width = `${skytreepConnectSize}px`;
	userTargetDiv.style.width = `${userConnectSize}px`;
}

function setExplicationTextPosition(flight) {
	const skytreepTargetDiv = document.querySelector('.participation__treep');
	const userTargetDiv = document.querySelector('.participation__user');
	const pourcentageSkytreep = Math.round((flight.treepCompensation / flight.treepDetteEcologique) * 100);
	const skytreepConnectSize = Math.round((650 * pourcentageSkytreep) / 100) - 16;
	const userConnectSize = 634 - (skytreepConnectSize + 16);

	skytreepTargetDiv.style.width = `${skytreepConnectSize}px`;
	userTargetDiv.style.width = `${userConnectSize}px`;
}