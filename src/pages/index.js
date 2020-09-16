import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from'../components/PopupWithSubmit.js';



import UserInfo from '../components/UserInfo.js';
import { imageModalImage, imageModalPlace } from '../utils/utils.js';
import Api from '../components/Api.js';
import '../pages/index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: 'bfb56561-5ac4-4046-893e-dcc4ab3eace0',
    'Content-Type': 'application/json'
  }
});

const validationClasses = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__text',
  submitButtonSelector: '.pop-up__btn_action_save',
  inactiveButtonClass: 'pop-up__btn_type_inactive',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'popup__error_visible',
};

const editModal = document.querySelector('.popup_type_edit');
const formElement = editModal.querySelector('.pop-up__input');

const nameInput = document.getElementById("name-input");
const jobInput = document.getElementById("profession-input");

const newCardModal = document.querySelector('.popup_type_new-card');
const addCard = newCardModal.querySelector('.pop-up__input');

const avatarModal = document.querySelector('.popup_type_edit-avatar');
const avatarinput = avatarModal.querySelector('.pop-up__input');

// template 
const userCardTemplate = document.querySelector('.card-template_user');
const cardTemplate = document.querySelector('.card-template');
const cardContainer = document.querySelector('.photo-grid');

//кнопки открытия попапов
const editButton = document.querySelector('.profile__button_action_edit');
const plusButton = document.querySelector('.profile__button_action_add');
const avatarButton = document.querySelector('.profile__avatar-wrapper');

// Валидация форм
const editFormValidation = new FormValidator(validationClasses, formElement);
const addCardFormValidation = new FormValidator(validationClasses, addCard);
const patchAvatarValidation = new FormValidator(validationClasses, avatarinput);

editFormValidation.enableValidation();
addCardFormValidation.enableValidation();
patchAvatarValidation.enableValidation();

// юзер
const name = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');
const avatar = document.querySelector('.profile__avatar');

const user = new UserInfo({
  userName: name,
  userDiscription: profession,
  avatar: avatar
});

// инициализация юзера
api.getUserInfo()
  .then((data) => {
    user.setUserInfo({
      name: data.name,
      about: data.about,
    })
    user.id = data._id;
    user.setAvatar(data.avatar)
  })
  .catch((err) => {
    console.log(err);
  })

// Попап редактирования профиля
const editpopupForm = new PopupWithForm({
  popupSelector: ('.popup_type_edit'),
  closeBtn: ('.pop-up__btn_action_deny'),
  formSubmitHandler: (formData) => {
    user.setUserInfo(formData);
    api.patchUserInfo(formData);
    editpopupForm.close()
  }
});
editButton.addEventListener('click', () => {
  api.getUserInfo()
    .then((data) => {
      nameInput.value = data.name
      jobInput.value = data.about
    })
  editFormValidation.clearAllErrors()
  editFormValidation.enableButton()
  editpopupForm.open();
});
editpopupForm.setEventListeners();

// Попап добавления карточки
const addCardForm = new PopupWithForm({
  popupSelector: ('.popup_type_new-card'),
  closeBtn: ('.pop-up__btn_action_deny'),
  formSubmitHandler: (formData) => {
    api.postCard(formData)
    getsCard(formData, userCardTemplate, user);
    addCardForm.close();
  }
})
plusButton.addEventListener('click', () => {
  addCardFormValidation.clearAllErrors();
  addCardFormValidation.clearAllInputs();
  addCardFormValidation.disableButton();
  addCardForm.open();
});
addCardForm.setEventListeners();

// Попап редактирования аватара
const patchAvatarForm = new PopupWithForm({
  popupSelector: ('.popup_type_edit-avatar'),
  closeBtn: ('.pop-up__btn_action_deny'),
  formSubmitHandler: (formData) => {
    api.patchAvatar(formData)
    patchAvatarForm.close();
  }
});
avatarButton.addEventListener('click', () => {
  patchAvatarValidation.clearAllErrors();
  patchAvatarValidation.enableButton();
  patchAvatarForm.open();
})
patchAvatarForm.setEventListeners();

// попап открытия изображения

const imagePopup = new PopupWithImage({
  popupSelector: ('.popup_type_image'),
  closeBtn: ('.pop-up__btn_action_deny')
},
  imageModalImage,
  imageModalPlace,
);
imagePopup.setEventListeners();

//Попап подтверждения удаления

const deleteCardSubmit = new PopupWithSubmit({
  popupSelector: ('.popup_type_delete-card'),
  closeBtn: ('.pop-up__btn_action_deny')
});

deleteCardSubmit.setEventListeners();

// рендер карточек
const cardList = new Section({
  items: {},
  renderer: (data) => {
    getsCard(data)
  }
},
  cardContainer
);

api.getInitialCards()
  .then((result) => {
    const cardList = new Section({
      items: result,
      renderer: (data) => {
        if (data.owner._id === user.id) {
          getsCard(data, userCardTemplate, user)
        } else if (data.owner._id !== user.id) {
          getsCard(data, cardTemplate)
        }
      }
    },
      cardContainer
    );
    cardList.renderItems();
    return result
  })

function getsCard(data, template, user) {
  const card = new Card({
    data,

    handleCardClick: () => {
      imagePopup.open(data);
    },

    handleDeleteCard: (id) => {
      deleteCardSubmit.setSubmitAction(_ => {
        api.deleteCard(id)
        card.remove()
        deleteCardSubmit.close()
      })
      deleteCardSubmit.open()
    },

    handleLikeClick: (id) => {
      api.putLike(id).then(res => {
        card.updateLikeCount(res)
      })
    },
    handleDislikeLikeClick: (id) => {
      api.removeLike(id).then(res => {
        card.updateLikeCount(res)
      })
    },

    api,
  }, template)
  if (user) {
    const userCard = card.getCard(user);
    cardList.setItem(userCard);
  } else {
    const cardElement = card.getCard();
    cardList.setItem(cardElement);
  }
}