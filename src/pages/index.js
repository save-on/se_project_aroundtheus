/* ______________________________________________________________________________________________________ * 

*                                             IMPORTS                                                     *

*  ______________________________________________________________________________________________________ */

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

import {
  initialCards,
  profileModal,
  cardsList,
  profileEditBtn,
  profileName,
  profileOccupation,
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

const imagePopup = new PopupWithImage(".picture-modal");
imagePopup.setEventListener();

const cardSection = new Section(
  {
    data: initialCards,
    renderer: ({ name, link }) => {
      const card = new Card({ name, link }, "#card__template", () => {
        pictureModalImage.src = link;
        pictureModalImage.alt = name;
        pictureModalTitle.textContent = name;
        imagePopup.open();
      });
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  cardsList
);
cardSection.renderItems();

const newCardPopup = new PopupWithForm(".add-card-modal", () => {});
newCardPopup.setEventListener();

// const userInfo = new UserInfo("");
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
  const name = modalInputCreateTitle.value;
  const link = modalInputImageLink.value;
  return { name, link };
}

// function openModal(modal) {
//   modal.classList.add("modal_opened"); // rm
//   document.addEventListener("keydown", closingModalByEsc);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened"); // rm
//   document.removeEventListener("keydown", closingModalByEsc);
// }

/* ______________________________________________________________________________________________________ * 

*                                             EVENT HANDLERS                                              *

*  ______________________________________________________________________________________________________ */

function handleProfileEditFormSubmit() {
  changeProfileText();
  closeModal(profileModal);
}

function handleCardCreateFormSubmit(e) {
  const data = createCard();
  e.target.reset();
  formValidators["card-form"].resetValidation();
  const newCard = new Card(data, "#card__template", () => {
    pictureModalImage.src = data.link;
    pictureModalImage.alt = data.name;
    pictureModalTitle.textContent = data.name;
    imagePopup.open();
    // ^ ^ ^ ^ ^ ^ ^
  });
  const cardElement = newCard.generateCard();
  cardSection.addItem(cardElement);
  newCardPopup.close();
}
/* ______________________________________________________________________________________________________ * 

*                                         EVENT LISTENERS                                                 *

*  ______________________________________________________________________________________________________ */

profileEditBtn.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  // userInfo.open();
  // ^ ^ ^ ^ ^ ^ ^
  fillProfileForm();
});

profileCreateBtn.addEventListener("click", () => newCardPopup.open());
modalFormProfile.addEventListener("submit", handleProfileEditFormSubmit);
modalFormCreate.addEventListener("submit", handleCardCreateFormSubmit);

/* ______________________________________________________________________________________________________ * 

*                                             LOOPS                                                       *

*  ______________________________________________________________________________________________________ */
