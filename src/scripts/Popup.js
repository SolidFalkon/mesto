export class Popup{
    constructor(popupSelector){
      this._popupSelector = popupSelector;
      this._closeButton = this._popupSelector.querySelector('.popup__close')
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
      window.addEventListener('keydown', (event) =>{
        this._handleEscClose(event);
      })
      this._popupSelector.querySelector('.popup__overlay').addEventListener('click', (evt) =>{
        const popup = evt.currentTarget.closest('.popup')
        if (popup) {
            this.close(); 
        }
      })
      
    }
  
    open() {
      this._popupSelector.classList.add('popup_opened')
      this.setEventListeners()
    }
  
    close(){
      this._popupSelector.classList.remove('popup_opened')
      window.removeEventListener('keydown', (event) =>{
        this._handleEscClose(event);
      })
      this._popupSelector.removeEventListener('click', (evt) =>{
        const popup = evt.currentTarget.closest('.popup')
        if (popup) {
            this.close(); 
        }
      })
    }
  }
  