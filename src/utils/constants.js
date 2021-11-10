const main = document.querySelector('.main');
export const popupProfile = '.profile-popup';
export const popupElement = '.element-popup';
export const popupImage = '.popup-image';
export const editButton = main.querySelector('.profile__edit-button');
export const profileName = '.profile__name';
export const profileProfession = '.profile__profession';
export const inputName = main.querySelector ('.input__text_type_name') 
export const inputProfession = main.querySelector ('.input__text_type_profession')
export const inputNameImg = main.querySelector('.input__text_type_nameImg');
export const inputImg = main.querySelector('.input__text_type_img');
export const elementsBlock = document.querySelector('.elements');
export const addButton = main.querySelector('.profile__add-button');
export const config = {
  inputSelector: '.input__text',
  submitButtonSelector: '.input__save-btn',
  inactiveButtonClass: 'input__save-btn_disabled',
  inputErrorClass: 'input__text_type_error',
}

export const initialCards = [
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