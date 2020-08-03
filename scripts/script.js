const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// модальные окна
const editModal = document.querySelector('.popup_type_edit');
const newCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const overlay = document.querySelectorAll('.pop-up');

//кнопки открытия модальных окон
const editButton = document.querySelector('.profile__button_action_edit');
const plusButton = document.querySelector('.profile__button_action_add');

//кнопки закрытия модальных окон
const editModalCloseBtn = editModal.querySelector('.pop-up__btn_action_deny');
const newCardModalCloseBtn = newCardModal.querySelector('.pop-up__btn_action_deny');
const imageModalCloseBtn = imageModal.querySelector('.pop-up__btn_action_deny');

// формы

const formElement = editModal.querySelector('.pop-up__input');
const nameInput = formElement.querySelector('.pop-up__text_type_name');
const jobInput = formElement.querySelector('.pop-up__text_type_profession');
const addCard = newCardModal.querySelector('.pop-up__input');
const placeInput = addCard.querySelector('.pop-up__text_type_place');
const urlInput = addCard.querySelector('.pop-up__text_type_link');

// значения третьего модального
const imageModalImage = imageModal.querySelector('.pop-up__image');
const imageModalPlace = imageModal.querySelector('.pop-up__image-name');

const newCardsaveButton = newCardModal.querySelector('.pop-up__btn_action_save');
const name = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');

// template 
const elementTemplate = document.querySelector('.card-template').content.querySelector('.photo-grid__item');
const grid = document.querySelector('.photo-grid');

// функции открытия и закрытия модального окна

function escClose(evt) {
  if (evt.key === 'Escape') {
    if (overlay[0].classList.contains('pop-up_type_opened')) {
      closeModal(overlay[0]);
    } else if (overlay[1].classList.contains('pop-up_type_opened')) {
      closeModal(overlay[1]);
    } else if (overlay[2].classList.contains('pop-up_type_opened')) {
      closeModal(overlay[2]);
    }
  }
}

function openModal(modal) {
  modal.classList.add('pop-up_type_opened');
  document.body.addEventListener('keydown', escClose);
}

function closeModal(modal) {
  if (modal.classList.contains('pop-up_type_opened')) {
    modal.classList.remove('pop-up_type_opened');
    document.body.removeEventListener('keydown', escClose);
  }
}

function profieEdit() {
  nameInput.value = name.textContent;
  jobInput.value = profession.textContent;
  openModal(editModal);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  profession.textContent = jobInput.value;
  closeModal(editModal);
}

function addCardHandler(evt) {
  evt.preventDefault();
  renderCard({
    name: placeInput.value,
    link: urlInput.value
  });
  closeModal(newCardModal);
  placeInput.value = '';
  urlInput.value = '';
  inactiveButtonState(newCardsaveButton);
}

//функция лайка карточки
function likeClick(button) {
  button.classList.toggle('photo-grid__like-button_type_active');
}

// закрытие по оверлей
function closeOverlay(evt) {
  if (evt.target.classList.contains('pop-up_type_opened')) {
    closeModal(evt.target);
  }
}

overlay.forEach((everyOverlay) => {
  everyOverlay.addEventListener('click', closeOverlay);
});

formElement.addEventListener('submit', formSubmitHandler);
addCard.addEventListener('submit', addCardHandler);

// слушатели открытия модальных окон
editButton.addEventListener('click', profieEdit);

plusButton.addEventListener('click', () => {
  openModal(newCardModal)
  placeInput.value = '';
  urlInput.value = '';
});

// слушатели закрытия модальных окон
editModalCloseBtn.addEventListener('click', () => {
  closeModal(editModal);

});
newCardModalCloseBtn.addEventListener('click', () => {
  closeModal(newCardModal);

});
imageModalCloseBtn.addEventListener('click', () => {
  closeModal(imageModal)
});

function createCard(data) {
  const cardElement = elementTemplate.cloneNode(true);
  const image = cardElement.querySelector('.photo-grid__image');
  const place = cardElement.querySelector('.photo-grid__place');
  const likeButton = cardElement.querySelector('.photo-grid__like-button');
  const deleteButton = cardElement.querySelector('.photo-grid__trash-button');
  const imageButton = cardElement.querySelector('.photo-grid__image-button');
  image.src = data.link;
  place.textContent = data.name;
  image.alt = `изображение ${data.name}`;
  likeButton.addEventListener('click', () => {
    likeClick(likeButton);
  });
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  })
  imageButton.addEventListener('click', () => {
    imageModalImage.src = image.src;
    imageModalPlace.textContent = place.textContent;
    imageModalImage.alt = `изображение ${place.textContent}`;
    openModal(imageModal);
  });
  return cardElement;
}

function renderCard(data) {
  grid.prepend(createCard(data));
}

initialCards.forEach((data) => {
  renderCard(data);
});