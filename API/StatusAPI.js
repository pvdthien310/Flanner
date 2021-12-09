import DatabaseClient from '../API/DatabaseAPI'


const url = '/status';

 const StatusApi = {

    getAll: async () => {
        const res = await DatabaseClient.get(url);
        return res.data
    },
    getRandom: async (userID) => {
        const res = await DatabaseClient.get(url + '/load-data/newsfeed/random/' + userID);
        return res.data
    },
    getStatusUser: async user => {
        const res = await DatabaseClient.get(url +'/load-data/' + user);
        return res.data
    },
    getStatusUserForFriend: async user => {
        const res = await DatabaseClient.get(url +'/load-data/friend/' + user);
        return res.data
    },
    getItem: async item => {
        const res = await DatabaseClient.get(url +'/' + item);
        return res.data
    },
    sendNoti : async newNoti => {
        const res = await DatabaseClient.post(url +'/send-data', newNoti);
        return res.data.json()
    },
    removeNoti : async removedNoti => {
        const res = await DatabaseClient.post(url +'/delete', removedNoti);
        return res.data.json()
    },
    updateTrue: async (item,user) => {
        const res = await DatabaseClient.post(url +'/update/' + item + '/true/' + user );
        return res.data
    },
    updateFalse: async (item,user) => {
        const res = await DatabaseClient.post(url +'/update/' + item + '/false/' + user );
        return res.data
    },
    AddPost: async item => {
        const res = await DatabaseClient.post(url +'/send-data',item );
        return res.data
    },
    UpdateItem: async item => {
        const res = await DatabaseClient.post(url +'/update',item );
        return res.data
    },
    Delete: async item => {
        const res = await DatabaseClient.post(url +'/delete',item );
        return res.data
    },
    UpdatePublic: async postID => {
        const res = await DatabaseClient.post(url +'/update/mode/'+ postID +'/public' );
        return res.data
    },
    UpdatePrivate: async postID => {
        const res = await DatabaseClient.post(url +'/update/mode/'+ postID +'/private' );
        return res.data
    },
    UpdateLimitary: async postID => {
        const res = await DatabaseClient.post(url +'/update/mode/'+ postID +'/limitary' );
        return res.data
    },
}

export default StatusApi;