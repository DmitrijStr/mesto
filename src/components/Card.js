export default class Card {
  constructor({ data, handleCardClick, handleDeleteCard, handleLikeClick, handleDislikeLikeClick, currentUser}, thisTemplate) {
    this._name = data.name;
    this._link = data.link;
    this.handleCardClick = handleCardClick;
    this.handleDeleteCard = handleDeleteCard;
    this.handleLikeClick = handleLikeClick;
    this.handleDislikeLikeClick = handleDislikeLikeClick;
    this._thisTemplate = thisTemplate;
    this._likes = data.likes;
    this._cardId = data._id;
    this._currentUser = currentUser;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  updateLikeCount(res) {
    this._element.querySelector('.photo-grid__likes-count').textContent = res;
  }

  _getTemplate() {
    const cardElement = this._thisTemplate
      .content.children[0]
      .cloneNode(true);
    return cardElement;
  }

  toggleLike(evt) {
    if (evt.target.classList.contains('photo-grid__like-button_type_active')) {
      evt.target.classList.remove('photo-grid__like-button_type_active');
      this.handleDislikeLikeClick(this._cardId)
    } else {
      evt.target.classList.add('photo-grid__like-button_type_active')
      this.handleLikeClick(this._cardId)
    }
  }



  getCard(owner) {
    this._element = this._getTemplate()
    const image = this._element.querySelector('.photo-grid__image');
    this._element.querySelector('.photo-grid__place').textContent = this._name;
    image.src = this._link;
    image.alt = `изображение ${this._name}`;
    if (!owner) {
      this._element.querySelector('.photo-grid__likes-count').textContent = this._likes.length;

      if (this._likes.some((user) => user._id === this._currentUser)) {
        this._element.querySelector('.photo-grid__like-button').classList.add('photo-grid__like-button_type_active');
      }
    }
    this._element.querySelector('.photo-grid__like-button').addEventListener('click', (evt) => {
      this.toggleLike(evt)
    });
    this._element.querySelector('.photo-grid__image-button').addEventListener('click', this.handleCardClick);
    if (owner) {
      this._element.querySelector('.photo-grid__trash-button').addEventListener('click', () => {
        this.handleDeleteCard(this._cardId)
      });
    }
    return this._element;
  }
}