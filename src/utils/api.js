const baseUrl = "http://localhost:3001";

const baseHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

const getItems = () => {
  return request(`${baseUrl}/items`);
};

const postItems = ({ name, imageUrl, weather }, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  })
};

const deleteItems = (_id, token) => {
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUserInfo = (token) => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });
}

export { getItems, postItems, deleteItems, request, getUserInfo };
