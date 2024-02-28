/* ______________________________________________________________________________________________________ * 

*                                             IMPORTS                                                     

*  ______________________________________________________________________________________________________ */

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

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
  newCardPopup.close();
});
newCardPopup.setEventListener();

const userInfo = new UserInfo(".profile__name", ".profile__occupation");

const profilePopup = new PopupWithForm(".profile-modal", (data) => {
  profilePopup.close();
  userInfo.setUserInfo(data);
});
profilePopup.setEventListener();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3c5909bd-d1c1-439d-8361-757b3ef3e3b4",
    "content-type": "application/json",
  },
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));

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
