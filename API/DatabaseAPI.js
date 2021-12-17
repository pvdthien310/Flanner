import axios from 'axios'
import {AsyncStorage} from 'react-native';
import { URL_local } from '../constant.js';
import JWTApi from './JWTAPI.js';


// const { refreshToken } = useSelector(state => { return state.JWT })
// const { accessToken } = useSelector(state => { return state.JWT });


const DatabaseClient = axios.create({
    baseURL: URL_local,
    headers: {
        'Content-Type': 'application/json'
    }
});

DatabaseClient.interceptors.request.use(
    async (config) => {
        let token = await AsyncStorage.getItem('accessToken');
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
                        const refreshToken = await AsyncStorage.getItem('refreshToken');
                        const rs = await JWTApi.getRefreshToken(refreshToken);
                        await AsyncStorage.setItem('accessToken',rs.accessToken)
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