import { ESC_KEYCODE } from '../utils/utils.js';

export default class Popup {
	constructor(popupSelector, closeBtn) {
		this.popupSelector = document.querySelector(popupSelector);
		this.closeBtn = this.popupSelector.querySelector(closeBtn);
		this._handleEsc = this._handleEsc.bind(this);
	}

	open() {
		this.popupSelector.classList.add('pop-up_type_opened');
		document.body.addEventListener('keydown', this._handleEsc)
	}

	close() {
		this.popupSelector.classList.remove('pop-up_type_opened');
		document.body.removeEventListener('keydown', this._handleEsc)
	}

	_handleEsc(evt) {
		// evt.preventDefault();
		if (evt.which === ESC_KEYCODE) {
			this.close();
		}
	}

	setEventListeners() {
		this.closeBtn.addEventListener('click', () => {
			this.close();
		})

		this.popupSelector.addEventListener('click', this._closeOverlay)
	}

	_closeOverlay(evt) {
		if (evt.target.classList.contains('pop-up_type_opened')) {
			evt.target.classList.remove('pop-up_type_opened');
		}
	}

	renderLoading(isLoading) {
		const saveButton = this.popupSelector.querySelector('.pop-up__btn_action_save')
		if (isLoading) {
			saveButton.textContent = 'Сохранение...';
		} else {
			saveButton.textContent = 'Сохранить';
		}
	}
}


