let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let plusButton = profile.querySelector('.profile__button_action_add');
let editButton = profile.querySelector('.profile__button_action_edit');
let closeButton = document.querySelector('.pop-up__btn_action_deny');
let profileName = profile.querySelector('.profile__name');
let profileProfession = profile.querySelector('.profile__profession');
let saveButton = document.querySelector('.pop-up__btn_action_save');

let popUp = document.querySelector('.pop-up');

let Name = profile.querySelector('.profile__name');
let Profession = profile.querySelector('.profile__profession');

let formElement = popUp.querySelector('.pop-up__input');
let nameInput = formElement.querySelector(".pop-up__text_type_name");
let jobInput = formElement.querySelector(".pop-up__text_type_profession");





function closePopup() {
  popUp.classList.remove('pop-up_type_opened');
}

function openPopup() {
  popUp.classList.add('pop-up_type_opened');
  nameInput.value = Name.textContent;
  jobInput.value = Profession.textContent;
}



// Находим форму в DOM




// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();
                        // Эта строчка отменяет стандартную отправку формы. Эта
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    // Получите значение полей из свойства value
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');
    // Выберите элементы, куда должны быть вставлены значения полей
    nameInput.getAttribute('name');
    jobInput.getAttribute('name');
    // Вставьте новые значения с помощью textContent
    Name.textContent = nameInput.value;
    Profession.textContent = jobInput.value;
    closePopup()
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElement.addEventListener('submit', formSubmitHandler);

closeButton.addEventListener('click', closePopup);

editButton.addEventListener('click', openPopup);