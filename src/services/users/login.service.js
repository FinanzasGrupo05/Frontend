import axios from "@/services/axios.js";
export default async function (username, password) {
    return await axios.post('/user/login', {username, password})
}