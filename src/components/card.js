export const createCard = (cardTemplate, cardData, deleteCard, likeCard, openImage) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => openImage(cardData.link, cardData.name));
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
};

export const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active')
};

export const deleteCard = (card) => {
  card.remove()
};
