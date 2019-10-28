export const payDetteEco = () => {
  const target = document.getElementById('regler-dette-eco');
  target.addEventListener('click', () => {
    window.location.href = "http://localhost:3000/compensations/new";
  })
}
// www.skytreep.fr
// localhost:3000