export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDelete, handleLike) {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
  }

  _setEventListener() {
    this._cardLikeBtn = this._cardElement.querySelector(".card__group");
    this._cardTrashBtn = this._cardElement.querySelector(".card__trash-bin");
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardLikeBtn.addEventListener("click", () => {
      this._handleLike({ isLiked: this._isLiked, id: this._id }, this);
    });
    this._cardTrashBtn.addEventListener("click", () => {
      this._handleDelete(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _renderLikes() {
    if (this._isLiked) {
      this._cardLikeBtn.classList.add("card__group_active");
    } else {
      this._cardLikeBtn.classList.remove("card__group_active");
    }
  }

  setLike(value) {
    this._isLiked = value;
    this._renderLikes();
  }

  handleTrashBtn(value) {
    this._delete = value;
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();
    this._renderLikes();
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }
}
