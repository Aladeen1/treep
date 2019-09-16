import { toHumanPrice } from '../../../../views/base';

// Ces 3 fonctions ont pour objet de passer la valeur du slider dans l'input caché.

function setUserShare(slider, sliderInput) {
  const share = Math.round(slider.get()[1]) - Math.round(slider.get()[0]);
  const userShare = (share / 20) * 13;
  sliderInput.children[3].value = userShare;
  fillPayButton(userShare)
}

function setGlobalShare(slider, sliderInput) {
  let formattedValue = slider.get()[1];
  sliderInput.children[2].value = (Math.round(formattedValue) / 20) * 13;
}

export const connectUiSlider = (slider, sliderInput) => {
	slider.on("update", () => {
    	setGlobalShare(slider, sliderInput);
    	setUserShare(slider, sliderInput);
    });
};

///////////// Connecte le slider et les stats en bas a droite du cadre de compensation ///////////// 

// function updateFields(formattedValue, flight) {
// 	const detteEcologique = flight.treepCarbonEmission;
// 	document.getElementById('percentage').innerHTML = `${Math.round((formattedValue / detteEcologique) * 100)} %`;
//   	document.getElementById('euros').innerHTML = `${toHumanPrice((formattedValue / 20) * 13)} EUR`;
//   	document.getElementById('number__trees').innerHTML = `${Math.round(formattedValue / 20)}`;
// }

////////////////////////////////////////////////////////////////////////////////////////

function fillPayButton(userShare) {
	if (document.querySelector('.pay__my__compensation') != null) {
    if (userShare > 50) {
      document.querySelector('.pay__my__compensation').innerHTML = `payer  ${toHumanPrice(userShare)} €`;
      document.querySelector('.pay__my__compensation').style.backgroundColor = '#00C896';
    } else {
      document.querySelector('.pay__my__compensation').innerHTML = `payer ${toHumanPrice(userShare)} € (0.50 € minimum)`;
      document.querySelector('.pay__my__compensation').style.backgroundColor = '#D30000';
    }
	}
}