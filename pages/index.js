import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
const pictureModal = page.querySelector(".picture-modal");
const modals = page.querySelectorAll(".modal");

// Cards
const cardsList = page.querySelector(".cards__list");

// Btns and other nodes
const profileEditBtn = page.querySelector(".profile__edit-btn");
const profileName = page.querySelector(".profile__name");
const profileOccupation = page.querySelector(".profile__occupation");
const closeBtns = page.querySelectorAll(".modal__close-btn");
const profileCreateBtn = page.querySelector(".profile__create-btn");

// Form Data
const modalInputOccupation = profileModal.querySelector(
  ".modal__input_type_occupation"
);
const modalFormProfile = document.forms["profile-form"];
const modalInputName = profileModal.querySelector(".modal__input_type_name");

const modalFormCreate = document.forms["card-form"];
const modalInputCreateTitle = addCardModal.querySelector(
  ".modal__input_type_create-title"
);
const modalInputImageLink = addCardModal.querySelector(
  ".modal__input_type_image-link"
);

// Settings

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__btn",
  errorClass: "modal__input-error_active",
  inputClassError: "modal__input_type_error",
};

// Function

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
  renderCard({
    name,
    link,
  });
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closingModalByEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closingModalByEsc);
}

function renderCard(data) {
  const card = new Card(data, "#card__template", () => {
    openModal(pictureModal);
  });
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
}

// Event Handlers
function handleProfileEditFormSubmit() {
  changeProfileText();
  closeModal(profileModal);
}

function handleCardCreateFormSubmit(e) {
  createCard();
  closeModal(addCardModal);
  e.target.reset();
}

function closingModalByEsc(e) {
  const openedModal = document.querySelector(".modal_opened");
  if (e.key === "Escape") {
    closeModal(openedModal);
  }
}

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  openModal(profileModal);
  fillProfileForm();
});
profileCreateBtn.addEventListener("click", () => openModal(addCardModal));

modalFormProfile.addEventListener("submit", handleProfileEditFormSubmit);
modalFormCreate.addEventListener("submit", handleCardCreateFormSubmit);

// Loops
initialCards.forEach(renderCard);

closeBtns.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

const formValidator = new FormValidator(config);
formValidator.enableValidation();
formValidator.toggleButtonState();
