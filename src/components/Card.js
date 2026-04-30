export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleCardDelete,
    handleLikeClick,
    getCurrentUserId,
  ) {
    this._name = data.name;
    this._link = data.link;

    this._isLiked = data.isLiked || false;

    this._id = data._id;
    this._ownerId = data.owner;

    this._getCurrentUserId = getCurrentUserId;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleCardDelete(this);
      });
    }

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({
        imageLink: this._link,
        imageCaption: this._name,
      });
    });
  }

  updateLikes(isLiked) {
    this._isLiked = isLiked;

    this._likeButton.classList.toggle("element__like-button_active", isLiked);
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(".element__like-button");
    this._deleteButton = this._element.querySelector(".element__delete-button");
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__title");

    if (this._ownerId !== this._getCurrentUserId()) {
      if (this._deleteButton) {
        this._deleteButton.remove();
        this._deleteButton = null;
      }
    }

    this._setEventListeners();

    this._likeButton.classList.toggle(
      "element__like-button_active",
      this._isLiked,
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }
}
