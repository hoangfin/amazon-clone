import axios from "axios";

export const get = async (url, config) => {
    return await axios.get(url, config);
};

export const post = async (url, data, config) => {
    return await axios.post(url, data, config);
};