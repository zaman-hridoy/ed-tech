import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BASE_API,
});

export default instance;
