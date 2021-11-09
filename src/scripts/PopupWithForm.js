import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor({ popupSelector, handleFormSubmit }){
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._element = popupSelector
    this._form = this._element.querySelector('.input')
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.input__text');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    });
    
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(evt)
    })
  }
}