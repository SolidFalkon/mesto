import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._submitConfirmationBind = this._submitConfirmation.bind(this)
    }
  
    setSubmitAction(action) {
        this._onSubmitAction = action;
    }
    
    _submitConfirmation(evt){
        evt.preventDefault();
        this._onSubmitAction();
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup-confirm__confirm-btn').addEventListener("click", this._submitConfirmationBind);
    }
    
    close(){
        super.close()
        this._popup.querySelector('.popup-confirm__confirm-btn').removeEventListener("submit", this._submitConfirmationBind);
    }
  
  }