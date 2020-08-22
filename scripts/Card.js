const grid = document.querySelector('.photo-grid');

function openModal(modal) {
  modal.classList.add('pop-up_type_opened');
  document.body.addEventListener('keydown', escClose);
}

function escClose(evt) {
  const activeModal = document.body.querySelector('.pop-up_type_opened');
  if (evt.key === 'Escape') {
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

function closeModal(modal) {
  modal.classList.remove('pop-up_type_opened');
  document.body.removeEventListener('keydown', escClose);
  if (!modal.classList.contains('popup_type_image')) {
    // resetForm(modal)
  }
}

const imageModal = document.querySelector('.popup_type_image');
const imageModalImage = imageModal.querySelector('.pop-up__image');
const imageModalPlace = imageModal.querySelector('.pop-up__image-name');

class Card {
  constructor(name, link, thisTemplate) {
    this._name = name;
    this._link = link;
    this._thisTemplate = thisTemplate;
  }

  _remove = () => {
    this._element.remove();
  }

  _like = (evt) => {
    evt.target.classList.toggle('photo-grid__like-button_type_active');
  }

  _imageOpen = () => {
    imageModalImage.src = this._element.querySelector('.photo-grid__image').src;
    imageModalPlace.textContent = this._element.querySelector('.photo-grid__place').textContent;
    imageModalImage.alt = `изображение ${place.textContent}`;
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
    this._element.querySelector('.photo-grid__image-button').addEventListener('click', this._imageOpen);
    return this._element;
  }
}

export default Card;