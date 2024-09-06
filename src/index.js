import { createCard, deleteCardCallback, likeCardCallback } from './components/card';
import { openPopup } from './components/modal';

import initialCards from './cards';

import './pages/index.css';

const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const popupElements = document.querySelectorAll('.popup');

const formEditProfileElement = document.forms['edit-profile'];
const nameInput = formEditProfileElement.elements.name;
const jobInput = formEditProfileElement.elements.description;

const formAddNewPlaceElement = document.forms['new-place'];
const placeName = formAddNewPlaceElement.elements['place-name'];
const placeLink = formAddNewPlaceElement.elements.link;

const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

function popupOnClickCallback(evt, cardElement) {
  const cardImage = cardElement.querySelector('.card__image');

  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;

  openPopup(popupTypeImage);
}

initialCards.forEach((card) =>
  placesList.append(createCard(card, deleteCardCallback, likeCardCallback, popupOnClickCallback)),
);

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  openPopup(popupEdit);
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

popupElements.forEach((popupElement) => {
  popupElement.classList.add('popup_is-animated');
});


function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.popup_is-opened').classList.toggle('popup_is-opened');

  profileTitleElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = jobInput.value;
}

function handleFormAddNewPlaceSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.popup_is-opened').classList.toggle('popup_is-opened');

  placesList.prepend(
    createCard(
      {
        name: placeName.value,
        link: placeLink.value,
      },
      deleteCardCallback,
      likeCardCallback,
      popupOnClickCallback,
    ),
  );
  
  formAddNewPlaceElement.reset();
}

formEditProfileElement.addEventListener('submit', handleFormEditProfileSubmit);

formAddNewPlaceElement.addEventListener('submit', handleFormAddNewPlaceSubmit);
