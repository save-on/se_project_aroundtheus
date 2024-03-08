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
  //Delete doesn't truly delete after creating card
  confirmationPopup.open();
  confirmationPopup.setSubmitAction(() => {
    api
      .deleteCard(card)
      .then(() => {})
      .catch((err) => console.error(err));
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
    .catch((err) => console.error(err));
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
  const cardElement = createCard(data);
  newCardPopup.renderLoading(true);
  newCardPopup.close();
  api
    .addNewCard(data)
    .then((results) => {
      cardSection.addItem(cardElement);
      console.log(results); // no idea what to do with this one
    })
    .catch((err) => console.error(err))
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
    .catch((err) => console.error(err))
    .finally(() => {
      renderLoading(false); // profile changes to saving... but doesn't change back
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
      })
      .catch((err) => console.error(err))
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
  const info = userInfo.getUserInfo();
  modalInputName.value = info.name;
  modalInputOccupation.value = info.occupation;
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
  .then((results) => {
    userInfo.setUserInfo(results[1]);
    console.log(results);
    cardSection = new Section(
      {
        data: results[0],
        renderer: (data) => {
          const cardElement = createCard(data);
          cardSection.addItem(cardElement);
        },
      },
      cardsList
    );
    cardSection.renderItems();
  })
  .catch((err) => console.error(err));
