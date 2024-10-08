import {
  setLikeToServer,
  deleteLikeFromServer,
  deleteCardFromServer,
} from "./api";

import { checkResponseJSON } from "../utils/requestUtil";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

let currentCardElementToDelete = undefined;
let currentCardIdToDelete = undefined;

function createCard({
  card,
  likeCallback,
  onClickPopupCallback,
  deleteCardPopupCallback,
  currentUserId,
}) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener("click", (evt) =>
    onClickPopupCallback(evt, cardImage)
  );

  cardElement.querySelector(".card__title").textContent = card.name;

  const cardDeleteButtonElement = cardElement.querySelector(
    ".card__delete-button"
  );

  if (currentUserId !== card.owner._id) {
    cardDeleteButtonElement.remove();
  } else {
    cardDeleteButtonElement.addEventListener("click", () => {
      currentCardElementToDelete = cardElement;
      currentCardIdToDelete = card._id;
      deleteCardPopupCallback();
    });
  }

  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardLikeButton.addEventListener("click", () =>
    likeCallback(cardElement, card._id)
  );

  const totalLikesElement = cardElement.querySelector(".card__likes-total");
  totalLikesElement.textContent = card ? card.likes.length : 0;

  if (
    card.likes.some((likeUser) => {
      return likeUser._id === currentUserId;
    })
  ) {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  }

  return cardElement;
}

const deleteCardCallback = (cardElement, cardId) => {
  return deleteCardFromServer(cardId)
    .then((res) => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

const likeCardCallback = (cardElement, cardId) => {
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    deleteLikeFromServer(cardId)
      .then((cardData) => {
        const likesTotalElement =
          cardElement.querySelector(".card__likes-total");
        likesTotalElement.textContent = cardData.likes.length;
        cardLikeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    setLikeToServer(cardId)
      .then((cardData) => {
        const likesTotalElement =
          cardElement.querySelector(".card__likes-total");
        likesTotalElement.textContent = cardData.likes.length;
        cardLikeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export {
  createCard,
  deleteCardCallback,
  likeCardCallback,
  currentCardElementToDelete,
  currentCardIdToDelete,
};
