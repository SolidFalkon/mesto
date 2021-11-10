export class FormValidator {
    constructor (config, formSelector) {
        this._formElement = document.querySelector(formSelector);
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._button = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _showError = (errorElement, inputElement) => {
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass)
    }
  
    _hideError = (errorElement, inputElement) => {
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputErrorClass)
    }
  
    _checkInputValidity = (inputElement) => {
  
        inputElement.setCustomValidity("");
        const isInputNotValid = !inputElement.validity.valid;
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        
        inputElement.setCustomValidity("");
    
        if(isInputNotValid) {
            this._showError(errorElement, inputElement);
        } else {
            this._hideError(errorElement, inputElement);
        }
    }
  
    resetValidation() {
        this._toggleButtonState(this._inputList);
        this._inputList.forEach((inputElement) => {
          const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
          this._hideError(errorElement, inputElement)
        });
    }

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        }); 
    }
  
    _toggleButtonState = () => {
        if(this._hasInvalidInput()){
            this._button.classList.add(this._inactiveButtonClass);
            this._button.disabled = 'disabled';
        } else {
            this._button.classList.remove(this._inactiveButtonClass);
            this._button.disabled = false;
        }
    }
  
  
    _setEventListers = () => {
        this._toggleButtonState()
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState()
            })
        }) 
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
    };
  
    enableValidation = () => {        
        this._setEventListers() 
    };
}