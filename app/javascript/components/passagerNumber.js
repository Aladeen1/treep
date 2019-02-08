function numberTest() {
	document.getElementById('decrease').addEventListener('click', decreaseValue);
	document.getElementById('increase').addEventListener('click', increaseValue);
}

function increaseValue() {
  var value = parseInt(document.getElementById('passengers').value, 10);
  value = isNaN(value) ? 1 : value;
  value > 8 ? value = 8 : '';
  value++;
  document.getElementById('passengers').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('passengers').value, 10);
  value = isNaN(value) ? 1 : value;
  value < 2 ? value = 2 : '';
  value--;
  document.getElementById('passengers').value = value;
}

numberTest()