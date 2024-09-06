import './pages/index.css';

import initialCards from './cards';

const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.card');

const placesList = document.querySelector('.places__list');

function createCard(card, deleteCallback) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  
  cardElement.querySelector('.card__title').textContent = card.name;
  
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', () => deleteCallback(cardElement));

  return cardElement;
}

const deleteCardCallback = cardElement => cardElement.remove();

initialCards.forEach(card =>
  placesList.append(createCard(card, deleteCardCallback))
);