import DatabaseClient from '../API/DatabaseAPI'

const url = '/notification';

 const NotificationApi = {

    getKnowledge: async user => {
        const res = await DatabaseClient.get(url +'/load-data/' + user + '/knowledge');
        return res.data
    },
    getStatus: async user => {
        const res = await DatabaseClient.get(url +'/load-data/' + user + '/status');
        return res.data
    },
    getSystem: async user => {
        const res = await DatabaseClient.get(url +'/load-data/' + user + '/system');
        return res.data
    },
    sendNoti : async newNoti => {
        const res = await DatabaseClient.post(url +'/send-data/',newNoti);
        return res.data;
    },
    removeNoti : async removedNoti => {
        const res = await DatabaseClient.post(url +'/delete/', removedNoti);
        return res.data;
    },
   
}

export default NotificationApi;