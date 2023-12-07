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
const profileModal = page.querySelector(".profileModal");
const profileEditBtn = page.querySelector(".profile__edit-btn");
const profileName = page.querySelector(".profile__name");
const profileOccupation = page.querySelector(".profile__occupation");
const profileModalCloseBtn = profileModal.querySelector(
  ".profileModal__close-btn"
);
const profileModalInputName = profileModal.querySelector(
  ".profileModal__input_type_name"
);
const profileModalInputOccupation = profileModal.querySelector(
  ".profileModal__input_type_occupation"
);
const profileModalForm = profileModal.querySelector(".profileModal__form");
const cardsList = page.querySelector(".cards__list");
const cardTemplate =
  page.querySelector("#card__template").content.firstElementChild;

// Function
function openProfileModal() {
  profileModal.classList.add("profileModal_opened");
}

function closeProfileModal() {
  profileModal.classList.remove("profileModal_opened");
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
  profileModalInputName.value = profileName.textContent;
  profileModalInputOccupation.value = profileOccupation.textContent;
}

function changeProfileText() {
  profileName.textContent = profileModalInputName.value;
  profileOccupation.textContent = profileModalInputOccupation.value;
}

// Event Handlers
function handleProfileEditFormSubmit(e) {
  e.preventDefault();
  changeProfileText();
  closeProfileModal();
}

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  openProfileModal();
  fillProfileForm();
});

profileModalCloseBtn.addEventListener("click", closeProfileModal);

profileModalForm.addEventListener("submit", handleProfileEditFormSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  // may have to prepend in the future
  cardsList.append(cardElement);
});
