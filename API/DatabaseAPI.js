
import axios from 'axios'
import { URL_local } from '../constant.js';
import JWTApi from './JWTAPI.js';


// const { refreshToken } = useSelector(state => { return state.JWT })
// const { accessToken } = useSelector(state => { return state.JWT });

let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoaWVuZGkiLCJpYXQiOjE2MzgxMjEyNzl9.tj2ANRM7TQQ9GgAAAqe0vgDCUPB65-91KeDtdgK-rAI';
let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoaWVuZGkiLCJpYXQiOjE2MzgxMTc1MTIsImV4cCI6MTYzODExNzU0Mn0.7VyjZ6e86_Ri6kgIqsPBmRqmWfUAdtONSs36l-Tkcb8';

const DatabaseClient = axios.create({
    baseURL: URL_local,
    headers: {
        'Content-Type': 'application/json'
    }
});

DatabaseClient.interceptors.request.use(
    config => {
        const token = accessToken
        if (token) {
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)
DatabaseClient.interceptors.response.use(
    res => {
        return res;
    },
    async err => {
        if (err.response) {
            const originalConfig = err.config;
            if (err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await JWTApi.getRefreshToken(refreshToken);
                        accessToken = rs.accessToken;
                        return DatabaseClient(originalConfig);
                    }
                    catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
        }
        return Promise.reject(err);
    }
)

export default DatabaseClient;