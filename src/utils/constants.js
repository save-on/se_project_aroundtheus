// ======= ELEMENTS =======

// WRAPPER
export const page = document.querySelector(".page");
export const profileModal = page.querySelector(".profile-modal");

// CARDS
export const cardsList = page.querySelector(".cards__list");

// BTNS / NODES
export const profileEditBtn = page.querySelector(".profile__edit-btn");
export const profileCreateBtn = page.querySelector(".profile__create-btn");
export const profileImageEdit = page.querySelector(".profile__edit-avatar");

// SETTINGS
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__btn",
  errorClass: "modal__input-error_active",
  inputClassError: "modal__input_type_error",
};
