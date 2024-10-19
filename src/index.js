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
const profileNameInput = profileForm.querySelector(".popup__input_type_name");
const profileAboutInput = profileForm.querySelector('.popup__input_type_description');
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

//слушалка открытия модалки с ред.профиля
editProfileButton.addEventListener('click', function () {
  clearValidation(profileForm, validationConfig);
  openModal(profileForm);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
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

//слушалка редактирования аватара
profileImage.addEventListener ('click', () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarForm);
});

//функция отправки формы редактирования аватара
function profileAvatarSubmit(evt) {
  clearValidation(avatarForm, validationConfig);
  buttonSaveAvatar.textContent = buttonSaveAvatar.getAttribute('data-loading');
  evt.preventDefault();
  updateUserAvatar(avatarLinkInput.value)
  .then((userData) => {
    profileImage.style.backgroundImage = `url(\\${userData.avatar})`;
    closeModal(avatarForm);
  })
 .catch((err) => {
    console.log(err);
  })
};

avatarForm.addEventListener('submit', profileAvatarSubmit);

// функция отправки формы редактирования профиля
function profileFormSubmit(evt) {
  clearValidation(profileForm, validationConfig);
  editProfileButton.textContent = buttonSaveProfile.getAttribute('data-loading');
  evt.preventDefault();
  updateUserInfo(profileNameInput.value, profileAboutInput.value)

  .then((userData) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    closeModal(profileForm);
  })
  .catch((err) =>
    console.log(err)
  )
  .finally(() => (buttonSaveProfile.textContent = editProfileButton.textContent));

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profileForm);
};

editProfileForm.addEventListener('submit', profileFormSubmit); 
 
//слушалка открытия модалки с добавл.карточки
addCardButton.addEventListener('click', function () {
  clearValidation(createCardModal, validationConfig);
  openModal(createCardModal);
});

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
      inputNameCard.value = '';
      inputLinkCard.value = '';
      evt.target.reset();
      closeModal(createCardModal);
    })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonSaveCard.textContent = buttonSaveCard.getAttribute('data-default-text');
  })
};

formNewPlace.addEventListener('submit', addNewCard);

//объект валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__error_visible'
};

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
clearValidation (formNewPlace, validationConfig);
