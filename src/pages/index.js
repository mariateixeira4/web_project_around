import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { validationConfig } from "../utils/constants.js";

// API
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "f174f37a-8299-4ab5-bccf-d4097cad9eff",
    "Content-Type": "application/json",
  },
});

let currentUserId = null;

// USER INFO
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__text",
  avatarSelector: ".profile__image",
});

// POPUPS
const imagePopup = new PopupWithImage("#imagePopup");
const deletePopup = new PopupWithConfirmation(".popup_type_delete-confirm");

// LIKE
function handleLike(cardInstance) {
  const isLiked = cardInstance._isLiked;

  const request = isLiked
    ? api.unlikeCard(cardInstance._id)
    : api.likeCard(cardInstance._id);

  request
    .then((res) => {
      cardInstance.updateLikes(res.isLiked);
    })
    .catch(console.log);
}

// CREATE CARD
function createCard(cardData) {
  return new Card(
    cardData,
    "#card-template",

    ({ imageLink, imageCaption }) => {
      imagePopup.open({ imageLink, imageCaption });
    },

    (cardInstance) => {
      deletePopup.setAction(() => {
        api
          .deleteCard(cardInstance._id)
          .then(() => {
            cardInstance.deleteCard();
            deletePopup.close();
          })
          .catch(console.log);
      });

      deletePopup.open();
    },

    handleLike,

    () => currentUserId,
  ).generateCard();
}

// SECTION
const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  ".elements__list",
);

// PROFILE
const profilePopup = new PopupWithForm("#editProfilePopup", (formData) => {
  profilePopup.renderLoading(true);

  api
    .updateProfile(formData)
    .then((res) => {
      userInfo.setUserInfo(res);
      profilePopup.close();
    })
    .catch(console.log)
    .finally(() => profilePopup.renderLoading(false));
});

// ADD CARD
const addCardPopup = new PopupWithForm("#addPostPopup", (formData) => {
  addCardPopup.renderLoading(true);

  api
    .addCard(formData)
    .then((res) => {
      cardSection.addItem(createCard(res));
      addCardPopup.close();
    })
    .catch(console.log)
    .finally(() => addCardPopup.renderLoading(false));
});

// AVATAR
const avatarPopup = new PopupWithForm("#editAvatarPopup", (formData) => {
  avatarPopup.renderLoading(true);

  api
    .updateAvatar(formData)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);

      avatarPopup.close();
    })
    .catch(console.log)
    .finally(() => avatarPopup.renderLoading(false));
});

// EVENTS
imagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

// BUTTONS
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => profilePopup.open());

document
  .querySelector(".profile__add-button")
  .addEventListener("click", () => addCardPopup.open());

document
  .querySelector(".profile__avatar-edit-button")
  .addEventListener("click", () => avatarPopup.open());

// INIT
api
  .getAppData()
  .then(([user, cards]) => {
    currentUserId = user._id;

    userInfo.setUserInfo(user);

    cards.forEach((card) => {
      cardSection.addItem(createCard(card));
    });
  })
  .catch(console.log);
