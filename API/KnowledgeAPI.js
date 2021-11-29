import DatabaseClient from '../API/DatabaseAPI'

const url = '/knowledge/';

 const KnowLedgeApi = {
    getAll: async () => {
        const res = await DatabaseClient.get(url);
        return res.data
    },
}
export default KnowLedgeApi;