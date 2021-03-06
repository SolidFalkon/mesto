export class Section{
    constructor({ items, renderer }, container){
      this._initialCards = items;
      this._renderer = renderer;
      this._container = container;
    }
  
    renderItems() {
      this._initialCards.forEach(item => this._renderer(item));
    } 
  
    addItemAppend = (element) => {
      this._container.append(element)
    }
  
    addItemPrepend = (element) => {
      this._container.prepend(element)
    }
  
  }