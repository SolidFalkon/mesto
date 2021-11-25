export class UserInfo{
  constructor({nameSelector, professionSelector, avatarSelector}){
    this._name =  document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo(){
    const userName =  this._name.textContent;
    const userJob =  this._profession.textContent;
    const userAvatar = this._avatar.src;
    const userData = {userName, userJob, userAvatar}
    return userData
  }

  setUserInfo( name, job ){
    this._name.textContent = name;
    this._profession.textContent = job;
  }

  setUserAvatar(avatar){
    this._avatar.src = avatar;
  }

}