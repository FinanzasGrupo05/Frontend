import axios from "axios";
export default axios.create({
    //baseURL: "https://app-250303011850.azurewebsites.net/",
    baseURL: "http://localhost:8080/",
    headers: {
        "Content-type": "application/json"
    }
})