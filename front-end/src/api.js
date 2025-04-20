import axios from 'axios';
let baseURLs = "http://localhost:3000";
const api = axios.create({
    baseURL: "http://localhost:3000",
    // withCredentials: true,
});


const googleAuth = (code) => api.get(`/auth/google?code=${code}`, { withCredentials: true });
const getAllPost = () => axios.get(`${baseURLs}/post/get-post`, { withCredentials: true });
const fbLogin = (code) => axios.get(`${baseURLs}/auth/facebook?userId=${code.id}&name=${code.name}&imageURL=${code.url}`, { withCredentials: true });

export {googleAuth, getAllPost, fbLogin}