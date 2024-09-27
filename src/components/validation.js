function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  turnOffSubmitButton(formElement, validationConfig);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";

  const isSomeInvalidInputs = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  ).some((inputFormEdit) => {
    return !inputFormEdit.validity.valid;
  });

  if (!isSomeInvalidInputs) {
    const submitFormButton = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    submitFormButton.classList.remove(validationConfig.inactiveButtonClass);
    submitFormButton.removeAttribute('disabled');
  }
}

function turnOffSubmitButton(formElement, validationConfig) {
  const submitFormButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  submitFormButton.classList.add(validationConfig.inactiveButtonClass);
  submitFormButton.setAttribute('disabled', true);
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function setEventListeners(formElement, validationConfig) {
  const popupInputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );

  popupInputList.forEach((popupInputElement) => {
    popupInputElement.addEventListener("input", function () {
      checkInputValidity(formElement, popupInputElement, validationConfig);
    });
  });
}

function enableValidation(validationConfig) {
  const popupFormList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  popupFormList.forEach((popupFormElement) => {
    setEventListeners(popupFormElement, validationConfig);
  });
}

function clearValidation(formElement, validationConfig) {
  Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  ).forEach((inputFormEdit) => {
    hideInputError(formElement, inputFormEdit, validationConfig);
  });

  turnOffSubmitButton(formElement, validationConfig);
}

export { enableValidation, clearValidation };
