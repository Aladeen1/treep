import { elements } from './base';

export const renderDestination = (destination, type) => {
    const markup = `
        <option value="${destination.name}, ${destination.city.name}, ${destination.code}">
    `;
    document.querySelector(type).insertAdjacentHTML('beforeend', markup);
};

 