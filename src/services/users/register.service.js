import axios from "@/services/axios.js";
export default async function ({username, password, name, sex}) {
    return ( await axios.post('/user', {name, sex, username, password}) ).data
}