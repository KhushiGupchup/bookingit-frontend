import axios from "axios";

// Change baseURL if backend runs elsewhere (e.g., Render)
const API = axios.create({
  baseURL: "https://bookit-backend-1-xhzr.onrender.com/",
});

export default API;


