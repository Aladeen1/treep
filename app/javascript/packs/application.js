import "bootstrap";
import { elements } from '../views/base';
import { test } from '../views/searchView';
import * as action from './index';

console.log('Hello from webpacker');


action.displayAiports();
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    action.controlSearch();
});
