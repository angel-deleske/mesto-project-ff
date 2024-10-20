(()=>{"use strict";var e={server:"https://mesto.nomoreparties.co/v1/wff-cohort-24",headers:{authorization:"d9e7d845-a2d1-440b-9422-90f85f134bd3","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__like-button"),a=c.querySelector(".card__delete-button"),i=c.querySelector(".card__image"),l=c.querySelector(".card__title"),s=c.querySelector(".card__like-counter"),d=e.likes.some((function(e){return e._id===t}));return i.src=e.link,i.alt=e.name,l.textContent=e.name,s.textContent=e.likes.length,u.addEventListener("click",(function(){n(e._id,c)})),e.owner._id===t?a.addEventListener("click",(function(){return r(e._id,c)})):a.remove(),d?u.classList.add("card__like-button_is-active"):u.classList.remove("card__like-button_is-active"),i.addEventListener("click",(function(){o(e.link,e.name,e.name)})),c},r=function(n,r){(function(n){return fetch("".concat(e.server,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))})(n).then((function(){r.remove()})).catch((function(e){console.log(e)}))},o=function(n,r){var o=r.querySelector(".card__like-button"),c=r.querySelector(".card__like-counter");o.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.server,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(n).then((function(e){o.classList.remove("card__like-button_is-active"),c.textContent=e.likes.length})).catch((function(e){return console.log(e)})):function(n){return fetch("".concat(e.server,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(n).then((function(e){o.classList.add("card__like-button_is-active"),c.textContent=e.likes.length})).catch((function(e){return console.log(e)}))};function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}function a(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}var i=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));r&&(t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent="")},l=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled",!1)):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",!0))},s=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);r.classList.add(t.inactiveButtonClass),r.setAttribute("disabled",!0),n.forEach((function(n){i(e,n,t),n.setCustomValidity("")}))};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p,f=document.querySelector(".places__list"),_=document.querySelector(".profile__edit-button"),m=document.querySelector(".popup_type_edit"),v=document.querySelector('[name = "edit-profile"]'),y=document.querySelector(".popup__input_type_name"),h=document.querySelector(".popup__input_type_description"),b=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),q=document.querySelector(".popup__caption"),g=document.querySelector(".popup_type_image"),C=g.querySelector(".popup__image"),k=document.querySelectorAll(".popup__close"),E=document.querySelector('[name="edit-avatar"]'),L=document.querySelector(".popup_type_avatar"),A=document.querySelector(".profile__image"),x=L.querySelector(".popup__input_type_url"),w=document.querySelector(".popup_type_new-card"),T=document.querySelector(".profile__add-button"),j=document.querySelector('[name = "new-place"]'),B=j.querySelector(".popup__input_type_card-name"),O=j.querySelector(".popup__input_type_url"),D=m.querySelector(".popup__button"),P=w.querySelector(".popup__button"),I=L.querySelector(".popup__button"),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:".popup__input_type_error",errorClass:".popup__error_visible"};function N(e,t){c(g),C.src=e,C.alt=t,q.textContent=t}j.addEventListener("submit",(function(c){var a;c.preventDefault(),P.textContent=P.getAttribute("data-loading"),(a={name:B.value,link:O.value},fetch("".concat(e.server,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a.name,link:a.link})}).then((function(e){return t(e)}))).then((function(e){var t=n(e,p,o,r,N);f.prepend(t),u(w)})).catch((function(e){console.log(e)})).finally((function(){P.textContent=P.getAttribute("button-default-text")}))})),A.addEventListener("click",(function(){E.reset(),s(L,M),c(L)})),L.addEventListener("submit",(function(n){var r;n.preventDefault(),I.textContent=I.getAttribute("data-loading"),(r=x.value,fetch("".concat(e.server,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(e){A.style.backgroundImage="url(\\".concat(e.avatar,")"),u(L)})).catch((function(e){return console.log(e)})).finally((function(){return I.textContent=I.getAttribute("button-default-text")}))})),_.addEventListener("click",(function(){s(m,M),c(m),y.value=b.textContent,h.value=S.textContent})),v.addEventListener("submit",(function(n){var r,o;n.preventDefault(),D.textContent=D.getAttribute("data-loading"),(r=y.value,o=h.value,fetch("".concat(e.server,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return t(e)}))).then((function(e){b.textContent=e.name,S.textContent=e.about,u(m)})).catch((function(e){return console.log(e)})).finally((function(){return D.textContent=D.getAttribute("button-default-text")})),u(m)})),T.addEventListener("click",(function(){j.reset(),s(w,M),c(w)})),k.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return u(t)})),t.addEventListener("mousedown",(function(e){e.target===e.currentTarget&&u(t)}))})),Promise.all([fetch("".concat(e.server,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.server,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,c,u=(c=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,c)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=u[0],i=u[1];p=a._id,A.style.backgroundImage="url(\\".concat(a.avatar,")"),b.textContent=a.name,S.textContent=a.about,i.forEach((function(e){f.append(n(e,p,o,r,N))}))})).catch((function(e){return console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,n):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),r.textContent=t.validationMessage,r.classList.add(n.errorClass)}(e,t,n)}(e,o,t),l(n,r,t)}))}))}(t,e)}))}(M)})();