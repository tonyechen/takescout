import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/takeout-1183f/us-central1/api',
    // THE API (cloud function) URL
});
// testing baseURL: http://localhost:5001/clone-123c4/us-central1/api
export default instance;
