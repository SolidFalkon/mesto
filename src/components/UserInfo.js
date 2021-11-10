export class UserInfo{
  constructor({nameSelector, professionSelector}){
    this._name =  document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
  }

  getUserInfo(){
    const userName =  this._name.textContent;
    const userJob =  this._profession.textContent;
    const userData = {userName, userJob}
    return userData
  }

  setUserInfo( name, job ){
    this._name.textContent = name;
    this._profession.textContent = job;
  }

}