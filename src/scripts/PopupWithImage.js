import { Popup } from "./Popup.js";

const popupImage = document.querySelector('.popup-image')
const popupImageCard = popupImage.querySelector('.popup-image__image')
const popupImageTitle = popupImage.querySelector('.popup-image__text')

export class PopupWithImage extends Popup{
  constructor(data,popupSelector){
    super(popupSelector)
    this._name = data.name;
    this._link = data.link;
  }

  open(){
    this.setEventListeners()
    this._popupSelector.classList.add('popup_opened')
    popupImageCard.src = this._link;
    popupImageCard.alt = this._name;
    popupImageTitle.textContent = this._name;
  }
}