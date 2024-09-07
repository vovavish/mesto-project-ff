import {
  createCard,
  deleteCardCallback,
  likeCardCallback,
} from "./components/card";
import { closePopup, openPopup } from "./components/modal";

import initialCards from "./cards";

import "./pages/index.css";

const placesList = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

const popupElements = document.querySelectorAll(".popup");

const formEditProfileElement = document.forms["edit-profile"];
const nameInput = formEditProfileElement.elements.name;
const jobInput = formEditProfileElement.elements.description;

const formAddNewPlaceElement = document.forms["new-place"];
const placeNameInput = formAddNewPlaceElement.elements["place-name"];
const placeLinkInput = formAddNewPlaceElement.elements.link;

const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

function closePopupHandlerOverlay(evt) {
  const targetClassList = evt.target.classList;
  if (
    targetClassList.contains("popup__close") ||
    targetClassList.contains("popup")
  ) {
    closePopup(evt.target);
  }
}

popupEdit.addEventListener("click", closePopupHandlerOverlay);
popupAdd.addEventListener("click", closePopupHandlerOverlay);
popupTypeImage.addEventListener("click", closePopupHandlerOverlay);

function popupOnClickCallback(evt, cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageCaption.textContent = cardImage.alt;

  openPopup(popupTypeImage);
}

initialCards.forEach((card) =>
  placesList.append(
    createCard({
      card: card,
      deleteCallback: deleteCardCallback,
      likeCallback: likeCardCallback,
      popupOnClickCallback: popupOnClickCallback,
    })
  )
);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  openPopup(popupEdit);
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

popupElements.forEach((popupElement) => {
  popupElement.classList.add("popup_is-animated");
});

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  closePopup(popupEdit);

  profileTitleElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = jobInput.value;
}

function handleFormAddNewPlaceSubmit(evt) {
  evt.preventDefault();
  closePopup(popupAdd);

  placesList.prepend(
    createCard({
      card: {
        name: placeNameInput.value,
        link: placeLinkInput.value,
      },
      deleteCallback: deleteCardCallback,
      likeCallback: likeCardCallback,
      popupOnClickCallback: popupOnClickCallback,
    })
  );

  formAddNewPlaceElement.reset();
}

formEditProfileElement.addEventListener("submit", handleFormEditProfileSubmit);

formAddNewPlaceElement.addEventListener("submit", handleFormAddNewPlaceSubmit);
