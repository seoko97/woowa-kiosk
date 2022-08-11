import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3065/api" : process.env.HOST;

export default axios;
