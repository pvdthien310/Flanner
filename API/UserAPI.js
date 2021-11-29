import AuthClient from '../API/AuthAPI.js'

const url = 'api/user/';

const Api = {
    getAll: async () => {
        const res = await AuthClient.get(url);
        return res.data
    },
    getItem : async itemId => {
        const res = await AuthClient.get(url + 'load-user-by-userID/'+ itemId);
        return res.data
    }
}

export default Api;