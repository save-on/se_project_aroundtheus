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

const userInfo = new UserInfo(".profile__name", ".profile__occupation");

const profilePopup = new PopupWithForm(".profile-modal", (data) => {
  formValidators["profile-form"].resetValidation();
  profilePopup.close();
  userInfo.setUserInfo(data);
});

profilePopup.setEventListener();

/* ______________________________________________________________________________________________________ * 

*                                         EVENT LISTENERS                                                 

*  ______________________________________________________________________________________________________ */

profileEditBtn.addEventListener("click", () => {
  profilePopup.open();
  userInfo.getUserInfo();
});

profileCreateBtn.addEventListener("click", () => newCardPopup.open());
