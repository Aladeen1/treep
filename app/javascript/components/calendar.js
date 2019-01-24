import flatpickr from "flatpickr";
import 'flatpickr/dist/themes/material_green.css';
import rangePlugin from "flatpickr/dist/plugins/rangePlugin";

flatpickr("#departDate__search", {
  altInput: true,
  altFormat: 'd/m/Y',
  dateFormat: 'd/m/Y'
});

flatpickr("#returnDate__search", {
  altInput: true,
  altFormat: 'd/m/Y',
  dateFormat: 'd/m/Y'
  // "plugins": [new rangePlugin({ input: "#range_end"})]
});