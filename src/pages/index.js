/* ______________________________________________________________________________________________________ * 

*                                             IMPORTS                                                     

*  ______________________________________________________________________________________________________ */

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  cardsList,
  profileEditBtn,
  profileCreateBtn,
  modalInputName,
  modalInputOccupation,
  config,
} from "../utils/constants.js";
import "./index.css";

/* ______________________________________________________________________________________________________ * 

*                                             CLASS INSTANCES                                             

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

const createCard = (cardObject) => {
  const card = new Card(cardObject, "#card__template", () => {
    imagePopup.open(cardObject);
  });
  return card.generateCard();
};

const imagePopup = new PopupWithImage(".picture-modal");
imagePopup.setEventListener();

const cardSection = new Section(
  {
    data: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
    },
  },
  cardsList
);
cardSection.renderItems();

const newCardPopup = new PopupWithForm(".add-card-modal", (data) => {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);

  // TODO: before the nmodal will be closed 0 calll the reset validatiuon fun ction
  newCardPopup.close();
});
newCardPopup.setEventListener();

const userInfo = new UserInfo(".profile__name", ".profile__occupation");

const profilePopup = new PopupWithForm(".profile-modal", (data) => {
  profilePopup.close();
  userInfo.setUserInfo(data);
});
profilePopup.setEventListener();

/* ______________________________________________________________________________________________________ * 

*                                         EVENT LISTENERS                                                 

*  ______________________________________________________________________________________________________ */

profileEditBtn.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  profilePopup.open();
  const info = userInfo.getUserInfo();
  modalInputName.value = info.name;
  modalInputOccupation.value = info.occupation;
});

profileCreateBtn.addEventListener("click", () => {
  formValidators["card-form"].resetValidation();
  newCardPopup.open();
});
