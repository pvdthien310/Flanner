import DatabaseClient from '../API/DatabaseAPI'

const url = '/knowledge';

 const KnowLedgeApi = {

    getAll: async () => {
        const res = await DatabaseClient.get(url);
        return res.data
    },

    getKnowledgeUser: async user => {
        const res = await DatabaseClient.get(url +'/load-data/' + user);
        return res.data
    },
    getRandom: async () => {
        const res = await DatabaseClient.get(url + '/load-data/newsfeed/random');
        return res.data
    },
    getItem: async item => {
        const res = await DatabaseClient.get(url +'/' + item);
        return res.data
    },

   
}

export default KnowLedgeApi;