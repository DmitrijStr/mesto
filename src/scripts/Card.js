import Popup from './Popup.js';

class Card extends Popup {
  constructor({ data, handleCardClick }, thisTemplate) {
    super()
    this._name = data.name;
    this._link = data.link;
    this._thisTemplate = thisTemplate;
    this.handleCardClick = handleCardClick;
  }

  _remove() {
    this._element.remove();
    this._element = null;
  }

  _like(evt) {
    evt.target.classList.toggle('photo-grid__like-button_type_active');
  }

  getCard() {
    const elementTemplate = this._thisTemplate.content.children[0];
    this._element = elementTemplate.cloneNode(true);
    this._element.querySelector('.photo-grid__place').textContent = this._name;
    this._element.querySelector('.photo-grid__image').src = this._link;
    this._element.querySelector('.photo-grid__image').alt = `изображение ${this._name}`;
    this._element.querySelector('.photo-grid__like-button').addEventListener('click', (evt) => {
      this._like(evt)
    });
    this._element.querySelector('.photo-grid__trash-button').addEventListener('click', () => {
      this._remove()
    });
    this._element.querySelector('.photo-grid__image-button').addEventListener('click', this.handleCardClick)
    return this._element;
  }

  open() {
    super.open()
  }
}

export default Card;