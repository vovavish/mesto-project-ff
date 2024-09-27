import {
  createCard,
  deleteCardCallback,
  likeCardCallback,
  currentCardElementToDelete,
  currentCardIdToDelete,
} from "./components/card";
import {
  closePopup,
  openPopup,
  closePopupHandlerOverlay,
} from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getUserData,
  getInitialCards,
  updateAvatarToServer,
  updateUserData,
  addCardToServer,
} from "./components/api";

import "./pages/index.css";

const placesList = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

const popupDeleteCard = document.querySelector(".popup_type_delete-card");

const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");

const popupElements = document.querySelectorAll(".popup");

const formEditProfileElement = document.forms["edit-profile"];
const nameInput = formEditProfileElement.elements.name;
const jobInput = formEditProfileElement.elements.description;

const formAddNewPlaceElement = document.forms["new-place"];
const placeNameInput = formAddNewPlaceElement.elements["place-name"];
const placeLinkInput = formAddNewPlaceElement.elements.link;

const formDeleteCard = document.forms["delete-card"];

const formEditAvatar = document.forms["new-avatar"];
const avatarLinkInput = formEditAvatar.elements.link;

const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const profileImage = document.querySelector(".profile__image");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

function onClickPopupCallback(evt, cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageCaption.textContent = cardImage.alt;

  setSubmitButtonStateDefault(formAddNewPlaceElement);

  openPopup(popupTypeImage);
}

function deleteCardPopupCallback(evt) {
  openPopup(popupDeleteCard);
}

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;

  clearValidation(formEditProfileElement, validationConfig);

  openPopup(popupEdit);
});

profileAddButton.addEventListener("click", () => {
  setSubmitButtonStateDefault(formEditProfileElement);
  clearValidation(formAddNewPlaceElement, validationConfig);
  placeNameInput.value = "";
  placeLinkInput.value = "";
  openPopup(popupAdd);
});

popupElements.forEach((popupElement) => {
  popupElement.classList.add("popup_is-animated");
  popupElement.addEventListener("click", closePopupHandlerOverlay);
});

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();

  setSubmitButtonStateSave(formEditProfileElement);

  updateUserData({ name: nameInput.value, about: jobInput.value })
    .then((res) => {
      closePopup(popupEdit);
      profileTitleElement.textContent = nameInput.value;
      profileDescriptionElement.textContent = jobInput.value;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSubmitButtonStateDefault(formEditProfileElement);
    });
}

function handleFormAddNewPlaceSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  setSubmitButtonStateSave(formAddNewPlaceElement);

  addCardToServer(cardData)
    .then((cardData) => {
      placesList.prepend(
        createCard({
          card: cardData,
          likeCallback: likeCardCallback,
          onClickPopupCallback: onClickPopupCallback,
          deleteCardPopupCallback: deleteCardPopupCallback,
          currentUserId: cardData.owner._id,
        })
      );

      closePopup(popupAdd);
      clearValidation(formAddNewPlaceElement, validationConfig);
      formAddNewPlaceElement.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSubmitButtonStateDefault(formAddNewPlaceElement);
    });
}

function setSubmitButtonStateSave(formElement) {
  formElement.querySelector(".popup__button").textContent = "Сохранение...";
}

function setSubmitButtonStateDefault(formElement) {
  formElement.querySelector(".popup__button").textContent = "Сохранить";
}

function updateLocalUserData(userData) {
  profileTitleElement.textContent = userData.name;
  profileDescriptionElement.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

formEditProfileElement.addEventListener("submit", handleFormEditProfileSubmit);

formAddNewPlaceElement.addEventListener("submit", handleFormAddNewPlaceSubmit);

formDeleteCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  deleteCardCallback(currentCardElementToDelete, currentCardIdToDelete).then(
    () => {
      closePopup(popupDeleteCard);
    }
  );
});

formEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  setSubmitButtonStateSave(formEditAvatar);

  const newAvatarLink = formEditAvatar.elements.link.value;

  updateAvatarToServer(newAvatarLink)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${newAvatarLink})`;
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    });
});

profileImage.addEventListener("click", () => {
  clearValidation(formEditAvatar, validationConfig);
  avatarLinkInput.value = "";
  setSubmitButtonStateDefault(formEditAvatar);
  openPopup(popupEditAvatar);
});

Promise.all([getUserData(), getInitialCards()]).then((results) => {
  const userData = results[0];
  const cards = results[1];

  updateLocalUserData(userData);

  cards.forEach((card) =>
    placesList.append(
      createCard({
        card: card,
        likeCallback: likeCardCallback,
        onClickPopupCallback: onClickPopupCallback,
        currentUserId: userData._id,
        deleteCardPopupCallback: deleteCardPopupCallback,
      })
    )
  );
});
