import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUserInfo, getInitialCards, updateUserInfo, 
  postNewCard, updateUserAvatar} from './components/api.js';
import './pages/index.css';

const cardsContainer = document.querySelector('.places__list');

//профиль
const editProfileButton = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('.popup_type_edit');
const editProfileForm = document.querySelector('[name = "edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//попап с картинкой
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');
const closeButtonList = document.querySelectorAll('.popup__close');

//аватар и попап с аватаром
const avatarEditForm = document.querySelector('[name="edit-avatar"]')
const avatarForm = document.querySelector('.popup_type_avatar');
const profileImage = document.querySelector('.profile__image');
const avatarLinkInput = avatarForm.querySelector('.popup__input_type_url');

//добавление новых фото на страницу
const createCardModal = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const formNewPlace = document.querySelector('[name = "new-place"]');
const inputNameCard = formNewPlace.querySelector('.popup__input_type_card-name');
const inputLinkCard  = formNewPlace.querySelector('.popup__input_type_url');

//кнопки сохранения форм профиля, добавленного фото и аватара
const buttonSaveProfile = profileForm.querySelector('.popup__button');
const buttonSaveCard = createCardModal.querySelector('.popup__button');
const buttonSaveAvatar = avatarForm.querySelector('.popup__button');

//переменная ID пользователя
let userId;

//объект валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__error_visible'
};

//функция отправки формы редактирования аватара
function submitProfileAvatar(evt) {
  evt.preventDefault();
  buttonSaveAvatar.textContent = buttonSaveAvatar.getAttribute('data-loading');
  updateUserAvatar(avatarLinkInput.value)
  
  .then((userData) => {
    profileImage.style.backgroundImage = `url(\\${userData.avatar})`;
    closeModal(avatarForm);
  })
  .catch((err) =>
    console.log(err)
  )
  .finally(() => (buttonSaveAvatar.textContent = buttonSaveAvatar.getAttribute('button-default-text')));
};

// функция отправки формы редактирования профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  buttonSaveProfile.textContent = buttonSaveProfile.getAttribute('data-loading');
  updateUserInfo(nameInput.value, jobInput.value)

  .then((userData) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    closeModal(profileForm);
  })
  .catch((err) =>
    console.log(err)
  )
  .finally(() => (buttonSaveProfile.textContent = buttonSaveProfile.getAttribute('button-default-text')));

  closeModal(profileForm);
};

//функция открытия карточки крупным планом
function openImage(cardDataLink, cardDataName) {
  openModal(popupImage);
  image.src = cardDataLink;
  image.alt = cardDataName;
  popupCaption.textContent = cardDataName;
};

//функция добавления новых карточек
function addNewCard(evt) {
  evt.preventDefault();
  buttonSaveCard.textContent = buttonSaveCard.getAttribute('data-loading');
  const item = {name: inputNameCard.value,
    link: inputLinkCard.value};
  postNewCard(item)
    .then ((card) => {
      const newCard = createCard(card, userId, likeCard, deleteCard, openImage);
      cardsContainer.prepend(newCard);
      closeModal(createCardModal);
    })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonSaveCard.textContent = buttonSaveCard.getAttribute('button-default-text');
  })
};

formNewPlace.addEventListener('submit', addNewCard);

//слушалка открытия модалки с ред.аватара
profileImage.addEventListener ('click', () => { 
  avatarEditForm.reset();//сделала очистку полей формы при открытии попапа
  clearValidation(avatarForm, validationConfig);
  openModal(avatarForm);
});

avatarForm.addEventListener('submit', submitProfileAvatar);

//слушалка открытия модалки с ред.профиля
editProfileButton.addEventListener('click', function () {
  clearValidation(profileForm, validationConfig);
  openModal(profileForm);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

editProfileForm.addEventListener('submit', submitProfileForm); 

//слушалка открытия модалки с добавл.карточки
addCardButton.addEventListener('click', function () {
  formNewPlace.reset();//сделала очистку полей формы при открытии, вне зависимости от того, была ли успешная отправка или нет
  clearValidation(createCardModal, validationConfig);
  openModal(createCardModal);
});

//слушалка закрытия всех попапов
closeButtonList.forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(buttonsPopup));
  buttonsPopup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(buttonsPopup);
    };
  });
});

//вывод данных профиля и всех карточек на страницу
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    
    profileImage.style.backgroundImage = `url(\\${userData.avatar})`;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        createCard(cardData, userId, likeCard, deleteCard, openImage)
      );
    });
  })
  .catch((err) =>
    console.log(err)
  );

enableValidation(validationConfig);
