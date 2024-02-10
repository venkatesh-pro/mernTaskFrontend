import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000/api/`,
  timeout: 100000,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const userAuthStr = localStorage.getItem("user");
    if (userAuthStr) {
      const userAuth = JSON.parse(userAuthStr);
      if (userAuth?.token)
        config.headers.Authorization = `Bearer ${userAuth?.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      error?.response?.data?.message === "Expired Token"
    ) {
      localStorage.removeItem("auth");
      window.location.href = "/login";
      return Promise.reject(error);
    } else {
      console.log(error);
      return Promise.reject(error);
    }
  }
);

export default api;
