import axios from "axios";

// Change baseURL if backend runs elsewhere (e.g., Render)
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;
