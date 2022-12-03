import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-prod.artemisconsulting.io",
});

export default instance;

export const SetAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["X-Auth-Token"] = token;
  } else {
    delete axios.defaults.headers.common["X-Auth-Token"];
  }
};
export const userFromLocalStorage = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  user = user != null ? user : {};
  return user;
};

// dev
// https://art-dev.zoracorp.com

// prod
// https://api-prod.artemisconsulting.io

/// fadfadfadfdf
// aliul@zoracorp.com
// Xs*!nn!zSTT5
