import { imageModal, imageModalImage, imageModalPlace, openModal } from './utils.js'

class Card {
  constructor(name, link, thisTemplate) {
    this._name = name;
    this._link = link;
    this._thisTemplate = thisTemplate;
  }

  _remove = () => {
    this._element.remove();
    this._element = null;
  }

  _like = (evt) => {
    evt.target.classList.toggle('photo-grid__like-button_type_active');
  }

  _imageOpen = (link, name) => {
    link.src = this._link
    name.textContent = this._name
    link.alt = `изображение ${this._name}`;
    openModal(imageModal);
  }

  getCard() {
    const elementTemplate = this._thisTemplate.content.children[0];
    this._element = elementTemplate.cloneNode(true);
    this._element.querySelector('.photo-grid__place').textContent = this._name;
    this._element.querySelector('.photo-grid__image').src = this._link;
    this._element.querySelector('.photo-grid__image').alt = `изображение ${this._name}`;
    this._element.querySelector('.photo-grid__like-button').addEventListener('click', this._like);
    this._element.querySelector('.photo-grid__trash-button').addEventListener('click', this._remove);
    this._element.querySelector('.photo-grid__image-button').addEventListener('click', () => {
      this._imageOpen(imageModalImage, imageModalPlace);
    });
    return this._element;
  }
}

export default Card;