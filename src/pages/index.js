/* ______________________________________________________________________________________________________ * 

*                                             IMPORTS                                                     

*  ______________________________________________________________________________________________________ */

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  cardsList,
  profileEditBtn,
  profileCreateBtn,
  modalInputName,
  modalInputOccupation,
  config,
  profileImageEdit,
} from "../utils/constants.js";
import "./index.css";

/* ______________________________________________________________________________________________________ * 

*                                             CLASS INSTANCES                                             

*  ______________________________________________________________________________________________________ */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3c5909bd-d1c1-439d-8361-757b3ef3e3b4",
    "content-type": "application/json",
  },
});

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

const handleImageClick = (data) => {
  imagePopup.open(data);
};

const handleDelete = (card) => {
  confirmationPopup.open();
  confirmationPopup.setSubmitAction(() => {
    api.deleteCard(card).catch(console.error);
    confirmationPopup.close();
    card.handleTrashBtn();
  });
};

const handleLike = (data, specificCard) => {
  api
    .likeCard(data)
    .then((results) => {
      specificCard.setLike(results.isLiked);
    })
    .catch(console.error);
};

const createCard = (data) => {
  const card = new Card(
    data,
    "#card__template",
    handleImageClick,
    handleDelete,
    handleLike
  );
  return card.generateCard();
};

const imagePopup = new PopupWithImage(".picture-modal");
imagePopup.setEventListener();

const newCardPopup = new PopupWithForm(".add-card-modal", (data) => {
  newCardPopup.renderLoading(true);
  newCardPopup.close();
  api
    .addNewCard(data)
    .then((results) => {
      const cardElement = createCard(results);
      cardSection.addItem(cardElement);
    })
    .catch(console.error)
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
});
newCardPopup.setEventListener();

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__occupation",
  ".profile__avatar"
);

const profilePopup = new PopupWithForm(".profile-modal", (data) => {
  profilePopup.renderLoading(true);
  profilePopup.close();
  api
    .editUserInfo(data)
    .then((results) => {
      userInfo.setUserInfo(results);
    })
    .catch(console.error)
    .finally(() => {
      profilePopup.renderLoading(false);
    });
});
profilePopup.setEventListener();

const changeProfilePopup = new PopupWithForm(
  ".change-profile-modal",
  ({ url }) => {
    changeProfilePopup.renderLoading(true);
    changeProfilePopup.close();
    api
      .editUserImage(url)
      .then((results) => {
        userInfo.changeUserPhoto(results["avatar"]);
        console.log(results);
      })
      .catch(console.error)
      .finally(() => {
        changeProfilePopup.renderLoading(false);
      });
  }
);
changeProfilePopup.setEventListener();

const confirmationPopup = new PopupWithConfirmation(
  ".delete-confirmation-modal"
);
confirmationPopup.setEventListener();

/* ______________________________________________________________________________________________________ * 
  
  *                                         EVENT LISTENERS                                                 
  
  *  ______________________________________________________________________________________________________ */

profileEditBtn.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  profilePopup.open();
  profilePopup.setInputValues(userInfo.getUserInfo());
});

profileCreateBtn.addEventListener("click", () => {
  formValidators["card-form"].resetValidation();
  newCardPopup.open();
});

profileImageEdit.addEventListener("click", () => {
  formValidators["change-profile-form"].resetValidation();
  changeProfilePopup.open();
});

let cardSection;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    cardSection = new Section(
      {
        data: cards,
        renderer: (data) => {
          const cardElement = createCard(data);
          cardSection.addItem(cardElement);
        },
      },
      cardsList
    );
    cardSection.renderItems();
  })
  .catch(console.error);
