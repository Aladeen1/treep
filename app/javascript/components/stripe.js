export const customStripeButton = () => {
	const form = document.querySelector('.hide__stripe__form');
	const container = document.querySelector('.compensation__container');
	container.appendChild(form);
	form.style.display = 'block';
}