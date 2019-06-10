import noUiSlider from "nouislider";
import 'nouislider/distribute/nouislider.css';
import { elements } from "../views/base";
import './details__slider.css';
import { sortFlights } from '../views/sliderUtilisation';     

    console.log('bo')    

// Initialise les 6 sliders dont on a besoin en toutes occasions.
// (à modifier pour le cas des retour on aura un departHour et arrivee en plus)

export const globalSliderInitialization = (carbon, distance, duration, prix, departHour, arriveeHour, durationRetour, departHourRetour, arriveeHourRetour) => {
  initializeUislider(carbon);
  initializeUislider(distance);
	initializeUislider(duration);
  initializeUislider(prix);
  initializeUislider(departHour);
  initializeUislider(arriveeHour);  
  if (durationRetour) {
    initializeUislider(durationRetour)
    initializeUislider(departHourRetour)
    initializeUislider(arriveeHourRetour)
  }
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
// Connecte un par un les extrémités du slider. 

function connectUiSlider(slider, sliderInput, type) {
	slider.on("update", () => {
		let formattedValue = parseInt(slider.get()[type]);
    if (slider.target.id === 'sliderDepart' || slider.target.id === 'sliderArrivee' || slider.target.id === 'sliderDepartRetour' || slider.target.id === 'sliderArriveeRetour') {
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

  let children = slider.target.parentElement.getElementsByClassName('value__target__update');
  const horaireAndDuration = (slider.target.id === 'sliderDepart' || slider.target.id === 'sliderArrivee' || slider.target.id === 'sliderDuration' || slider.target.id === 'sliderDurationRetour' || slider.target.id === 'sliderDepartRetour' || slider.target.id === 'sliderArriveeRetour');

  if (slider.target.id.includes('DurationRetour')) {
    children = Array.from(children).splice(2, 2);
  } else {
    children = Array.from(children).splice(0, 2);
  }
  
  
  const values = slider.get()
  let i = 0
  let val
  while (i < children.length) {
    if (children.length === 1) {
       val = parseInt(values);
       if (horaireAndDuration) {
       	 val = convertMinsToHrsMins(val);
       } 
    } else {
       val = parseInt(values[i]);
       if (horaireAndDuration) {
       	 val = convertMinsToHrsMins(val);
       } 
    }
    
    identityCheck(children[i], val);
    i++
  }
}

// Fonction qui check l'identité du slider pour formater la valeur affichée

function identityCheck(element, val) {
  // prix
  if (element.id === 'min-B' || element.id === 'max-B') {
    element.innerHTML = `${val} EUR`
  }
  //durée
  else if (element.id === 'min-E' || element.id === 'max-E' || element.id === 'minRetour-E' || element.id === 'maxRetour-E') {
    element.innerHTML = `${val.split(':')[0]}h ${val.split(':')[1]}min`;
  } 
  
  // C02
  else if (element.id === 'min-C' || element.id === 'max-C') {
    element.innerHTML = `${val} Kg`;
  } 

  // Distance
  else if (element.id === 'min-D' || element.id === 'max-D') {
    element.innerHTML = `${val} Km`;
  } 

  else {
    element.innerHTML = `${val}`;
  }
}

// update the value in the handles when user drag them

function updateHandles(slider) {
  slider.on('update', () => {
    updateSliderValue(slider)
  })
}

// Converti les minutes en temps formatter HH:mm

export const convertMinsToHrsMins = mins => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${h}:${m}`;
}

// Converti les secondes en heure et arrondi a l'heure près

function convertSecToHrs(sec) {
	 
}
