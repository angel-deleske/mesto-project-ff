import {deleteUserCard, setLike, deleteLike} from './api.js';

//функция создания карточки
export const createCard = (cardData, userId, likeCard, deleteCard, openImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  const isLiked = cardData.likes.some((like) => like._id === userId);

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  //слушалка лайка
  likeButton.addEventListener('click', () => {
    likeCard(cardData._id, cardElement)
  });

  //проверка для функции удаления
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener('click', () => 
      deleteCard(cardData._id, cardElement));
  } else {
    deleteButton.remove()
  };

  //проверка лайка
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  };

  //слушалка открытия большой карточки
  cardImage.addEventListener('click', () => {
    openImage(cardData.link, cardData.name, cardData.name)
  });

  return cardElement;
};

//функция удаления карточки
export const deleteCard = (cardId, cardElement) => {
  deleteUserCard(cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch((err) => {
    console.log(err)
  });
};

//функция лайка
export const likeCard = (cardId, cardElement) => {
  const likeButton = cardElement.querySelector('.card__like-button');
  const currentLike = cardElement.querySelector('.card__like-counter');
  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLike(cardId)
      .then((card) => {
        likeButton.classList.remove('card__like-button_is-active');
        currentLike.textContent = card.likes.length;
      })
      .catch((err) =>
        console.log(err)
      );
  } else {
    setLike(cardId)
      .then((card) => {
        likeButton.classList.add('card__like-button_is-active');
        currentLike.textContent = card.likes.length;
      })
      .catch((err) =>
        console.log(err)
      );
  }
};
