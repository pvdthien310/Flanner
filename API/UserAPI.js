import AuthClient from '../API/AuthAPI.js'
import DatabaseClient from './DatabaseAPI.js';

const url = '/api/user';

const Api = {
    AddUser: async item => {
        const res = await DatabaseClient.post('/user/send-data', item);
        return res.data
    },
    getAll: async () => {
        const res = await DatabaseClient.get('/user');
        return res.data
    },
    getUserItem: async itemId => {
        const res = await DatabaseClient.get('/user/load-user-by-userID/' + itemId);
        return res.data;
    },
    addFollowing: async (userID, friendUserID) => {
        const res = await DatabaseClient.post('/user/add/' + userID + '/following/' + friendUserID);
        return res.data
    },
    addFollowed: async (userID, friendUserID) => {
        const res = await DatabaseClient.post('/user/add/' + userID + '/followed/' + friendUserID);
        return res.data
    },
    removeFollowing: async (userID, friendUserID) => {
        const res = await DatabaseClient.post('/user/remove/' + userID + '/following/' + friendUserID);
        return res.data
    },
    removeFollowed: async (userID, friendUserID) => {
        const res = await DatabaseClient.post('/user/remove/' + userID + '/followed/' + friendUserID);
        return res.data
    },
    updateUser: async updated_User => {
        const res = await DatabaseClient.post('/user/update', updated_User);
        return res.data;
    },
    updateReportNumber: async (updated_User, number) => {
        const res = await DatabaseClient.post('/user/update/' + updated_User + '/' + number);
        return res.data;
    },
    checkLogin: async (email, password) => {
        const res = await AuthClient.post(url + '/checkLogin', {
            email: email,
            password: password
        });
        return res.data;
    },
    checkEmail: async (email) => {
        const res = await AuthClient.post(url + '/checkEmail', {
            email: email,
        });
        return res.data;
    }

}

export default Api;