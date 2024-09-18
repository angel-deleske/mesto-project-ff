import {initialCards} from './cards.js';
import {createCardModal} from '../index.js';
import {openPopup, closePopup} from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
const popupCaption = document.querySelector('.popup__caption');


export const createCard = (cardTemplate, cardData, deleteCard, likeCard, openImage) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const popupImage = document.querySelector('.popup_type_image');
  const image = document.querySelector('.popup__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = 'Пейзаж ' + cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  cardImage.addEventListener('click', function (evt) {
    popupImage.classList.add('popup_is-opened', 'popup_is-animated');
    image.setAttribute('src', evt.target.src);
  });

  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => openImage(cardData.link, cardData.name));

  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
};

export const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active')
};

export const openImage = (cardDataLink, cardDataName) => {
  const cardImage = cardElement.querySelector('.card__image');
  openPopup(cardImage);
  cardImage.src = cardDataLink;
  cardImage.alt = cardDataName;
  popupCaption.textContent = cardDataName;
};

export const deleteCard = (card) => {
  card.remove()
};

//добавление новых фото на страницу
const formNewPlace = document.querySelector('[name = "new-place"]');
const nameCard = document.querySelector('[name = "place-name"]');
const linkCard  = document.querySelector('[name = "link"]');
const inputNameCard = document.querySelector('.popup__input_type_card-name');
const inputLinkCard  = document.querySelector('.popup__input_type_url');

function addNewCard(evt) {
  evt.preventDefault();
  nameCard.textContent = inputNameCard.value;
  linkCard.src = inputLinkCard.value;
  const item = {name: nameCard.value,
    link: linkCard.value} 
  const newCard = createCard(cardTemplate, item, deleteCard, likeCard, openImage);
  cardsContainer.prepend(newCard);
  evt.target.reset();
  closePopup(createCardModal);
};

formNewPlace.addEventListener('submit', addNewCard); 

initialCards.forEach((cardData) => cardsContainer.append(createCard(cardTemplate, cardData, deleteCard, likeCard, openImage)));
