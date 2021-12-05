import AuthClient from '../API/AuthAPI.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const JWTApi = {
    getToken: async data => {
        const res = await AuthClient.get('/get-accessToken', { username: data });
        try {
            await AsyncStorage.setItem('accessToken',res.data.accessToken);
        } catch (e)
        {
            console.log('AsyncStorage Error');
        }
        try {
            await AsyncStorage.setItem('refreshToken',res.data.refreshToken);
        } catch (e)
        {
            console.log('AsyncStorage Error');
        }
        return res.data;
    },
    getRefreshToken: async refToken => {
        const res = await AuthClient.post('/get-refreshToken', { token: refToken  });
        return res.data;
    },
    logout: async refToken => {
        const res = await AuthClient.get('/logout', { token: refToken });
        return res.data
    }
}
export default JWTApi