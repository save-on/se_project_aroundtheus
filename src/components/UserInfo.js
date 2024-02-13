export default class UserInfo {
  constructor(nameSelector, occupationSelector) {
    this._displayName = document.querySelector(nameSelector);
    this._displayOccupation = document.querySelector(occupationSelector);
  }

  getUserInfo() {
    this._inputOccupation = document.querySelector(
      ".modal__input_type_occupation"
    );
    this._inputName = document.querySelector(".modal__input_type_name");

    this._inputName.value = this._displayName.textContent;
    this._inputOccupation.value = this._displayOccupation.textContent;
  }

  setUserInfo({ name, occupation }) {
    this._name = name;
    this._occupation = occupation;

    this._displayName.textContent = this._name;
    this._displayOccupation.textContent = this._occupation;
  }
}
