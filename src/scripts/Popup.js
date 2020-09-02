import { popupCloseButton, ESC_KEYCODE } from './utils.js';

export default class Popup {
	constructor(popupSelector) {
		this.popupSelector = document.querySelector(popupSelector);
	}
	open() {
		this.popupSelector.classList.add('pop-up_type_opened');
		document.body.addEventListener('keydown', (evt) => {
			this._handleEsc(evt);
		});
	}

	close() {
		this.popupSelector.classList.remove('pop-up_type_opened');
		document.body.removeEventListener('keydown', (evt) => {
			this._handleEsc(evt);
		});
	}

	_handleEsc(evt) {
		// evt.preventDefault();
		if (evt.which === ESC_KEYCODE) {
			this.close();
		}
	}

	setEventListeners() {
		popupCloseButton.forEach((button) => {
			button.addEventListener('click', () => {
				this.close()
			})
		})
		this.popupSelector.addEventListener('click', this._closeOverlay)
	}

	_closeOverlay(evt) {
		if (evt.target.classList.contains('pop-up_type_opened')) {
			evt.target.classList.remove('pop-up_type_opened');
		}
	}
}