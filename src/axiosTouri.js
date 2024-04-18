import axios from "axios";
import store from "./Redux/store";

// const { token } = store.getState((store) => store.userSlice);
const { token } = "";

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
