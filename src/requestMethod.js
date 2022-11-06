import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";
// var TOKEN = "";
var TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).token;


// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).token)

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{Authorization: `Bearer ${TOKEN}`}
})

// export default TOKEN