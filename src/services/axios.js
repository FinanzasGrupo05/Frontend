import axios from "axios";
export default axios.create({
    baseURL: "https://app-250303011850.azurewebsites.net/",
    headers: {
        "Content-type": "application/json"
    }
})