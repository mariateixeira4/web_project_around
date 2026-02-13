import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__image");
    this._captionElement = this._popupElement.querySelector(".popup__caption");
  }

  open({ imageLink, imageCaption }) {
    this._imageElement.src = imageLink;
    this._imageElement.alt = imageCaption;
    this._captionElement.textContent = imageCaption;
    super.open();
  }
}
