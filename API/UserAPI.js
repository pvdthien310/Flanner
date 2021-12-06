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
    },
    addFollowing: async (userID,friendUserID) => {
        const res = await DatabaseClient.post('/user/add/' + userID + '/following/' + friendUserID );
        return res.data
    },
    addFollowed: async (userID,friendUserID) => {
        const res = await DatabaseClient.post('/user/add/' + userID + '/followed/' + friendUserID );
        return res.data
    },
    removeFollowing: async (userID,friendUserID) => {
        const res = await DatabaseClient.post('/user/remove/' + userID + '/following/' + friendUserID );
        return res.data
    },
    removeFollowed: async (userID,friendUserID) => {
        const res = await DatabaseClient.post('/user/remove/' + userID + '/followed/' + friendUserID );
        return res.data
    },
    updateUser: async updated_User => {
        const res = await DatabaseClient.post('/user/update', updated_User);
        return res.data;
    } 
    
}

export default Api;