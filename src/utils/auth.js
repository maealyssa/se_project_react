import { request } from "./api.js"

const baseUrl = "http://localhost:3001";

const baseHeaders = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const signup = ({ email, password, name, avatar }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    baseHeaders,
    body: JSON.stringify({ email, password, name, avatar }),
  });
};

const signin = (email, password) => {
    return request(`${baseUrl}/signin`, {
        method: "POST",
        baseHeaders,
        body: JSON.stringify({ email, password }),
    });
};

export { signup, signin };