import axios from "axios";
//
const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URI,
});

export default API;
