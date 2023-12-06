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
const cardsList = page.querySelector(".cards__list");
const cardTemplate =
  page.querySelector("#card__template").content.firstElementChild;

// Functions
function modalToggleBtn() {
  modal.classList.toggle("modal_opened");
  modalInputName.value = profileName.textContent;
  modalInputOccupation.value = profileOccupation.textContent;
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

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  // may have to prepend in the future
  cardsList.append(cardElement);
});
