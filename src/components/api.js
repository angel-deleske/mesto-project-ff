const config = {
  server: 'https://mesto.nomoreparties.co/v1/wff-cohort-24',
  headers: {
    authorization: 'd9e7d845-a2d1-440b-9422-90f85f134bd3',
    'Content-Type': 'application/json',
  },
};

//Проверка запроса
const checkRequest = (res) => {
  if (res.ok) {
    return res.json()
  } 
  else {
    return Promise.reject(`Ошибка: ${res.status}`)
  };
};    

//получение данных о пользователе
const getUserInfo = () => {
  return fetch(`${config.server}/users/me`, {
     headers: config.headers,
  })
 .then((res) => checkRequest(res));
}

//получение карточек
const getInitialCards = () => {
  return fetch(`${config.server}/cards`, {
     headers: config.headers,
  })
 .then((res) => checkRequest(res));
}

//обновление  данных пользователя
const updateUserInfo = (name, about) => {
  return fetch(`${config.server}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
   }),
  })
 .then((res) => checkRequest(res));
};

//добавление карточек
const postNewCard = (cardData) => {
  return fetch(`${config.server}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
   }),
  })
 .then((res) => checkRequest(res));
};

//постановка лайка
const setLike = (cardId) => {
  return fetch(`${config.server}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
 .then((res) => checkRequest(res));
};

//удаление лайка
const deleteLike = (cardId) => {
  return fetch(`${config.server}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
 .then((res) => checkRequest(res));
};  

//удаление карточки
const deleteUserCard = (cardId) => {
  return fetch(`${config.server}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
 .then((res) => checkRequest(res));
}; 

//обновление аватара пользователя
const updateUserAvatar = (avatar) => {
  return fetch(`${config.server}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  })
 .then((res) => checkRequest(res));
};

export {getUserInfo, getInitialCards, updateUserInfo, 
 postNewCard, setLike, deleteLike, deleteUserCard, updateUserAvatar}
