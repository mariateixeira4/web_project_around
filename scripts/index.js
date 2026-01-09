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

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileText.textContent;
  openPopup(popupProfile);
});

closeButtonEdit.addEventListener("click", () => {
  closePopup(popupProfile);
});

closeButtonImage.addEventListener("click", () => {
  closePopup(popupImage);
});

popupProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = aboutInput.value;
  closePopup(popupProfile);
});

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

const cardTemplate = document.querySelector("#card-template");

function renderCard(cardData) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const image = cardElement.querySelector(".element__image");
  const title = cardElement.querySelector(".element__title");
  const likeButton = cardElement.querySelector(".element__like-button");
  const deleteButton = cardElement.querySelector(".element__delete-button");

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__like-button_active");
  });

  deleteButton.addEventListener("click", (evt) => {
    const card = evt.target.closest(".element");
    card.remove();
  });

  image.addEventListener("click", () => {
    popupImageElement.src = cardData.link;
    popupImageElement.alt = cardData.name;
    popupImageCaption.textContent = cardData.name;
    openPopup(popupImage);
  });

  cardsWrapper.append(cardElement);
}

initialCards.forEach((card) => renderCard(card));

addButton.addEventListener("click", () => {
  popupNewLocalForm.reset();
  openPopup(popupNewLocal);
});

closeButtonAdd.addEventListener("click", () => {
  closePopup(popupNewLocal);
});

popupNewLocalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const title = cardNameInput.value;
  const link = cardImageInput.value;

  if (!title || !link) return;

  renderCard({ name: title, link: link });
  closePopup(popupNewLocal);
});
