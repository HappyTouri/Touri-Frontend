import axios from "axios";
// import { useSelector } from "react-redux";
import store from "./Redux/store";
// import store from "./Redux/store";


// const state = store.getState();
// const { token } = state.auth;
const token = localStorage.getItem('token')

const headers = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
  Authorization: `Bearer ${token}`,
};

const axiosTouri = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
  // baseURL: "http://dev.happytouri.com/api/",
  headers,
});
export default axiosTouri;

// api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/', // Replace this with your API base URL
//   timeout: 10000, // Timeout in milliseconds
//   headers: {
//     'Content-Type': 'application/vnd.api+json',
//     'Accept':'application/vnd.api+json'
//     // Add any default headers you need
//   },
// });

// // You can also add interceptors for request and response
// api.interceptors.request.use(
//   (config) => {
//     const token =localStorage.getItem('token');
    
//     // If token exists, add it to the Authorization header
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     // Modify response data before resolving
//     return response;
//   },
//   (error) => {
//     // Handle response error
//     return Promise.reject(error);
//   }
// );

// export default api;
