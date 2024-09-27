export function checkResponseJSON(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}

export function checkResponse(response) {
  if (response.ok) {
    return response;
  }

  return Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) { 
  return fetch(url, options).then(checkResponseJSON);
}