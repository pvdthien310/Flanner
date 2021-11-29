import AuthClient from '../API/AuthAPI.js'

const JWTApi = {
    getToken: async data => {
        const res = await AuthClient.get('/get-accessToken', { username: data });
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