// DATA
export const initialCards = [
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

// ======= ELEMENTS =======

// WRAPPER
export const page = document.querySelector(".page");
export const profileModal = page.querySelector(".profile-modal");
export const addCardModal = page.querySelector(".add-card-modal");
export const pictureModal = page.querySelector(".picture-modal");
export const modals = page.querySelectorAll(".modal");

// CARDS
export const cardsList = page.querySelector(".cards__list");

// BTNS / NODES
export const profileEditBtn = page.querySelector(".profile__edit-btn");
export const profileName = page.querySelector(".profile__name");
export const profileOccupation = page.querySelector(".profile__occupation");
export const closeBtns = page.querySelectorAll(".modal__close-btn");
export const profileCreateBtn = page.querySelector(".profile__create-btn");
export const pictureModalImage = document.querySelector(
  ".picture-modal__image"
);
export const pictureModalTitle = document.querySelector(
  ".picture-modal__title"
);

// FORM DATA
export const modalInputOccupation = profileModal.querySelector(
  ".modal__input_type_occupation"
);
export const modalFormProfile = document.forms["profile-form"];
export const modalInputName = profileModal.querySelector(
  ".modal__input_type_name"
);

export const modalFormCreate = document.forms["card-form"];
export const modalInputCreateTitle = addCardModal.querySelector(
  ".modal__input_type_create-title"
);
export const modalInputImageLink = addCardModal.querySelector(
  ".modal__input_type_image-link"
);

// SETTINGS
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__btn",
  errorClass: "modal__input-error_active",
  inputClassError: "modal__input_type_error",
};
