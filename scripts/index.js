const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.card');

const placesList = document.querySelector('.places__list');

function createCard(card, deleteCallback) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', deleteCallback);

  return cardElement;
}

const deleteCardCallback = evt => evt.target.parentElement.remove();

initialCards.forEach(card =>
  placesList.append(createCard(card, deleteCardCallback))
);