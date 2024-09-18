import {createCard, deleteCard, likeCard, openImage} from './components/card.js';
import {initialCards} from './components/cards.js';
import {openPopup, closePopup} from './components/modal.js';
import './pages/index.css';

const addCardButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');
const createCardModal = document.querySelector('.popup_type_new-card');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('[name = "edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//слушалка открытия модалки с ред.профиля
editProfileButton.addEventListener('click', function () {
  openPopup(profileForm);
});

//слушалка открытия модалки с добавл.карточки
addCardButton.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('profile__add-button')) {
    createCardModal.classList.add('popup_is-animated', 'popup_is-opened');
  }
});

//слушалка закрытия всех попапов
closeButton.forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
  buttonsPopup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(buttonsPopup);
    };
  });
});

// Обработчик «отправки» формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profileForm);
};

formElement.addEventListener('submit', handleFormSubmit); 

createCard();
  
export {createCardModal};







