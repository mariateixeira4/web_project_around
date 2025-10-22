const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupProfile = document.querySelector("#editProfilePopup");
const popupNewLocal = document.querySelector("#addPostPopup");

const closeButtonEdit = popupProfile.querySelector(".popup__close-button");
const closeButtonAdd = popupNewLocal.querySelector(".popup__close-button");

const popupProfileForm = popupProfile.querySelector(".popup__form");
const popupNewLocalForm = popupNewLocal.querySelector(".popup__form");

const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#area");

const cardNameInput = document.querySelector("#title");
const cardImageInput = document.querySelector("#image-link");

const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");

const cardsWrapper = document.querySelector(".elements__list");

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

popupProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = aboutInput.value;
  closePopup(popupProfile);
});

const initialCards = [
  { name: "Vale de Yosemite", link: "images/Vale.png" },
  { name: "Lago Louise", link: "images/Louise.png" },
  { name: "Montanhas Carecas", link: "images/Montanha.png" },
  { name: "Latemar", link: "images/Latemar.png" },
  { name: "Parque Nacional da Vanoise", link: "images/Parque.png" },
  { name: "Lago di Braies", link: "images/Lago.png" },
];

function renderCard(cardData) {
  const cardElement = document.createElement("li");
  cardElement.classList.add("element");

  cardElement.innerHTML = `
    <img src="${cardData.link}" alt="${cardData.name}" class="element__image" />
    <div class="element__info">
      <div class="element__title-wrapper">
        <h2 class="element__title block">${cardData.name}</h2>
        <button class="element__like-button" type="button"></button>
      </div>
    </div>
  `;

  const likeButton = cardElement.querySelector(".element__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__like-button_active");
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
