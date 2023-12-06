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
const page = document.querySelector(".page");
const modal = page.querySelector(".modal");
const profileEditBtn = page.querySelector(".profile__edit-btn");
const profileName = page.querySelector(".profile__name");
const profileOccupation = page.querySelector(".profile__occupation");
const modalCloseBtn = modal.querySelector(".modal__close-btn");
const modalInputName = modal.querySelector(".modal__input_type_name");
const modalInputOccupation = modal.querySelector(
  ".modal__input_type_occupation"
);
const modalForm = modal.querySelector(".modal__form");

// Functions
function modalToggleBtn() {
  modal.classList.toggle("modal_opened");
  modalInputName.value = profileName.textContent;
  modalInputOccupation.value = profileOccupation.textContent;
}

function getCardElement(data) {
  let cardElement = page.querySelector("#card__element").content;
  let cardsList = cardElement.querySelector(".cards__list");
  let card = cardElement.querySelector(".card").cloneNode(true);
}
// Event Handlers
function profileEditHandler(e) {
  e.preventDefault();
  profileName.textContent = modalInputName.value;
  profileOccupation.textContent = modalInputOccupation.value;
  modalToggleBtn();
}

// Event Listeners
profileEditBtn.addEventListener("click", modalToggleBtn);

modalCloseBtn.addEventListener("click", modalToggleBtn);

modalForm.addEventListener("submit", profileEditHandler);
