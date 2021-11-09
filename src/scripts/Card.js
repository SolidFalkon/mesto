export default class Card{
    constructor({data, handleFormSubmit}, cardSelector){
        this._name = data.name;
        this._link = data.link;
        this._handleFormSubmit = handleFormSubmit;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    createCard() {
        this._elementBlock = this._getTemplate();
        this._elementBlock.querySelector('.element__image').src = this._link;
        this._elementBlock.querySelector('.element__image').alt = this._name;
        this._elementBlock.querySelector('.element__text').textContent = this._name;
        this._setListenerElement();
        return this._elementBlock;
    }
    _setListenerElement(){
        this._elementBlock.querySelector('.element__delete').addEventListener("click", () => {
            this._deleteElement()});
        this._elementBlock.querySelector('.element__like').addEventListener("click", () => {
            this._like()});
        this._elementBlock.querySelector('.element__image-button').addEventListener("click", () => {
            this._handleFormSubmit()});
    }
    _like(){
        const likeButoon = this._elementBlock.querySelector('.element__like')
        likeButoon.classList.toggle('element__like_active');
    }
    
    _deleteElement(){
        this._elementBlock.remove();
        this._elementBlock = null;
    }
}