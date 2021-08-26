const setToLocalStorage = ({ authToken, email, userId, username }) => {
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("email", email);
  localStorage.setItem("userId", userId);
  localStorage.setItem("username", username);
};

const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

export { setToLocalStorage, getFromLocalStorage };
