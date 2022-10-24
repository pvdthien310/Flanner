import DatabaseClient from "../API/DatabaseAPI";

const url = "/rating/";

const NewCommentAPI = {
  getAll: async () => {
    const res = await DatabaseClient.get(url);
    return res.data;
  },

  getById: async (id) => {
    const res = await DatabaseClient.get(url + id);
    return res.data;
  },

  add: async (data) => {
    const res = await DatabaseClient.post(url, data);
    return res.data;
  },

  update: async (data) => {
    const res = await DatabaseClient.put(url, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await DatabaseClient.delete(url + id);
    return res.data;
  },
};

export default NewCommentAPI;
