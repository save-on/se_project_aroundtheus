export default class UserInfo {
  constructor({ name, occupation }) {
    this._name = name;
    this._occupation = occupation;
    this._displayName = document.querySelector(".profile__name");
    this._displayOccupation = document.querySelector(".profile__occupation");
  }

  getUserInfo() {
    // fill in form with user info
    this._name = this._displayName.textContent;
    this._occupation = this._displayOccupation.textContent;
  }

  setUserInfo() {
    // change profile with input values
    this._displayName = this._name;
    this._displayOccupation = this._occupation;
  }
}
