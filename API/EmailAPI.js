import AuthClient from '../API/AuthAPI.js'
import DatabaseClient from './DatabaseAPI.js';

const url = '/api/sendEmail';

const Api = {
    AddUser: async item => {
        const res = await DatabaseClient.post('/user/send-data', item);
        return res.data
    },
}

export default Api;