export default class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }
    
    _checkResponse(res){
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
        .then((res) => { 
            return this._checkResponse(res)
        });
    }
    
    getInitialProfile(){
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        })
        .then((res) => { 
            return this._checkResponse(res)
        });
    }

    patchNewProfile(name, about){
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then((res) => { 
            return this._checkResponse(res)
        });
    }

    patchNewAvatar(link){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then((res) => { 
            return this._checkResponse(res)
        });
    }

    postNewCard(data){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then((res) => { 
            return this._checkResponse(res)
        });
    }

    deleteCard(data){
        return fetch(`${this._url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => { 
            return this._checkResponse(res)
        });
    }

    putLike(data){
        return fetch(`${this._url}/cards/likes/${data._id}`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then((res) => { 
            return this._checkResponse(res)
        });
    }

    deleteLike(data){
        return fetch(`${this._url}/cards/likes/${data._id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => { 
            return this._checkResponse(res)
        });
    }
    // другие методы работы с API
  }
