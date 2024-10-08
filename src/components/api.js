import { request, checkResponse } from "../utils/requestUtil";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-23",
  headersAuthorization: {
    authorization: "66717d9b-0009-4bde-a5cd-9e6fb6cd2781",
  },
  headersJson: {
    authorization: "66717d9b-0009-4bde-a5cd-9e6fb6cd2781",
    "Content-Type": "application/json",
  },
};

export function getUserData() {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headersAuthorization,
  });
}

export function getInitialCards() {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headersAuthorization,
  });
}

export function updateAvatarToServer(newAvatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headersJson,
    body: JSON.stringify({
      avatar: newAvatarLink,
    }),
  }).then(checkResponse);
}

export function updateUserData(userData) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headersJson,
    body: JSON.stringify({
      name: userData.name,
      about: userData.about,
    }),
  }).then(checkResponse);
}

export function addCardToServer(cardData) {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headersJson,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  });
}

export function setLikeToServer(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headersAuthorization,
  });
}

export function deleteLikeFromServer(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headersAuthorization,
  });
}

export function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headersAuthorization,
  }).then(checkResponse);
}
