import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector)
  }

  open(data){
    super.open();
    this._popup.querySelector('.popup-image__image').src = data.link;
    this._popup.querySelector('.popup-image__image').alt = data.name;
    this._popup.querySelector('.popup-image__text').textContent = data.name;
  }
}