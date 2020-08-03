const validationClasses = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__text',
  submitButtonSelector: '.pop-up__btn_action_save',
  inactiveButtonClass: 'pop-up__btn_type_inactive',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input_type_error',
}

function inactiveButtonState (buttonElement) {
  buttonElement.setAttribute('disabled', true)
  buttonElement.classList.add(validationClasses.inactiveButtonClass);
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationClasses.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationClasses.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationClasses.inputErrorClass);
  errorElement.classList.remove(validationClasses.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationClasses.inputSelector));
  const buttonElement = formElement.querySelector(validationClasses.submitButtonSelector);
  setSubmitButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      setSubmitButtonState(inputList, buttonElement);
    });
  });
}


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function setSubmitButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    inactiveButtonState(buttonElement);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validationClasses.inactiveButtonClass);
  }
}

function enableValidation({
  formSelector
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation(validationClasses);