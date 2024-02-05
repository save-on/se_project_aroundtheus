/* ______________________________________________________________________________________________________ * 

*                                             IMPORTS                                                     *

*  ______________________________________________________________________________________________________ */

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  profileModal,
  addCardModal,
  pictureModal,
  modals,
  cardsList,
  profileEditBtn,
  profileName,
  profileOccupation,
  closeBtns,
  profileCreateBtn,
  pictureModalImage,
  pictureModalTitle,
  modalInputOccupation,
  modalFormProfile,
  modalInputName,
  modalFormCreate,
  modalInputCreateTitle,
  modalInputImageLink,
  config,
} from "../utils/constants.js";

/* ______________________________________________________________________________________________________ * 

*                                             CLASS INSTANCES                                             *

*  ______________________________________________________________________________________________________ */

const formValidators = {};

const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(config);

const cardSection = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card__template", () => {
        pictureModalImage.src = item.link;
        pictureModalImage.alt = item.name;
        pictureModalTitle.textContent = item.name;
        openModal(pictureModal);
      });
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  cardsList
);
cardSection.renderItems();

/* ______________________________________________________________________________________________________ * 

*                                             FUNCTIONS                                                   *

* _______________________________________________________________________________________________________ */

function fillProfileForm() {
  modalInputName.value = profileName.textContent;
  modalInputOccupation.value = profileOccupation.textContent;
}

function changeProfileText() {
  profileName.textContent = modalInputName.value;
  profileOccupation.textContent = modalInputOccupation.value;
}

function createCard() {
  // <----
  const name = modalInputCreateTitle.value;
  const link = modalInputImageLink.value;
  return { name, link };
}

function openModal(modal) {
  modal.classList.add("modal_opened"); // rm
  document.addEventListener("keydown", closingModalByEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened"); // rm
  document.removeEventListener("keydown", closingModalByEsc);
}

/* ______________________________________________________________________________________________________ * 

*                                             EVENT HANDLERS                                              *

*  ______________________________________________________________________________________________________ */

function handleProfileEditFormSubmit() {
  changeProfileText();
  closeModal(profileModal);
}

function handleCardCreateFormSubmit(e) {
  createCard(); // <---
  e.target.reset();
  formValidators["card-form"].resetValidation();
  closeModal(addCardModal);
}

function closingModalByEsc(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

/* ______________________________________________________________________________________________________ * 

*                                         EVENT LISTENERS                                                 *

*  ______________________________________________________________________________________________________ */

profileEditBtn.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  openModal(profileModal);
  fillProfileForm();
});

profileCreateBtn.addEventListener("click", () => openModal(addCardModal));
modalFormProfile.addEventListener("submit", handleProfileEditFormSubmit);
modalFormCreate.addEventListener("submit", handleCardCreateFormSubmit);

/* ______________________________________________________________________________________________________ * 

*                                             LOOPS                                                       *

*  ______________________________________________________________________________________________________ */

closeBtns.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});
