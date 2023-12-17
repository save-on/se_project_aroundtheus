const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago Di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Elements

// Wrappers
const page = document.querySelector(".page");
const profileModal = page.querySelector(".profile-modal");
const addCardModal = page.querySelector(".add-card-modal");

// Cards
const cardsList = page.querySelector(".cards__list");
const cardTemplate =
  page.querySelector("#card__template").content.firstElementChild;

// Btns and other nodes
const profileEditBtn = page.querySelector(".profile__edit-btn");
const profileName = page.querySelector(".profile__name");
const profileOccupation = page.querySelector(".profile__occupation");
const profileCloseBtn = profileModal.querySelector(
  ".modal__close_profile-modal"
);
const profileCreateBtn = page.querySelector(".profile__create-btn");
const createCloseBtn = addCardModal.querySelector(".modal__close_create-modal");
const modalCreateBtn = addCardModal.querySelector(".modal__create-btn");

// Form Data
const modalInputOccupation = profileModal.querySelector(
  ".modal__input_type_occupation"
);
const modalFormProfile = profileModal.querySelector(".modal__form_profile");
const modalInputName = profileModal.querySelector(".modal__input_type_name");

const modalFormCreate = addCardModal.querySelector(".modal__form_create");
const modalInputCreateTitle = addCardModal.querySelector(
  ".modal__input_type_create-title"
);
const modalInputImageLink = addCardModal.querySelector(
  ".modal__input_type_image-link"
);

// Function
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  return cardElement;
}

function fillProfileForm() {
  modalInputName.value = profileName.textContent;
  modalInputOccupation.value = profileOccupation.textContent;
}

function changeProfileText() {
  profileName.textContent = modalInputName.value;
  profileOccupation.textContent = modalInputOccupation.value;
}

function createCard() {
  const name = modalInputCreateTitle.value;
  const link = modalInputImageLink.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardsList.prepend(cardElement);
}

function resetCreateCardsField() {
  modalInputCreateTitle.value = "";
  modalInputImageLink.value = "";
}

// Event Handlers
function handleProfileEditFormSubmit(e) {
  e.preventDefault();
  changeProfileText();
  closeModal(profileModal);
}

function handleCardCreateFormSubmit(e) {
  e.preventDefault();
  createCard();
  closeModal(addCardModal);
  resetCreateCardsField();
}

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  openModal(profileModal);
  fillProfileForm();
});
profileCloseBtn.addEventListener("click", () => closeModal(profileModal));

modalFormProfile.addEventListener("submit", handleProfileEditFormSubmit);

profileCreateBtn.addEventListener("click", () => openModal(addCardModal));
createCloseBtn.addEventListener("click", () => closeModal(addCardModal));
modalFormCreate.addEventListener("submit", handleCardCreateFormSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  // may have to prepend in the future
  cardsList.append(cardElement);
});
