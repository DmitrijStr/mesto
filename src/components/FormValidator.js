class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
    }
    _showInputError(inputElement, errorMessage) {
        this._inputElement = inputElement;
        this._errorMessage = errorMessage;
        const errorElement = this._formElement.querySelector(`#${this._inputElement.id}-error`);
        this._inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }

    _hideInputError(inputElement) {
        this._inputElement = inputElement;
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        this._inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';

    }
    _addInactiveButtonState(buttonElement) {
        this._buttonElement = buttonElement;
        this._buttonElement.setAttribute('disabled', true)
        this._buttonElement.classList.add(this._config.inactiveButtonClass);

    }

    _removeInactiveButtonState(buttonElement) {
        this._buttonElement = buttonElement;
        this._buttonElement.removeAttribute('disabled');
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);

    }

    _checkInputValidity(inputElement) {
        this._inputElement = inputElement;
        if (!this._inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setSubmitButtonState(inputList, buttonElement) {
        this._inputList = inputList;
        this.buttonElement = buttonElement;
        if (this._hasInvalidInput(this._inputList)) {
            this._addInactiveButtonState(this.buttonElement);
        } else {
            this._removeInactiveButtonState(this.buttonElement);
        }
    }

    _hasInvalidInput(inputList) {
        this._inputList = inputList;
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._setSubmitButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._setSubmitButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._config.formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners();
        });
    }

    clearAllErrors() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
            inputElement.value = null;
        })
    }

    clearAllInputs() {
        this._formElement.reset()
    }

    disableButton() {
        const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._addInactiveButtonState(buttonElement);
    }
}

export default FormValidator;