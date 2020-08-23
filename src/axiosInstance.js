import axios from 'axios';

const instance = axios.create({
    baseURL: "https://pipe-code-api.herokuapp.com"
    // baseURL: "http://localhost:1337"
});

export default instance;