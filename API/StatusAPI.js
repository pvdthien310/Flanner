import DatabaseClient from '../API/DatabaseAPI'

const url = '/status';

 const StatusApi = {

    getAll: async () => {
        const res = await DatabaseClient.get(url);
        return res.data
    },

    getStatusUser: async user => {
        const res = await DatabaseClient.get(url +'/load-data/' + user);
        return res.data
    },
   
}

export default StatusApi;