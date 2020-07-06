let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let plusButton = profile.querySelector('.profile__button_action_add');
let editButton = profile.querySelector('.profile__button_action_edit');
let closeButton = content.querySelector('.pop-up__btn_action_deny');
let profileName = profile.querySelector('.profile__name');
let profileProfession = profile.querySelector('.profile__profession');
let saveButton = document.querySelector('.pop-up__btn_action_save');




let popUp = document.querySelector('.pop-up');
let overlay = document.querySelector('.overlay');



saveButton.addEventListener('click', function () {
  formSubmitHandler()
});



editButton.addEventListener('click', function () {
  openPopup()
});




closeButton.addEventListener('click', function () {
  closePopup()
});
overlay.addEventListener('click', function () {
  closePopup()
});


function openPopup() {
  popUp.classList.add('pop-up_type_opened');
  overlay.classList.add('overlay_type_on');
}

function closePopup() {
  popUp.classList.remove('pop-up_type_opened');
  overlay.classList.remove('overlay_type_on');
}


// Находим форму в DOM
let formElement = popUp.querySelector('.pop-up__input');

function formSubmitHandler (evt) {
    let nameInput = formElement.querySelector(".pop-up__text_type_name")
    let jobInput = formElement.querySelector(".pop-up__text_type_profession")

    // Получите значение полей из свойства value
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');
    // Выберите элементы, куда должны быть вставлены значения полей
    let Name = profile.querySelector('.profile__name');
    let Profession = profile.querySelector('.profile__profession');

    
    // Вставьте новые значения с помощью textContent
    Name.textContent = nameInput.value;
    Profession.textContent = jobInput.value;
    closePopup()
}