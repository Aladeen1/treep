export const redirectionMarkup = (flight) => {

  const pourcentageSkytreep = Math.round((flight.treepCompensation / flight.treepDetteEcologique) * 100);


  const markupRedirect = `
    <div class="modal-like-frame">
      <div class="modal-like-frame-title">
        <h4>Bravo !  En passant par Skytree'p vous allez rembourser ${pourcentageSkytreep}% de votre dette écologique !</h4>
        <h4>Votre action  <span style="padding: 3px;"></span><span style="color:#28A72D;">é</span><span style="color:#147B18;">c</span><span style="color:#6BDE70;">o</span><span style="color:#ABF3AE;">l</span><span style="color:#599e5a;">o</span><span style="color:#95EB98;">g</span><span style="color:#06DD0E;">i</span><span style="color:#4EB152;">q</span><span style="color:#C4ECC5;">u</span><span style="color:#04FF0E;">e</span><span style="padding: 3px;"></span>va permettre de planter ${flight.treepCompensation / 13} arbres.</h4>
      </div>
      <div class="compensation-choix-user">
        <div class="compensation-continuer-research-div" id="back-to-research-target">
          <button>Continuer vos recherches</button>
          <i class="fas fa-search" style="cursor:pointer;"></i>
          ${userSearchDate(flight)}
        </div>
        
        <div class="compensation-continuer-research-div compensation-regler-dette-eco-div">
          <button id="regler-dette-eco" style="background-color: #0ADEA9;height: 90px;">Régler le reste de votre </br>dette écologique</button>
          <img src="https://res.cloudinary.com/tark-industries/image/upload/v1553192647/Arbre.png">
          <p style="background-color:#0ADEA9;">Pour compenser 100% de votre dette écologique, vous devez encore planter ${(flight.treepDetteUser / 13)} arbres.</p>
        </div>
      </div>
    </div>
  `
  return markupRedirect
}



function userSearchDate(flight) {

  const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  let moisDateAller, jourDateAller, jourDateRetour, moisDateRetour, anneeDate, markup;
  let infos = JSON.parse(localStorage.getItem('UserInputs'))

  jourDateAller = infos.date_aller.split('/')[0]
  moisDateAller = Number(infos.date_aller.split('/')[1])
  anneeDate = infos.date_aller.split('/')[2]

  markup = `<p>${flight.cityFrom} - ${flight.cityTo} le ${jourDateAller} ${mois[moisDateAller]} ${anneeDate}</p>`

  if (infos.date_retour) {
    jourDateRetour = infos.date_retour.split('/')[0]
    moisDateRetour = Number(infos.date_retour.split('/')[1])
    markup = `<p>${flight.cityFrom} - ${flight.cityTo} du ${jourDateAller} ${mois[moisDateAller - 1]} au ${jourDateRetour} ${mois[moisDateRetour - 1]} ${anneeDate}</p>`
  }

  return markup
}