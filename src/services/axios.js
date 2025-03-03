import axios from "axios";
export default axios.create({
    baseURL: "https://app-250303000531.azurewebsites.net/",
    headers: {
        "Content-type": "application/json"
    }
})