import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import { imageModalImage, imageModalPlace } from './utils.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

import '../pages/index.css';

const validationClasses = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__text',
  submitButtonSelector: '.pop-up__btn_action_save',
  inactiveButtonClass: 'pop-up__btn_type_inactive',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'popup__error_visible',
}

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

const editModal = document.querySelector('.popup_type_edit');
const newCardModal = document.querySelector('.popup_type_new-card');

const formElement = editModal.querySelector('.pop-up__input');
const addCard = newCardModal.querySelector('.pop-up__input');

const editFormValidation = new FormValidator(validationClasses, formElement)
const addCardFormValidation = new FormValidator(validationClasses, addCard)

editFormValidation.enableValidation();
addCardFormValidation.enableValidation();

// юзер

const name = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');

const user = new UserInfo({
  userName: name,
  userDiscription: profession
});

// template 
const cardTemplate = document.querySelector('.card-template');
const grid = document.querySelector('.photo-grid');

// попапы
const editButton = document.querySelector('.profile__button_action_edit');
const plusButton = document.querySelector('.profile__button_action_add');

// Попап открытия профиля
const editpopupForm = new PopupWithForm({
  popupSelector: ('.popup_type_edit'),
  formSubmitHandler: (formData) => {
    user.setUserInfo(formData);
    editpopupForm.close()
  }
});
editButton.addEventListener('click', () => {
  editpopupForm.open();
});
editpopupForm.setEventListeners();

// Попап создания карточки
const addCardForm = new PopupWithForm({
  popupSelector: ('.popup_type_new-card'),
  formSubmitHandler: (formData) => {
    const card = new Card({
      data: formData,
      handleCardClick: () => {
        imageModalImage.src = formData.link;
        imageModalPlace.textContent = formData.place;
        imageModalImage.alt = `изображение ${formData.place}`;
        imagePopup.open()
      }
    }, cardTemplate)
    const cardElement = card.getCard();
    cardList.setItem(cardElement);
    addCardForm.close();
    addCard.reset()
  }
})
plusButton.addEventListener('click', () => {
  addCardForm.open()
});
addCardForm.setEventListeners();

// попап открытия изображения

const imagePopup = new PopupWithImage({
  popupSelector: ('.popup_type_image')
});
imagePopup.setEventListeners();




// рендер карточек
const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card({
      data,
      handleCardClick: () => {
        imageModalImage.src = data.link;
        imageModalPlace.textContent = data.name;
        imageModalImage.alt = `изображение ${data.name}`;
        imagePopup.open()
      }
    }, cardTemplate)
    const cardElement = card.getCard();
    cardList.setItem(cardElement);
  }
},
  grid
);

cardList.renderItems();