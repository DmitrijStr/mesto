import Popup from "./Popup.js";
import { imageModalImage, imageModalPlace } from '../utils/utils.js';

export default class PopupWithImage extends Popup {
	constructor({ popupSelector, closeBtn }) {
		super(popupSelector, closeBtn)
	}

	open(data) {
		this._data = data;
		imageModalImage.src = this._data.link;
		imageModalPlace.textContent = this._data.name;
		imageModalImage.alt = `изображение ${this._data.name}`;
		super.open()
	}


	setEventListeners() {
		super.setEventListeners();
	}
}