import axios from "axios";

const instance = axios.create({
  baseURL: "https://chat-app-go.onrender.com",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const headers = config.headers;

    if (localStorage.getItem("token") && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    }
    config.headers = headers;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    if (error?.response?.status === 401 || error.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default instance;
