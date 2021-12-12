import axios from "axios";
export const baseUrl = "https://app.subsocial.network/subid/";
// export let baseUrl = process.env.REACT_APP_BASE_URL;

export const httpGet = async (url) => {
  if (!navigator.onLine) {
    return alert("Please check your internet");
  }
  try {
    const res = await axios.get(`${baseUrl}${url}`);
    return res.data;
  } catch (error) {
    return { er: error.response.data };
  }
};

export const httpPost = async (url, postBody) => {
  if (!navigator.onLine) {
    return alert("Please check your internet");
  }
  try {
    const res = await axios.post(`${baseUrl}${url}`, postBody, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data;
  } catch (error) {
    return { er: error.response.data };
  }
};
