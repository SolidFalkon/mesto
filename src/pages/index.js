import Card from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js'
import { popupProfile, popupElement, popupImage, editButton, editAvatar, profileName,
   profileProfession, inputName, inputProfession, inputNameImg,
   inputImg, elementsBlock, addButton, popupDeleteSubmit, popupEditAvatar, config} from '../utils/constants.js';
import Api from '../components/Api.js';
   //Импорты вебпака
import "../pages/index.css";
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';

const openPopupImage = new PopupWithImage(popupImage)
openPopupImage.setEventListeners();

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: '0839fc91-5c24-4c8c-bd73-be06bd5275c1',
    'Content-Type': 'application/json'
  }
});

let myId;
let cardsList;

Promise.all([api.getInitialProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInform.setUserInfo(userData.name, userData.about)
    userInform.setUserAvatar(userData.avatar)
    myId = userData._id;
    cardsList = new Section({
      items: cards,
      renderer:(item) => {
        const element = createCard(item) 
        cardsList.addItemAppend(element)
      }
    },
    elementsBlock,
    myId
    );
    cardsList.renderItems();
  })
.catch((err) => {
  console.log(err);
});

function createCard(item){
  const card = new Card({
    data: item,
    handleCardClick: () =>{
      openPopupImage.open(item)
    },
    
    handleLikeClick: () =>{
      if(!card.isLiked()){
        api.putLike(item).then(data => {
          card.updateLikes(data.likes.length)
        })
        .catch((err) => {
          console.log(err);
        });
      }
      else 
        api.deleteLike(item).then(data => {
          card.updateLikes(data.likes.length)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteIconClick: (card) =>{
      popupWithSubmit.open();
      popupWithSubmit.setSubmitAction(() => {
        api.deleteCard(item)
          .then(() => {
            popupWithSubmit.close();
            card.remove();
            card = null;
          })
          .catch((err) => {
            console.log(err);
          })
      });
    }
  },
  '#element',
  myId);
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

const onEditAvatarClick = () => {
  formEditAvatar.resetValidation();
  openFormEditAvatar.open()
}

//валидация формы фото
const formAddImg = new FormValidator(config, '.input_element');
formAddImg.enableValidation();

//валидация формы профиля
const formEditProfile = new FormValidator(config, '.input_profile');
formEditProfile.enableValidation();

const formEditAvatar = new FormValidator(config, '.input_update-avatar');
formEditAvatar.enableValidation();

const userInform = new UserInfo({
  nameSelector: profileName,
  professionSelector: profileProfession,
  avatarSelector: '.profile__image'
})

const saveAvatar = (inputs) => {
  openFormEditAvatar.toggleLoadingSubmit(true);
  api.patchNewAvatar(inputs.link)
  .then (() =>{ 
    userInform.setUserAvatar(inputs.link);
    openFormEditAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    openFormEditAvatar.toggleLoadingSubmit(false);
  });
}

const saveProfile = (inputs) => {
    openEditPopap.toggleLoadingSubmit(true);
    api.patchNewProfile(inputs.name, inputs.profession)
    .then (() =>{ 
      userInform.setUserInfo(inputs.name, inputs.profession)
      openEditPopap.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      openEditPopap.toggleLoadingSubmit(false);
    });
}

const submitAddCardForm = (inputs) => {
  openAddPopup.toggleLoadingSubmit(true);
  api.postNewCard(inputs).then(data => {
    const element = createCard(data)
    cardsList.addItemPrepend(element)
  })
  .then (() =>{ 
    openAddPopup.close()
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    openAddPopup.toggleLoadingSubmit(false);
  });
}

const openEditPopap =  new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: saveProfile
}) 
openEditPopap.setEventListeners();

const openFormEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatar,
  handleFormSubmit: saveAvatar
}) 
openFormEditAvatar.setEventListeners();

const popupWithSubmit = new PopupWithSubmit(popupDeleteSubmit);
popupWithSubmit.setEventListeners();

const openAddPopup =  new PopupWithForm({
  popupSelector: popupElement,
  handleFormSubmit: submitAddCardForm
}) 
openAddPopup.setEventListeners();

editButton.addEventListener('click', onEditClick)

addButton.addEventListener ('click', onAddClick)

editAvatar.addEventListener ('click', onEditAvatarClick)
