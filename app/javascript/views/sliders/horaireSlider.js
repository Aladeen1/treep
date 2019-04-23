export const markupHoraire = (id) => {

  const markup = `
    <div class="container" id="loaded">
        <div class="row">
          <div style="width:100%;">
                    
              <div class="slider__presentation__target" id="" data-toggle="collapse" data-target="#collapse-${id}" aria-expanded="false" aria-controls="collapse-${id}">
                <p class="option__title">Horaires</p>
                <img src="https://res.cloudinary.com/tark-industries/image/upload/v1553081403/Arrow_SKYTREEP.png" class="slider__presentation__arrow"> 
              </div>

              <div class="collapse" id="collapse-${id}">
                  <div style="display: flex;justify-content: center;">
                    <p class="horaire__toggle" id="active__horaire">Départ</p>
                    <p class="horaire__toggle">Arrivée</p>
                  </div> 
                  <div id="horaire__target">
                    <div id="horaire__depart__target" class="horaire__target__margin"></div>
                    <div id="horaire__arrivee__target" class="hide__horaire horaire__target__margin"></div>
                  </div>
              </div>
            
          </div>
        </div>
    </div>
    <div class="straight__details"></div>
    `
    document.querySelector('.flights__options').insertAdjacentHTML('beforeend', markup)
}

// gérer l'affichage du jour ensuite. 
export const sliderOnlyMarkup = (sliderType, sliderMinValueTarget, sliderMaxValueTarget, minValue, maxValue, id, type, target) => {
  if (sliderType === 'sliderDepartRetour' || sliderType === 'sliderArriveeRetour') {
    console.log(minValue)
    console.log(maxValue)
  }
  
  const markup = `
      <div id="target-${target}">
        <div class="slider__update__display horaire">
            <p>${type}</p>
            <div style="display: flex;">
                <p>jeu.</p>
            <p class="value__target__update" id="min-${id}"></p>
            <p>-</p>
            <p class="value__target__update" id="max-${id}"></p>
              </div>
          </div>
          <div id="${sliderType}" class="slider__style">
            <input class="target-option" id="${sliderMinValueTarget}" type="hidden" value="${minValue}"> 
            <input class="target-option" id="${sliderMaxValueTarget}" type="hidden" value="${maxValue}"> 
        </div>
      </div>
  `
  return markup
}

// function qui switch départ et arrivée pour les horaires

export const horaireSwitch = () => {
  const elements = Array.from(document.querySelectorAll('.horaire__toggle'))
  elements.forEach( elt => {
      	elt.addEventListener('click', event => {
      		if (event.target.id != 'active__horaire') {
      			document.getElementById('active__horaire').id = '';
      			event.target.id = 'active__horaire';
      			switchSlider(event.target.innerHTML);
      		};
        })
    })
}

function switchSlider(cible) {
  if (cible === 'Arrivée') {
    document.getElementById('horaire__arrivee__target').classList.remove("hide__horaire")
    document.getElementById('horaire__depart__target').classList.add("hide__horaire")
  } else if (cible === 'Départ') {
    document.getElementById('horaire__depart__target').classList.remove("hide__horaire")
    document.getElementById('horaire__arrivee__target').classList.add("hide__horaire")
  }
}
