import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor({ popupSelector, handleFormSubmit }){
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._form = this._popup.querySelector('.input')
    this._submitButton = this._form.querySelector('.input__save-btn')
    this._submitButtonDefault = this._submitButton.textContent
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.input__text');
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
      const inputs = this._getInputValues();
      this._handleFormSubmit(inputs)
    })
  }

  close(){
    super.close()
    this._form.reset();
  }

  toggleLoadingSubmit(isLoading){
    if(isLoading){
      this._submitButton.textContent = 'Сохранение....'
    } else{
      this._submitButton.textContent = this._submitButtonDefault
    }
  }
}