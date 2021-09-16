let main = document.querySelector('.main');
let popup = main.querySelector('.popup');
let editButton = main.querySelector('.profile__edit-button');
let closeButton = main.querySelector('.popup__cross-button');
let saveButton = main.querySelector('.input__save-btn');
let profileName = main.querySelector('.profile__name');
let profileProfession = main.querySelector('.profile__profession');
let elements = main.querySelector('.elements')

function popupActive() {
    let inputName = main.querySelector('.input__text_type_name');
    let inputProfession = main.querySelector('.input__text_type_profession');
    popup.classList.add('popup_active');
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
}

function popupDisabled(){
    popup.classList.remove('popup_active');
}

function popupSave(){
    let inputName = main.querySelector('.input__text_type_name');
    let inputProfession = main.querySelector('.input__text_type_profession');
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    popup.classList.remove('popup_active');
}

function like(element){
    if (element.classList[0] === 'element__like'){
        if(element.classList[1] === undefined){
            element.classList.add('element__like_active');
        }
        else{
            element.classList.remove('element__like_active');
        }
    }
}

editButton.addEventListener('click',popupActive);
closeButton.addEventListener('click',popupDisabled);
saveButton.addEventListener('click',popupSave);
elements.addEventListener("click", event => like(event.target));