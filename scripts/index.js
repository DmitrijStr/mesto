import FormValidator from './FormValidator.js';
import Card from './Card.js';

const validationClasses = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__text',
  submitButtonSelector: '.pop-up__btn_action_save',
  inactiveButtonClass: 'pop-up__btn_type_inactive',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'popup__error_visible',
}

const editModal = document.querySelector('.popup_type_edit');
const newCardModal = document.querySelector('.popup_type_new-card');

const formElement = editModal.querySelector('.pop-up__input');
const addCard = newCardModal.querySelector('.pop-up__input');

const editFormValidation = new FormValidator(validationClasses, formElement)
const addCardFormValidation = new FormValidator(validationClasses, addCard)

editFormValidation.enableValidation();
addCardFormValidation.enableValidation();

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
// template 
const cardTemplate = document.querySelector('.card-template');
const grid = document.querySelector('.photo-grid');

initialCards.forEach(data => {
  const item = new Card(data.name, data.link, cardTemplate)
  grid.prepend(item.getCard())
})

function addCardHandler(evt) {
  evt.preventDefault();
  const item = new Card(placeInput.value, urlInput.value, cardTemplate)
  grid.prepend(item.getCard())
  closeModal(newCardModal);
  placeInput.value = '';
  urlInput.value = '';
  newCardsaveButton.setAttribute('disabled', true);
  newCardsaveButton.classList.add(validationClasses.inactiveButtonClass);

}

// модальные окна
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
const nameInput = formElement.querySelector('.pop-up__text_type_name');
const jobInput = formElement.querySelector('.pop-up__text_type_profession');
const placeInput = addCard.querySelector('.pop-up__text_type_place');
const urlInput = addCard.querySelector('.pop-up__text_type_link');

const newCardsaveButton = newCardModal.querySelector('.pop-up__btn_action_save');
const name = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');

// функции открытия и закрытия модального окна
function escClose(evt) {
  const activeModal = document.body.querySelector('.pop-up_type_opened');
  if (evt.key === 'Escape') {
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add('pop-up_type_opened');
  document.body.addEventListener('keydown', escClose);
}

function closeModal(modal) {
  modal.classList.remove('pop-up_type_opened');
  document.body.removeEventListener('keydown', escClose);
  if (!modal.classList.contains('popup_type_image')) {
    // resetForm(modal)
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

// function resetForm(modal) {
//   const form = modal.querySelector(validationClasses.formSelector);
//   const inputList = Array.from(form.querySelectorAll(validationClasses.inputSelector));
//   const buttonElement = formElement.querySelector(validationClasses.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//     hideInputError(form, inputElement);
//   })
//   if (modal.classList.contains('popup_type_edit')) {
//     removeInactiveButtonState(buttonElement);
//   }
// }
