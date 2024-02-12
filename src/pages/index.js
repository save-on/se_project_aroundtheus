/* ______________________________________________________________________________________________________ * 

*                                             IMPORTS                                                     *

*  ______________________________________________________________________________________________________ */

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  profileModal,
  cardsList,
  profileEditBtn,
  profileName,
  profileOccupation,
  profileCreateBtn,
  modalInputOccupation,
  modalFormProfile,
  modalInputName,
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
        imagePopup.open({ name, link });
      });
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  cardsList
);
cardSection.renderItems();

const newCardPopup = new PopupWithForm(".add-card-modal", (data) => {
  formValidators["card-form"].resetValidation();
  const newCard = new Card(data, "#card__template", () => {
    imagePopup.open(data);
  });
  const cardElement = newCard.generateCard();
  cardSection.addItem(cardElement);
  newCardPopup.close();
});
newCardPopup.setEventListener();

const profilePopup = new PopupWithForm(".profile-modal", (data) => {
  formValidators["profile-form"].resetValidation();
  const userInfo = new UserInfo(data);
  profilePopup.close();
  userInfo.setUserInfo();
});

profilePopup.setEventListener();

/* ______________________________________________________________________________________________________ * 

*                                             FUNCTIONS                                                   *

* _______________________________________________________________________________________________________ */

// function fillProfileForm() {
//   modalInputName.value = profileName.textContent;
//   modalInputOccupation.value = profileOccupation.textContent;
// }

function changeProfileText() {
  profileName.textContent = modalInputName.value;
  profileOccupation.textContent = modalInputOccupation.value;
}

/* ______________________________________________________________________________________________________ * 

*                                             EVENT HANDLERS                                              *

*  ______________________________________________________________________________________________________ */

// function handleProfileEditFormSubmit() {
//   changeProfileText();
//   closeModal(profileModal);
// }

/* ______________________________________________________________________________________________________ * 

*                                         EVENT LISTENERS                                                 *

*  ______________________________________________________________________________________________________ */

profileEditBtn.addEventListener("click", () => {
  profilePopup.open();
  // userInfo.getUserInfo();
});
profileCreateBtn.addEventListener("click", () => newCardPopup.open());
// modalFormProfile.addEventListener("submit", handleProfileEditFormSubmit);

/* ______________________________________________________________________________________________________ * 

*                                             LOOPS                                                       *

*  ______________________________________________________________________________________________________ */
