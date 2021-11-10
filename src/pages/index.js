import Card from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js'
import { popupProfile, popupElement, popupImage, editButton, profileName,
   profileProfession, inputName, inputProfession, inputNameImg,
   inputImg, elementsBlock, addButton, config, initialCards} from '../utils/constants.js';
//Импорты вебпака
import "../pages/index.css";

const openPopupImage = new PopupWithImage(popupImage)
openPopupImage.setEventListeners();

function createCard(item){
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
  formAddImg.resetValidation();
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
  cardsList.addItemPrepend(element)
}

const cardsList = new Section({
  items: initialCards,
  renderer:(item) => {
    const element = createCard(item) 
    cardsList.addItemAppend(element)
  }
},
elementsBlock
);

editButton.addEventListener('click', onEditClick)

addButton.addEventListener ('click', onAddClick)

cardsList.renderItems();