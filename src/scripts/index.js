import Card from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js'
//Импорты вебпака
import "../pages/index.css";

const main = document.querySelector('.main');
const popupProfile = main.querySelector('.profile-popup');
const popupElement = main.querySelector('.element-popup');
const popupImage = main.querySelector('.popup-image');
const editButton = main.querySelector('.profile__edit-button');
const profileName = main.querySelector('.profile__name');
const profileProfession = main.querySelector('.profile__profession');
const inputNameImg = main.querySelector('.input__text_type_nameImg');
const inputImg = main.querySelector('.input__text_type_img');
const elementsBlock = document.querySelector('.elements');
const addButton = main.querySelector('.profile__add-button');
const config = {
  inputSelector: '.input__text',
  submitButtonSelector: '.input__save-btn',
  inactiveButtonClass: 'input__save-btn_disabled',
  inputErrorClass: 'input__text_type_error',
}

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

function createCard(item){
  const card = new Card({
    data: item,
    handleFormSubmit: (event) =>{
      const openPopupImage = new PopupWithImage(item, popupImage)
      openPopupImage.open(event)
    }
  },
  '#element');
  const cardElement = card.createCard();
  return cardElement;
}

const onEditClick = () => {
  userInform.getUserInfo();
  openEditPopap.open();
}

const onAddClick = () => {
  openAddPopup.open()
}


const openEditPopap =  new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (event) => {
    saveProfile(event)
  }
}) 

const openAddPopup =  new PopupWithForm({
  popupSelector: popupElement,
  handleFormSubmit: (event) => {
    submitAddCardForm(event)
  }
}) 

//валидация формы фото
const formAddImg = new FormValidator(config, '.input_element');
formAddImg.enableValidation();

//валидация формы профиля
const formEditProfile = new FormValidator(config, '.input_profile');
formEditProfile.enableValidation();

const userInform = new UserInfo({
  name: profileName,
  profession: profileProfession,
})

const saveProfile = (evt) => {
    evt.preventDefault();
    userInform.setUserInfo()
    openEditPopap.close()
}

const submitAddCardForm = (evt) => {
  evt.preventDefault();
  const card = 
  {
      name: inputNameImg.value,
      link: inputImg.value
  }
  const element = createCard(card)
  openAddPopup.close()
  elementsBlock.prepend(element);
  inputNameImg.value = '';
  inputImg.value = '';
}

const cardsList = new Section({
  items: initialCards,
  renderer:(item) => {
    const element = createCard(item) 
    cardsList.addItem(element)
  }
},
elementsBlock
);

editButton.addEventListener('click', onEditClick)

addButton.addEventListener ('click', onAddClick)

cardsList.renderItems();