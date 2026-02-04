import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, setupPopupOverlays } from "./utils.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupProfile = document.querySelector("#editProfilePopup");
const popupNewLocal = document.querySelector("#addPostPopup");
const popupImage = document.querySelector("#imagePopup");

const closeButtonEdit = popupProfile.querySelector(".popup__close-button");
const closeButtonAdd = popupNewLocal.querySelector(".popup__close-button");
const closeButtonImage = popupImage.querySelector(".popup__close-button");

const popupProfileForm = popupProfile.querySelector(".popup__form");
const popupNewLocalForm = popupNewLocal.querySelector(".popup__form");

const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#area");

const cardNameInput = document.querySelector("#title");
const cardImageInput = document.querySelector("#image-link");

const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");

const cardsWrapper = document.querySelector(".elements__list");

const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

function handleImageClick(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

function renderCard(cardData, container) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsWrapper);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = aboutInput.value;
  closePopup(popupProfile);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardImageInput.value,
  };

  renderCard(cardData, cardsWrapper);
  popupNewLocalForm.reset();
  addFormValidator.resetValidation();
  closePopup(popupNewLocal);
}

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileText.textContent;
  editFormValidator.resetValidation();
  openPopup(popupProfile);
});

addButton.addEventListener("click", () => {
  openPopup(popupNewLocal);
});

closeButtonEdit.addEventListener("click", () => {
  closePopup(popupProfile);
});

closeButtonAdd.addEventListener("click", () => {
  closePopup(popupNewLocal);
});

closeButtonImage.addEventListener("click", () => {
  closePopup(popupImage);
});

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);
popupNewLocalForm.addEventListener("submit", handleAddCardFormSubmit);

setupPopupOverlays();

const editFormValidator = new FormValidator(validationConfig, popupProfileForm);
const addFormValidator = new FormValidator(validationConfig, popupNewLocalForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
