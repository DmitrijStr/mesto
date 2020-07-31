const classObj = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__text',
    submitButtonSelector: '.pop-up__btn_action_save',
    inactiveButtonClass: 'pop-up__btn_type_inactive',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__input_type_error',
  }
  
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(classObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(classObj.errorClass);
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(classObj.inputErrorClass);
    errorElement.classList.remove(classObj.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement,inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(classObj.inputSelector));
    const buttonElement = formElement.querySelector(classObj.submitButtonSelector);
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
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(classObj.inactiveButtonClass);
    }else{
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(classObj.inactiveButtonClass);
    }
  }
  
  function enableValidation({formSelector}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
  }
  
  enableValidation(classObj);