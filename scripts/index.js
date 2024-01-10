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
const cardTemplate =
  page.querySelector("#card__template").content.firstElementChild;

// Btns and other nodes
const profileEditBtn = page.querySelector(".profile__edit-btn");
const profileName = page.querySelector(".profile__name");
const profileOccupation = page.querySelector(".profile__occupation");
const closeBtns = page.querySelectorAll(".modal__close-btn");
const profileCreateBtn = page.querySelector(".profile__create-btn");
const modalCreateBtn = addCardModal.querySelector(".modal__create-btn");
const pictureModalImage = pictureModal.querySelector(".picture-modal__image");
const pictureModalTitle = pictureModal.querySelector(".picture-modal__title");

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

// Function
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function deleteItem(item) {
  item.remove();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__group");
  const cardTrashBtn = cardElement.querySelector(".card__trash-bin");

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__group_active");
  });
  cardTrashBtn.addEventListener("click", () => deleteItem(cardElement));
  cardImageEl.addEventListener("click", () => {
    pictureModalImage.src = data.link;
    pictureModalImage.alt = data.name;
    pictureModalTitle.textContent = data.name;
    openModal(pictureModal);
  });

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
  renderCard({
    name,
    link,
  });
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
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
  e.target.reset();
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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(modal);
    }
  });
});
