const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

function createCard(card, deleteCallback, likeCallback, popupOnClickCallback) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', () => deleteCallback(cardElement));

  cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', () => likeCallback(cardElement));

  cardElement
    .querySelector('.card__image')
    .addEventListener('click', (evt) => popupOnClickCallback(evt, cardElement));

  return cardElement;
}

const deleteCardCallback = (cardElement) => cardElement.remove();

const likeCardCallback = (cardElement) => {
  cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
};

export { createCard, deleteCardCallback, likeCardCallback };
