import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  // baseURL: "http://ci_noobium.test/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
