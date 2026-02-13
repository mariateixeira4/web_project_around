import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationConfig } from "../utils/constants.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#area");

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__text",
  avatarSelector: ".profile__image",
});

const imagePopup = new PopupWithImage("#imagePopup");

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        ({ imageLink, imageCaption }) => {
          imagePopup.open({ imageLink, imageCaption });
        },
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".elements__list",
);

const profilePopup = new PopupWithForm("#editProfilePopup", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    about: formData.about,
  });
});

const addCardPopup = new PopupWithForm("#addPostPopup", (formData) => {
  const newCard = new Card(
    {
      name: formData.name,
      link: formData.link,
    },
    "#card-template",
    ({ imageLink, imageCaption }) => {
      imagePopup.open({ imageLink, imageCaption });
    },
  );
  const cardElement = newCard.generateCard();
  cardSection.addItem(cardElement);
});

const profileFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#editProfilePopup .popup__form"),
);

const addCardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#addPostPopup .popup__form"),
);

cardSection.renderItems();

imagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.about;
  profileFormValidator.resetValidation();
  profilePopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
});
