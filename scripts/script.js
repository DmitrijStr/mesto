const initialCards = [
  {
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
const firstModal = document.querySelector('.popup_type_edit');
const secondModal = document.querySelector('.popup_type_new-card');
const thirdModal = document.querySelector('.popup_type_image');

//кнопки открытия модальных окон
const editButton = document.querySelector('.profile__button_action_edit');
const plusButton = document.querySelector('.profile__button_action_add');

//кнопки закрытия модальных окон
const firstModalCloseBtn = firstModal.querySelector('.pop-up__btn_action_deny');
const secondModalCloseBtn = secondModal.querySelector('.pop-up__btn_action_deny');
const thirdModalCloseBtn = thirdModal.querySelector('.pop-up__btn_action_deny');


// инпуты форм
const formElement = firstModal.querySelector('.pop-up__input');
const nameInput = formElement.querySelector(".pop-up__text_type_name");
const jobInput = formElement.querySelector(".pop-up__text_type_profession");

const addCard = secondModal.querySelector('.pop-up__input');
const placeInput = addCard.querySelector(".pop-up__text_type_place");
const urlInput = addCard.querySelector(".pop-up__text_type_link");


// значения третьего модального
const thirdModalImage = thirdModal.querySelector('.pop-up__image');
const thirdModalplace = thirdModal.querySelector('.pop-up__image-name');






// функция открытия модального окна
function toggleModalWind(modal) {
  if (!modal.classList.contains('pop-up_type_opened')) {
    Name.textContent = nameInput.value;
    Profession.textContent = jobInput.value;
  }
  modal.classList.toggle('pop-up_type_opened');
};




function formSubmitHandler (evt) {
  evt.preventDefault();
  console.log(nameInput.value)
  Name.textContent = nameInput.value;
  Profession.textContent = jobInput.value;
  toggleModalWind(firstModal);
};

function addCardHandler (evt) {
  evt.preventDefault();
  console.log(placeInput.value)
  renderCard({name: placeInput.value, link: urlInput.value})
  toggleModalWind(secondModal);
};




formElement.addEventListener('submit', formSubmitHandler);
addCard.addEventListener('submit', addCardHandler);

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const saveButton = document.querySelector('.pop-up__btn_action_save');


const Name = document.querySelector('.profile__name');
const Profession = document.querySelector('.profile__profession');



// слушатели открытия модальных окон
editButton.addEventListener('click', () => {
  toggleModalWind(firstModal)
});
plusButton.addEventListener('click', () => {
  toggleModalWind(secondModal)
});

// слушатели закрытия модальных окон
firstModalCloseBtn.addEventListener('click', () => {
  toggleModalWind(firstModal)
});
secondModalCloseBtn.addEventListener('click', () =>{
  toggleModalWind(secondModal)
});
thirdModalCloseBtn.addEventListener('click', () => {
  toggleModalWind(thirdModal)
});

//функция лайка карточки
function likeClick(button) {
  button.classList.toggle('photo-grid__like-button_type_active');
};

//функция открытия изображения
function imageClick() {
  console.log(thirdModalplace.textContent);  
  toggleModalWind(thirdModal);
};

// template 
const elementTemplate = document.querySelector('.card-template').content.querySelector('.photo-grid__item');
const grid = document.querySelector('.photo-grid');

function createCard (data) {
  const cardElement = elementTemplate.cloneNode(true);
  const image = cardElement.querySelector('.photo-grid__image');
  const place = cardElement.querySelector('.photo-grid__place');
  const likeButton = cardElement.querySelector('.photo-grid__like-button');
  const deleteButton = cardElement.querySelector('.photo-grid__trash-button');
  const imageButton = cardElement.querySelector('.photo-grid__image-button');
  
  image.src = data.link;
  place.textContent = data.name;

  likeButton.addEventListener('click', () => {
    likeClick(likeButton);
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove(); 
  })

  imageButton.addEventListener('click', () => {
    thirdModalImage.src = image.src;
    thirdModalplace.textContent = place.textContent;
    imageClick();
  });
  return cardElement;
};

function renderCard(data) {
  grid.prepend(createCard(data));
}

initialCards.forEach((data) => {
  renderCard(data)
})













    //кнопка лайк 
  //    
  //    likeButton.addEventListener('click', function(evt) {
    //  evt.target.classList.toggle('photo-grid__like-button_type_active');
    //  });
    //кнопка открытия модального окна изображения
    //  const imageButton = document.querySelector('.photo-grid__image-button');
    //  imageButton.addEventListener('click', () => toggleModalWind(thirdModal)
    //  );
    //кнопка удаления 
    //  
    //  const item = document.querySelector('.photo-grid__item')
    //  deleteButton.addEventListener('click', function () {
    //    item.remove(); 
    //    })


//const imageButton = content.querySelector('.photo-grid__image-button');











//  for (let i = 0; i < initialCards.length; i++) {
//    const cardElement = elementTemplate.cloneNode(true);
//
//    let arr = initialCards[i]
//   const photogridimage = document.querySelector('.photo-grid');
//    cardElement.querySelector('.photo-grid__image').src = arr.link;
//    cardElement.querySelector('.photo-grid__place').textContent = arr.name;
//    photogridimage.prepend(cardElement);
  
  //кнопка лайк
//    const likeButton = document.querySelector('.photo-grid__like-button');
//    likeButton.addEventListener('click', function(evt) {
//    evt.target.classList.toggle('photo-grid__like-button_type_active');
//    });
  //кнопка открытия модального окна изображения
//    const imageButton = document.querySelector('.photo-grid__image-button');
//    imageButton.addEventListener('click', () => toggleModalWind(thirdModal)
//    );
  //кнопка удаления 
//    const deleteButton = document.querySelector('.photo-grid__trash-button');
//   const item = document.querySelector('.photo-grid__item')
//    deleteButton.addEventListener('click', function () {
//      item.remove();
//      })
//    };