class Card {
  constructor({ data, handleCardClick }, thisTemplate) {
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

  _getTemplate() {
    const cardElement = this._thisTemplate
      .content.children[0]
      .cloneNode(true);
    return cardElement;
  }


  getCard() {
    this._element = this._getTemplate()
    const image = this._element.querySelector('.photo-grid__image');
    this._element.querySelector('.photo-grid__place').textContent = this._name;
    image.src = this._link;
    image.alt = `изображение ${this._name}`;
    this._element.querySelector('.photo-grid__like-button').addEventListener('click', (evt) => {
      this._like(evt)
    });
    this._element.querySelector('.photo-grid__trash-button').addEventListener('click', () => {
      this._remove()
    });
    this._element.querySelector('.photo-grid__image-button').addEventListener('click', this.handleCardClick)
    return this._element;
  }
}

export default Card;