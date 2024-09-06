function closePopupHandlerButton(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function closePopupHandlerOverlay(evt) {
  const targetClassList = evt.target.classList;
  if (targetClassList.contains('popup__close') || targetClassList.contains('popup')) {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function openPopup(popupElement) {
  popupElement.classList.toggle('popup_is-opened');
  document.addEventListener('keydown', closePopupHandlerButton);
  document.addEventListener('click', closePopupHandlerOverlay);
}

function closePopup(popupElement) {
  popupElement.classList.toggle('popup_is-opened');
  document.removeEventListener('keydown', closePopupHandlerButton);
  document.removeEventListener('click', closePopupHandlerOverlay);
}

export { openPopup, closePopup };
