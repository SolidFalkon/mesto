import Card from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js'
import { popupProfile, popupElement, popupImage, editButton, profileName,
   profileProfession, inputName, inputProfession, inputNameImg,
   inputImg, elementsBlock, addButton, config, initialCards} from '../utils/constants.js';
//Импорты вебпака
import "../pages/index.css";

const openPopupImage = new PopupWithImage(popupImage)
openPopupImage.setEventListeners();

function createCard(item){
  console.log(item);
  const card = new Card({
    data: item,
    handleCardClick: () =>{
      openPopupImage.open(item)
    }
  },
  '#element');
  const cardElement = card.createCard();
  return cardElement;
}

const onEditClick = () => {
  const getUserInfo = userInform.getUserInfo();
  inputName.value = getUserInfo.userName;
  inputProfession.value = getUserInfo.userJob;
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
openEditPopap.setEventListeners();

const openAddPopup =  new PopupWithForm({
  popupSelector: popupElement,
  handleFormSubmit: (event) => {
    submitAddCardForm(event)
  }
}) 
openAddPopup.setEventListeners();

//валидация формы фото
const formAddImg = new FormValidator(config, '.input_element');
formAddImg.enableValidation();

//валидация формы профиля
const formEditProfile = new FormValidator(config, '.input_profile');
formEditProfile.enableValidation();

const userInform = new UserInfo({
  nameSelector: profileName,
  professionSelector: profileProfession,
})

const saveProfile = (inputs) => {
    userInform.setUserInfo(inputs.name, inputs.profession)
    openEditPopap.close()
}

const submitAddCardForm = (inputs) => {
  const element = createCard(inputs)
  openAddPopup.close()
  elementsBlock.prepend(element);
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