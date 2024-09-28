import {createCard, deleteCard, likeCard} from './components/card.js';
import {initialCards} from './components/cards.js';
import {openModal, closeModal} from './components/modal.js';
import './pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const popupCaption = document.querySelector('.popup__caption');
const cardsContainer = document.querySelector('.places__list');
const closeButtonList = document.querySelectorAll('.popup__close');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('.popup_type_edit');
const editProfileForm = document.querySelector('[name = "edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');

//слушалка открытия модалки с ред.профиля
editProfileButton.addEventListener('click', function () {
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

// Обработчик «отправки» формы редактирования профиля
function profileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profileForm);
};

editProfileForm.addEventListener('submit', profileFormSubmit); 

//добавление новых фото на страницу
const createCardModal = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const formNewPlace = document.querySelector('[name = "new-place"]');
const nameCard = document.querySelector('[name = "place-name"]');
const linkCard  = document.querySelector('[name = "link"]');
const inputNameCard = document.querySelector('.popup__input_type_card-name');
const inputLinkCard  = document.querySelector('.popup__input_type_url');

//слушалка открытия модалки с добавл.карточки
addCardButton.addEventListener('click', function (evt) {
  if (evt.target === evt.currentTarget) {
    openModal(createCardModal);
  }
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
  nameCard.textContent = inputNameCard.value;
  linkCard.src = inputLinkCard.value;
  const item = {name: nameCard.value,
    link: linkCard.value} 
  const newCard = createCard(cardTemplate, item, deleteCard, likeCard, openImage);
  cardsContainer.prepend(newCard);
  evt.target.reset();
  closeModal(createCardModal);
};

formNewPlace.addEventListener('submit', addNewCard);

initialCards.forEach((cardData) => cardsContainer.append(createCard(cardTemplate, cardData, deleteCard, likeCard, openImage)));

createCard();
