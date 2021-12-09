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
    UpdateFalse: async (itemID,censorID) => {
        const res = await DatabaseClient.post(url +'/update/false/' + itemID +'/' + censorID );
        return res.data
    },
    UpdateTrue: async (itemID,censorID) => {
        const res = await DatabaseClient.post(url +'/update/true/' + itemID +'/' + censorID );
        return res.data
    },
  
}

export default ReportApi;