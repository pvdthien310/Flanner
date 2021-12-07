import DatabaseClient from '../API/DatabaseAPI'


const url = '/report';

 const ReportApi = {

    getAll: async () => {
        const res = await DatabaseClient.get(url);
        return res.data
    },
    
    AddPost: async item => {
        const res = await DatabaseClient.post(url +'/send-data',item );
        return res.data
    },
    UpdateItem: async item => {
        const res = await DatabaseClient.post(url +'/update/isSeen',item );
        return res.data
    },
  
}

export default ReportApi;