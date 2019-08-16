import noUiSlider from "nouislider";
import 'nouislider/distribute/nouislider.css';
import './home__sliders.css';
import { createRouteArray, distanceFlight } from '../views/renderDetails';

var CityData = function(data){
  	this.data = {
  		name: data.name,
		latitude: data.latitude,
		longitude: data.longitude
 	};
}

const cities = {
	paris: new CityData({name: 'Paris', latitude: 49.009722, longitude: 2.547778}),
	berlin: new CityData({name: 'Berlin', latitude: 52.559722, longitude: 13.287778}),
	stockholm: new CityData({name: 'Stockholm', latitude: 59.651944, longitude: 17.918611}),
	madrid: new CityData({name: 'Madrid', latitude: 40.493611, longitude: -3.566667}),
	varsovie: new CityData({name: 'Varsovie', latitude: 52.165833, longitude: 20.967222}),
	turin: new CityData({name: 'Turin', latitude: 45.2025, longitude: 7.649444})
}

if ($('#home')[0] != null) {
	const target1 = document.getElementById('home-slider-target-co2');
	const target2 = document.getElementById('home-slider-target-arbres');
	const target3 = document.getElementById('home-slider-target-compensation');

	const sliderCo2 = createSlider(target1, 213, 'co2');
	const sliderArbres = createSlider(target2, 11, 'arbres');
	const sliderRepartition = createRepartitionSlider(target3, 11);
	listenChanges(sliderCo2, sliderArbres);
	lockHandles();
}

function createRepartitionSlider(sliderAnchor, arbres) {

	noUiSlider.create(sliderAnchor, {
		animate: true,
		animationDuration: 2000,
	    start: [25, 100],
	    connect: [true, true, false],
	    // margin: ,
       	//    padding: [0, maxPadding],
	    range: {
	        'min': 0,
	        'max': 100
	    }
    });

    const connects = sliderAnchor.getElementsByClassName('noUi-connect');
    const handles = sliderAnchor.getElementsByClassName('noUi-handle');

    handles[0].style.display = 'none';
    handles[1].style.display = 'none';

	connects[0].style.background = '#36ACB8';
    connects[1].style.background = '#00C896';
    createRepartitionElements();

    return sliderAnchor.noUiSlider
}

function createRepartitionElements() {

	const target = document.getElementById('home-slider-target-compensation').children[0]

	const treepNumber = `
		<div class="treep-number-positioning">
			<div style="position:relative;">
				<p id="skytree-share-target">3</p>
				<img src="https://res.cloudinary.com/tark-industries/image/upload/v1553192647/Arbre.png" style="height:50px;width:50px;">
			</div>
		</div>
	`

	const userNumber = `
		<div class="user-number-positioning">
			<div style="position:relative;">
				<p id="user-share-target">8</p>
				<img src="https://res.cloudinary.com/tark-industries/image/upload/v1553192647/Arbre.png" style="height:50px;width:50px;">
			</div>
		</div>
	`

	const markupTreep = `
	    <div class="home-skytreep-share">
			<div class='square__arbres__plantes'></div>
			<p class='text__treep__arbres__plantes'>Vous avez planté<br>3 arbres gratuitement</p>
		</div>
	`
	const markupUser = `
	    <div class="home-user-share">
			<div class='square__arbres__plantes'></div>
			<p class='text__user__arbres__plantes'>Vous voulez compenser le reste ?<br> Choississez de planter les 8 arbres restants <br> chez l'une de nos associations partenaires.  </p>
		</div>
	`
	target.insertAdjacentHTML('beforeEnd', treepNumber);
	target.insertAdjacentHTML('beforeEnd', markupTreep);
	target.insertAdjacentHTML('beforeEnd', userNumber);
	target.insertAdjacentHTML('beforeEnd', markupUser);
}



function createSlider(sliderAnchor, value, type) {
    let maxPadding, maxRange;

	if (type == "co2") {
		maxPadding = 750 - value;
		maxRange = 750;
	} else if (type == "arbres") {
		maxPadding = 33 - value;
		maxRange = 33;
	}


	noUiSlider.create(sliderAnchor, {
		animate: true,
		animationDuration: 2000,
	    start: value,
	    connect: [true, false],
	    margin: value,
        padding: [0, maxPadding],
	    range: {
	        'min': 0,
	        'max': maxRange
	    }
    });
   
	const connects = sliderAnchor.getElementsByClassName('noUi-connect');

  	if(type == "co2") {
  		connects[0].style.background = '#FFC7C7';
  	} else if (type == "arbres") {
  		connects[0].style.background = '#B5F6AA';
  	}

  	setHandleText(sliderAnchor.noUiSlider, type)

	return sliderAnchor.noUiSlider
}


function setHandleText(slider, type) {
	const handle = slider.target.getElementsByClassName('noUi-handle')[0];
    const value = (slider.get()).split(".")[0];
    if (type == 'co2') {
    	handle.dataset.value = `${value} kg`;
    } else if (type == 'arbres') {
    	handle.dataset.value = `x${value}`;
    }
}

function lockHandles() {
	const handles = document.querySelectorAll('.noUi-origin');
	handles.forEach( handle => {
		handle.setAttribute('disabled', true);
	})
}


function updateDistance(depart, arrivee) {

    const distance = Number(distanceFlight(cities[depart.value].data.latitude, cities[depart.value].data.longitude, cities[arrivee.value].data.latitude, cities[arrivee.value].data.longitude, 'K'));
    const carbon = Math.round((distance * 235) / 1000);
    const newPaddingCo2 = 750 - carbon;
    const arbres = Math.ceil(carbon / 20);
    const newPaddingArbres = 33 - arbres;
    return [carbon, newPaddingCo2, arbres, newPaddingArbres]
}

function listenChanges(sliderCo2, sliderArbres) {
	document.getElementById('home-example-selection-depart').addEventListener( 'change', () => {
		updateSlider(sliderCo2, sliderArbres)
    })

    document.getElementById('home-example-selection-arrivee').addEventListener( 'change', () => {
    	updateSlider(sliderCo2, sliderArbres)
    })
}

function updateSlider(sliderCo2, sliderArbres) {

	let arrivee = document.getElementById('home-example-selection-arrivee');
	let depart = document.getElementById('home-example-selection-depart');
	updateNameSecondDisplay(depart, arrivee);
	let options = updateDistance(depart, arrivee)
	setNewSliderValues(sliderCo2, options[0], options[1], 'co2');
	setNewSliderValues(sliderArbres, options[2], options[3], 'arbres');
	updateRepartition(options[2])
}

function setNewSliderValues (slider, value, padding, type) {
	slider.set(value)
	slider.updateOptions({
		start: value,
		padding: [0, padding],
		margin: value
	})
	setHandleText(slider, type)
}

function updateRepartition(arbres) {
	const skytreepShare = Math.ceil(arbres * 0.2);
	const userShare = arbres - skytreepShare;
	document.getElementById('skytree-share-target').innerHTML = skytreepShare;
	document.getElementById('user-share-target').innerHTML = userShare;
	document.querySelector('.text__treep__arbres__plantes').innerHTML = `Vous avez planté<br>${skytreepShare} arbres gratuitement`;
	document.querySelector('.text__user__arbres__plantes').innerHTML = `Vous voulez compenser le reste ?<br> Choississez de planter les ${userShare} arbres restants <br> chez l'une de nos associations partenaires.`;
}

function updateNameSecondDisplay(depart, arrivee) {
	document.getElementById('home-example-display-depart').innerText = cities[depart.value].data.name;
	document.getElementById('home-example-display-arrivee').innerText = cities[arrivee.value].data.name;
}




