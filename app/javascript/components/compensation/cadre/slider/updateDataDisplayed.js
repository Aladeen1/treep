import { toHumanPrice } from '../../../../views/base';

export const updateMeasure = (activeIcon, flight) => {
  let valeurDepart, valeurArrivee;
  const slider = document.getElementById('slider__compensation').noUiSlider
  
  const tree = `<img src="https://res.cloudinary.com/tark-industries/image/upload/v1553192647/Arbre.png" style="height:45px;">`
	const detteEcologique = flight.treepDetteEcologique;

	if (activeIcon.className.includes('t-target')) {
    valeurDepart = `<div class="tree__adjustement">${tree}</div><p>0</p>`;
    valeurArrivee = `<p>${detteEcologique / 13}</p><div class="tree__adjustement">${tree}</div>`;
	} else if (activeIcon.className.includes('c-target')) {
    valeurDepart = '<p>0Kg</p>';
    valeurArrivee = `<p>${flight.treepCarbonEmission}Kg</p>`;
	} else if (activeIcon.className.includes('p-target')) {
    valeurDepart = '<p>0%</p>';
    valeurArrivee = `<p>100%</p>`;
  } else {
	  valeurDepart = '<p>0.00€</p>';
    valeurArrivee = `<p>${toHumanPrice(detteEcologique)}€</p>`;
	}

  // if (activeIcon.className.includes('t-target')) {
  //   document.querySelector('.position__lower').innerHTML = valeurDepart;
  //   document.querySelector('.position__upper').innerHTML = valeurArrivee;
  // } else {
    document.querySelector('.position__lower').innerHTML = valeurDepart;
    document.querySelector('.position__upper').innerHTML = valeurArrivee;
  // }
  updateHandleValue(slider, flight)
}

function updateHandleValue(slider, flight) {
  const values = sliderValues(slider);
  const valeurSkytreep = values[0];
  const valeurUser = values[1];
  const skytreepTargetDiv = document.getElementById('compensation__data__target__skytreep');
  const userTargetDiv = document.getElementById('compensation__data__target__user');
  const valeurTotal = (flight.treepDetteEcologique / 13) * 20;
  
  if (document.getElementById('active__measure').className.includes('t-target')){
    userTargetDiv.children[0].innerHTML = `${(valeurUser - valeurSkytreep) / 20} <img src="https://res.cloudinary.com/tark-industries/image/upload/v1553192647/Arbre.png" style="height:45px;">`;
    skytreepTargetDiv.children[0].innerHTML = `${valeurSkytreep / 20} <img src="https://res.cloudinary.com/tark-industries/image/upload/v1553192647/Arbre.png" style="height:45px;">`;
  } else if (document.getElementById('active__measure').className.includes('c-target')) {
    userTargetDiv.children[0].innerText = `${valeurUser - valeurSkytreep} kg`;
    skytreepTargetDiv.children[0].innerText = `${valeurSkytreep} kg`;
  } else if (document.getElementById('active__measure').className.includes('p-target')) {
    userTargetDiv.children[0].innerText = `${Math.round(((valeurUser - valeurSkytreep) / valeurTotal) * 100)} %`;
    skytreepTargetDiv.children[0].innerText = `${Math.round((valeurSkytreep / valeurTotal) * 100)} %`;
  } else {
    userTargetDiv.children[0].innerText = `${toHumanPrice(((valeurUser - valeurSkytreep) / 20) * 13)} €`;
    skytreepTargetDiv.children[0].innerText = `${toHumanPrice((valeurSkytreep / 20) * 13)} €`;
  }
}

function sliderValues(slider) {

  const values = slider.get();
  let valeurSkytreep = Number(values[0].split('.')[0]);
  let valeurUser = Number(values[1].split('.')[0]);

  return [valeurSkytreep, valeurUser]
}

export const updateHandles = (slider, flight) => {
  slider.on('update', () => {
    updateHandleValue(slider, flight)
  })
}


// function renderTextSquareSliders(type, element, element1, sliderEquality, handle) {
//   let markup;

//   if (type == "tree" ) {
//     markup = `
//       <div class="compensation-slider-tree-positionning">
//         <div><p>${element}</p>${element1}</div>
//       </div>
//     `
//   } else if (type == "money" || type == "co2") {
//     (sliderEquality & handle == 1) ? markup = '': markup = `<div class="compensation-slider-text-positionning"><p>${element}${element1}</p></div>`;
//   }
//   return markup
// }
