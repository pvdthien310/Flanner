import AuthClient from '../API/AuthAPI.js'
import DatabaseClient from './DatabaseAPI.js';

const url = '/api/user';

const Api = {
    getAll: async () => {
        const res = await AuthClient.get(url);
        return res.data
    },
    getUserItem : async itemId => {
        const res = await DatabaseClient.get('/user/load-user-by-userID/'+ itemId);
        return res.data;
    }
}

export default Api;