import noUiSlider from "nouislider";
import 'nouislider/distribute/nouislider.css';
import { elements } from "../views/base";
import 'nouislider/distribute/custom-style.css';
import { sortFlights } from '../views/sliderUtilisation';     



// Initialise les 6 sliders dont on a besoin en toutes occasions.
// (à modifier pour le cas des retour on aura un departHour et arrivee en plus)

export const globalSliderInitialization = (carbon, distance, duration, prix, departHour, arriveeHour) => {
  initializeUislider(carbon);
  initializeUislider(distance);
	initializeUislider(duration);
  initializeUislider(prix);
  initializeUislider(departHour);
  initializeUislider(arriveeHour);
}

// Créer le UiSlider avec les maximums et minimum et connecte l'input min et max a la valeur des handles lower et upper. 

function initializeUislider(sliderAnchor) {
    var sliderCreated = createUiSlider(sliderAnchor, parseInt(sliderAnchor.children[0].value), parseInt(sliderAnchor.children[1].value));
    connectUiSlider(sliderCreated, sliderAnchor.children[0], 0);
    connectUiSlider(sliderCreated, sliderAnchor.children[1], 1);
    updateHandles(sliderCreated);
}

// Créer le slider pour chaque option avec la valeur minimum d'origine et celle maximum et retourne le slider

export const createUiSlider = (slider, minValue, maxValue) => {
	noUiSlider.create(slider, {
	    start: [minValue, maxValue],
	    connect: true,
	    range: {
	        'min': minValue,
	        'max': maxValue
	    },
	    step: 1
	});
	return slider.noUiSlider
}

// Relie l'interface du slider à l'input caché qui est derrière en conservant le format qui est le bon. 

function connectUiSlider(slider, sliderInput, type) {
  // slider.off('update');
	slider.on("update", () => {
		let formattedValue = parseInt(slider.get()[type]);
    if (slider.target.id === 'sliderDepart' || slider.target.id === 'sliderArrivee') {
  		formattedValue = convertMinsToHrsMins(parseInt(formattedValue));
    } 
    sliderInput.value = formattedValue;
  });

  // Utilise off pour qu'il n'y ai qu'un eventListener déclenché (peut être un bug)
  slider.off('change');
  slider.on("change", sortFlights);
};


// Fonction qui lie la valeur du slider au dataset dans le css du module en le transformant en entier

const updateSliderValue = (slider, handle = 0) => {
  const children = slider.target.getElementsByClassName('noUi-handle')
  const values = slider.get()
  let i = 0
  let val
  while (i < children.length) {
    if (children.length === 1) {
       val = parseInt(values);
       if (slider.target.id === 'sliderDepart' || slider.target.id === 'sliderArrivee') {
       	 val = convertMinsToHrsMins(val);
       } 
    } else {
       val = parseInt(values[i]);
       if (slider.target.id === 'sliderDepart' || slider.target.id === 'sliderArrivee') {
       	 val = convertMinsToHrsMins(val);
       } 
    }
    children[i].dataset.value = val
    i++
  }
}

// update the value in the handles when user drag them

function updateHandles(slider) {
  slider.on('update', () => {
    updateSliderValue(slider)
  })
}

// Converti les minutes en temps formatter HH:mm

function convertMinsToHrsMins(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${h}:${m}`;
}

// Converti les secondes en heure et arrondi a l'heure près

function convertSecToHrs(sec) {
	 
}
