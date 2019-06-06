import noUiSlider from "nouislider";
import 'nouislider/distribute/nouislider.css';
import './dashboard-slider.css';

window.addEventListener('load', () => {
	if ($('.dashboard') != null) {
		// console.log('je suis sur la page du dashboard slider')
		createDashboardSlider()
	}
})

function createDashboardSlider() {
	// console.log($('.flights_information').data('flights'));
	
	const detteEcos = Array.from(document.querySelectorAll('.dette_eco_information'));
    const sliderAnchors = Array.from(document.querySelectorAll('.dashboard-slider-container'));

    sliderAnchors.forEach( (anchor, index) => {
    	console.log(detteEcos[index]);
    	console.log(anchor);
    	createUiSlider(anchor.children[0], 0, 100);
    })

}

function createUiSlider(slider, minValue, maxValue) {
	noUiSlider.create(slider, {
	    start: [minValue, maxValue],
	    connect: true,
	    padding: [0, 50],
	    range: {
	        'min': minValue,
	        'max': maxValue
	    },
	    step: 1
	});
	return slider.noUiSlider
}