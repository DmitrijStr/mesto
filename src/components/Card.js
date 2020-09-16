export default class Card {
  constructor({ data, handleCardClick, handleDeleteCard, handleLikeClick, handleDislikeLikeClick, api, }, thisTemplate) {
    this._name = data.name;
    this._link = data.link;
    this.handleCardClick = handleCardClick;
    this.handleDeleteCard = handleDeleteCard;
    this.handleLikeClick = handleLikeClick;
    this.handleDislikeLikeClick = handleDislikeLikeClick;
    this._thisTemplate = thisTemplate;
    this._likes = data.likes;
    this._id = data._id;
    this._api = api;
    // this._currentUser = currentUser;
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

  like() {

  }

  toggleLike(evt) {
    if (evt.target.classList.contains('photo-grid__like-button_type_active')) {
      evt.target.classList.remove('photo-grid__like-button_type_active');
      this.handleDislikeLikeClick(this._id)
    } else {
      evt.target.classList.add('photo-grid__like-button_type_active')
      this.handleLikeClick(this._id)
    }
  }



  getCard(user) {
    this._element = this._getTemplate()
    const image = this._element.querySelector('.photo-grid__image');
    this._element.querySelector('.photo-grid__place').textContent = this._name;
    image.src = this._link;
    image.alt = `изображение ${this._name}`;
    if (!user) {
      this._element.querySelector('.photo-grid__likes-count').textContent = this._likes.length;

      if (this._likes.some((user) => user._id === "4fbbd5f7c407169b2df74f1f")) {
        this._element.querySelector('.photo-grid__like-button').classList.add('photo-grid__like-button_type_active');
      }


    }
    this._element.querySelector('.photo-grid__like-button').addEventListener('click', (evt) => {
      this.toggleLike(evt)
    });


    this._element.querySelector('.photo-grid__image-button').addEventListener('click', this.handleCardClick);

    if (user) {
      this._element.querySelector('.photo-grid__trash-button').addEventListener('click', () => {
        this.handleDeleteCard(this._id)
      });
    }
    return this._element;
  }
}