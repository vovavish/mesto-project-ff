let currentOpenedPopup = {};

function closePopupHandlerButton(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

function openPopup(popupElement) {
  currentOpenedPopup = popupElement;
  popupElement.classList.toggle("popup_is-opened");
  document.addEventListener("keydown", closePopupHandlerButton);
}

function closePopup(popupElement) {
  currentOpenedPopup = {};
  popupElement.classList.toggle("popup_is-opened");
  document.removeEventListener("keydown", closePopupHandlerButton);
}

export { openPopup, closePopup, currentOpenedPopup };
