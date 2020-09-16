import Popup from './Popup.js';


export default class PopupWithSubmit extends Popup {

  constructor({popupSelector, closeBtn}) {
    super(popupSelector, closeBtn)
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }


  setEventListeners() {
    const button = this.popupSelector.querySelector('.pop-up__btn_action_save');
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback()
    })
    super.setEventListeners();
  }
}