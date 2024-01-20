export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _setEventListener() {}
  _handleLikeBtn() {}
  _handleDeleteBtn() {}
  _getCardTemplate() {}
  generateCard() {}
}
