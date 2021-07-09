import axios from '../../src/index';

const instance = axios.create({
    baseURL:'http://localhost:3000',
    method:'get'
});
export default instance;