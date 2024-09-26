(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-23",headersAuthorization:{authorization:"66717d9b-0009-4bde-a5cd-9e6fb6cd2781"},headersJson:{authorization:"66717d9b-0009-4bde-a5cd-9e6fb6cd2781","Content-Type":"application/json"}},t=document.querySelector("#card-template").content.querySelector(".card"),n=void 0,o=void 0;function r(e){var r=e.card,c=e.likeCallback,a=e.popupOnClickCallback,u=e.popupDeleteCardCallback,i=e.currentUserId,l=t.cloneNode(!0),s=l.querySelector(".card__image");s.src=r.link,s.alt=r.name,s.addEventListener("click",(function(e){return a(e,s)})),l.querySelector(".card__title").textContent=r.name;var d=l.querySelector(".card__delete-button");i!==r.owner._id?d.remove():d.addEventListener("click",(function(){n=l,o=r._id,u()}));var p=l.querySelector(".card__like-button");return p.addEventListener("click",(function(){return c(l,r._id)})),l.querySelector(".card__likes-total").textContent=r?r.likes.length:0,r.likes.some((function(e){return e._id===i}))&&p.classList.toggle("card__like-button_is-active"),l}var c=function(t,n){return function(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:e.headersAuthorization})}(n).then((function(e){e.ok&&t.remove()}))},a=function(t,n){var o=t.querySelector(".card__like-button");o.classList.contains("card__like-button_is-active")?function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headersAuthorization})}(n).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){t.querySelector(".card__likes-total").textContent=e.likes.length})).catch((function(e){console.log(e)})):function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headersAuthorization})}(n).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){t.querySelector(".card__likes-total").textContent=e.likes.length})).catch((function(e){console.log(e)})),o.classList.toggle("card__like-button_is-active")},u={};function i(e){"Escape"===e.key&&d(document.querySelector(".popup_is-opened"))}function l(e){var t=e.target.classList;(t.contains("popup")||t.contains("popup__close"))&&d(u)}function s(e){u=e,e.classList.toggle("popup_is-opened"),document.addEventListener("keydown",i)}function d(e){u={},e.classList.toggle("popup_is-opened"),document.removeEventListener("keydown",i)}function p(e,t,n){var o=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent="",Array.from(e.querySelectorAll(n.inputSelector)).some((function(e){return!e.validity.valid}))||e.querySelector(n.submitButtonSelector).classList.remove(n.inactiveButtonClass)}function f(e,t){e.querySelector(t.submitButtonSelector).classList.add(t.inactiveButtonClass)}function m(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){p(e,n,t)})),f(e,t)}var _=document.querySelector(".places__list"),v=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_new-card"),y=document.querySelector(".popup_type_image"),k=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),S=document.querySelector(".popup__image"),C=document.querySelector(".popup__caption"),E=document.querySelector(".popup_type_delete-card"),q=document.querySelector(".popup_type_edit-avatar"),g=document.querySelectorAll(".popup"),L=document.forms["edit-profile"],A=L.elements.name,x=L.elements.description,j=document.forms["new-place"],U=j.elements["place-name"],P=j.elements.link,D=document.forms["delete-card"],w=document.forms["new-avatar"],z=w.elements.link,J=document.querySelector(".profile__title"),O=document.querySelector(".profile__description"),T=document.querySelector(".profile__image"),B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function I(e,t){S.src=t.src,S.alt=t.alt,C.textContent=t.alt,H(j),s(y)}function N(e){s(E)}function M(e){e.querySelector(".popup__button").textContent="Сохранение..."}function H(e){e.querySelector(".popup__button").textContent="Сохранить"}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){n.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?p(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.name,"-error"));f(e,o),t.classList.add(o.inputErrorClass),r.classList.add(o.errorClass),r.textContent=n}(e,t,t.validationMessage,n)}(e,n,t)}))}))}(t,e)}))}(B),k.addEventListener("click",(function(){A.value=J.textContent,x.value=O.textContent,m(L,B),s(v)})),b.addEventListener("click",(function(){H(L),m(j,B),U.value="",P.value="",s(h)})),g.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("click",l)})),L.addEventListener("submit",(function(t){var n;t.preventDefault(),J.textContent=A.value,O.textContent=x.value,M(L),(n={name:A.value,about:x.value},fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headersJson,body:JSON.stringify({name:n.name,about:n.about})})).then((function(e){if(!e.ok)return Promise.reject("Error: ".concat(e.status));d(v),H(L)})).catch((function(e){console.log(e)}))})),j.addEventListener("submit",(function(t){t.preventDefault();var n={name:U.value,link:P.value};M(j),function(t){return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headersJson,body:JSON.stringify({name:t.name,link:t.link})})}(n).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){_.prepend(r({card:e,deleteCallback:c,likeCallback:a,popupOnClickCallback:I,popupDeleteCardCallback:N,currentUserId:e.owner._id})),d(h),H(j),m(j,B),j.reset()})).catch((function(e){console.log(e)}))})),D.addEventListener("submit",(function(e){e.preventDefault(),c(n,o).then((function(){d(E)}))})),w.addEventListener("submit",(function(t){t.preventDefault(),M(w);var n=w.elements.link.value;(function(t){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headersJson,body:JSON.stringify({avatar:t})})})(n).then((function(e){if(!e.ok)return Promise.reject("Error: ".concat(e.status));T.style.backgroundImage="url(".concat(n,")"),d(q)})).catch((function(e){console.log(e)}))})),T.addEventListener("click",(function(){m(w,B),z.value="",H(w),s(q)})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headersAuthorization}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headersAuthorization}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))}))]).then((function(e){var t=e[0],n=e[1];!function(e){J.textContent=e.name,O.textContent=e.about,T.style.backgroundImage="url(".concat(e.avatar,")")}(t),n.forEach((function(e){return _.append(r({card:e,deleteCallback:c,likeCallback:a,popupOnClickCallback:I,currentUserId:t._id,popupDeleteCardCallback:N}))}))}))})();