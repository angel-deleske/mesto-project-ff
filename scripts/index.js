const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard (cardTemplate, cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = 'Пейзаж ' + cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
    
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
};

const deleteCard = function (card) { 
  card.remove() 
};

initialCards.forEach(function(cardData){
  cardsContainer.append(createCard(cardTemplate, cardData, deleteCard));
});