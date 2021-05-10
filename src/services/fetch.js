import config from "../config/index";

export const getData = async (url) => {
  const response = await fetch(`${config.apiURL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const postData = async (url, data = {}) => {
  const response = await fetch(`${config.apiURL}${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
