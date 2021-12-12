import DatabaseClient from '../API/DatabaseAPI'


const url = '/savedpost';

 const SavedPostApi = {

    getAll: async () => {
        const res = await DatabaseClient.get(url);
        return res.data
    },
    
    AddSavedPost: async item => {
        const res = await DatabaseClient.post(url +'/send-data',item );
        return res.data
    },
    GetByUserID: async userID => {
        const res = await DatabaseClient.get(url +'/load-data/' + userID );
        return res.data
    },
    UpdateFalse: async (userID,postID) => {
        const res = await DatabaseClient.post(url +'/update/' + userID +'/false/' + postID );
        return res.data
    },
    UpdateTrue: async (userID,postID) => {
        const res = await DatabaseClient.post(url +'/update/' + userID +'/true/' + postID );
        return res.data
    },
  
}

export default SavedPostApi;