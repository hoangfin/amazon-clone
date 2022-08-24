import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:5001/clone-8ce9f/us-central1/api"
    baseURL: "https://us-central1-clone-8ce9f.cloudfunctions.net/api"
});

export default instance;