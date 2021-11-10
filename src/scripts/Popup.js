export class Popup{
    constructor(popupSelector){
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this)
      this._closeButton = this._popup.querySelector('.popup__close')
    }
   
    _handleEscClose(event){
      if(event.key === 'Escape'){
        this.close()
      }
    }
  
    setEventListeners(){
      this._closeButton.addEventListener('click', () => { 
        this.close() 
      }); 
      this._popup.querySelector('.popup__overlay').addEventListener('click', (evt) =>{
        const popup = evt.currentTarget.closest('.popup')
        if (popup) {
            this.close(); 
        }
      })
      
    }
  
    open() {
      this._popup.classList.add('popup_opened')
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close(){
      this._popup.classList.remove('popup_opened')
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }
  