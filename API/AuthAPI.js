import axios from 'axios'
import { URL_local, URL_local_user } from '../constant.js';

 const AuthClient = axios.create({
    baseURL: URL_local_user,
    headers: {
    'Content-Type': 'application/json'
    }
});

export default AuthClient;


