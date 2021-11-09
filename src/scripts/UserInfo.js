const popupEdit = document.querySelector('.input_profile')
const popupFormName = popupEdit.querySelector ('.input__text_type_name') 
const popupFormProfession = popupEdit.querySelector ('.input__text_type_profession')

export class UserInfo{
  constructor({name, profession}){
    this._name = name;
    this._profession = profession;
  }

  getUserInfo(){
    popupFormName.value = this._name.textContent
    popupFormProfession.profession = this._profession.textContent
  }

  setUserInfo(){
    this._name.textContent = popupFormName.value
    this._profession.textContent = popupFormProfession.value
  }

}