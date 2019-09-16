import { fillHiddenFields } from '../.././modalApparition';

export const injectionDashboardRedirection = (flight) => {

	pourcentageVersDashboard(flight)
	const form = document.querySelector('.hide__form');
	const container = document.querySelector('.compensation-choix-user');
	container.appendChild(form);
	form.style.display = 'block';
	fillHiddenFields(flight);
}

function pourcentageVersDashboard(flight) {
  const pourcentageSkytreep = Math.round((flight.treepCompensation / flight.treepDetteEcologique) * 100);

  document.getElementById('verser-uniquement').innerHTML = `
    Les ${pourcentageSkytreep}% de votre dette seront automatiquement compensés
  `
}
