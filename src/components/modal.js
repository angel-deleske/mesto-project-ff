function openPopup(popup) {
  popup.classList.add('popup_is-animated','popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
};

function closeByEsc(evt) {
  if(evt.key === "Escape"){
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

export {openPopup, closePopup};
