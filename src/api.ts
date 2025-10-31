import axios from "axios";

// Change baseURL if backend runs elsewhere (e.g., Render)
const API = axios.create({
  baseURL: "https://bookit-backend-fas6.onrender.com/",
});

export default API;

