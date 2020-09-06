import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor({ popupSelector, closeBtn }, popupImage, popupPlace) {
		super(popupSelector, closeBtn)
		this._popupImage = popupImage;
		this._popupPlace = popupPlace;
	}

	open(data) {
		this._data = data;
		this._popupImage.src = this._data.link;
		this._popupPlace.textContent = this._data.name;
		this._popupImage.alt = `изображение ${this._data.name}`;
		super.open()
	}


	setEventListeners() {
		super.setEventListeners();
	}
}