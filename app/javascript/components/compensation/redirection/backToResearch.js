import { clearLoader } from '../../../views/base';
import { renderAll } from '../../../controllers/flightController';
import { populateSearchFields } from '../../../views/searchView';

export const goBackToResearch = () => {
  const target = document.getElementById('back-to-research-target');
  const pageTarget = document.getElementById('title-target-redirection');
  target.addEventListener('click', () => {
    clearLoader(pageTarget);
    pageTarget.style.minHeight = '0px';
    renderAll(pageTarget);
    document.getElementById('back-to-research-bar').style.display = 'block';
    populateSearchFields();
  })
}

