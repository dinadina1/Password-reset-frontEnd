import axios from "axios";

// define base url
const BASE_URL = "https://password-reset-qh1e.onrender.com";

// create axios instance
const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

// create axios protected instance
const protectedInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials:true
})

// exports variables
export {instance, protectedInstance};