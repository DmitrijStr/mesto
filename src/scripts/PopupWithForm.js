import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor({ popupSelector, formSubmitHandler }) {
		super(popupSelector)
		this._formSubmitHandler = formSubmitHandler;
	}


	_getInputValues() {
		const form = this.popupSelector.querySelector('.pop-up__form');
		this._inputList = form.querySelectorAll('.pop-up__text')
		this._formValues = {};
		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	setEventListeners() {
		const form = this.popupSelector.querySelector('.pop-up__form');
		form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._formSubmitHandler(this._getInputValues())
		});
		super.setEventListeners();
	}

	close() {


		super.close();
	}
}