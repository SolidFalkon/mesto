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

api.getInitialProfile().then(data => {
  userInform.setUserInfo(data.name, data.about)
  userInform.setUserAvatar(data.avatar)
  myId = data._id;
})
.catch((err) => {
  console.log(err);
});

api.getInitialCards().then(data => {
    cardsList = new Section({
      items: data,
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
    
    handleLikeClick: (card) =>{
      const likeButoon = card.querySelector('.element__like')
      likeButoon.classList.toggle('element__like_active');
      if(likeButoon.classList.contains('element__like_active'))
        api.putLike(item).then(data => {
          card.querySelector('.element__number-likes').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
      else 
        api.deleteLike(item).then(data => {
          card.querySelector('.element__number-likes').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteIconClick: (card) =>{
      popupWithSubmit.open();
      popupWithSubmit.setEventListeners();
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

const openEditPopap =  new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (event) => {
    saveProfile(event)
  }
}) 
openEditPopap.setEventListeners();

const openFormEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatar,
  handleFormSubmit: (event) => {
    saveAvatar(event)
  }
}) 
openFormEditAvatar.setEventListeners();

const popupWithSubmit = new PopupWithSubmit(popupDeleteSubmit);

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

editButton.addEventListener('click', onEditClick)

addButton.addEventListener ('click', onAddClick)

editAvatar.addEventListener ('click', onEditAvatarClick)
