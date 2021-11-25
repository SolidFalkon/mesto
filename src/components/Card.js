export default class Card{
    constructor({data, handleCardClick, handleLikeClick, handleDeleteIconClick}, cardSelector, myId){
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._myId = myId;
        this._idOwner = data.owner._id;
        this._cardId = data._id;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
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
        this._elementBlock.querySelector('.element__number-likes').textContent = this._likes.length;
        this._elementLike = this._elementBlock.querySelector('.element__like');
        if (this._likes.findIndex(item => item._id == this._myId) != -1)
            this._elementLike.classList.toggle('element__like_active');
        this._setListenerElement();
        return this._elementBlock;
    }
    _setListenerElement(){
        if (this._idOwner == this._myId)
            this._elementBlock.querySelector('.element__delete').addEventListener("click", () => {
                this._handleDeleteIconClick(this._elementBlock)});
        else
            this._elementBlock.querySelector('.element__delete').classList.add('element__delete_disabled')
        this._elementBlock.querySelector('.element__like').addEventListener("click", () => {
            this._handleLikeClick(this)});
        this._elementBlock.querySelector('.element__image-button').addEventListener("click", () => {
            this._handleCardClick()});
    }
    updateLikes(likes){
        this._elementLike.classList.toggle('element__like_active');
        this._elementBlock.querySelector('.element__number-likes').textContent = likes;
    }
    isLiked(){   
        if(this._elementLike.classList.contains('element__like_active'))
            return true;
        else
            return false;
    }
}