import DatabaseClient from "../API/DatabaseAPI";

const url = "/new-comment";

const NewCommentAPI = {
  addRoot: async (comment) => {
    const res = await DatabaseClient.post(url + "/add-root", comment);
    return res.data;
  },

  addReply: async (reply) => {
    const res = await DatabaseClient.post(url + "/add-reply", reply);
    return res.data;
  },

  delete: async (comment) => {
    const res = await DatabaseClient.put(url + "/delete", comment);
    return res.data;
  },

  deleteAll: async () => {
    const res = await DatabaseClient.delete(url + "/delete-all");
    return res.data;
  },

  update: async (comment) => {
    const res = await DatabaseClient.post(url + "/update", comment);
    return res.data;
  },

  getById: async (id) => {
    const res = await DatabaseClient.get(url + "/" + id);
    return res.data;
  },

  getByPostId: async (id) => {
    const res = await DatabaseClient.get(url + "/load-by-post/" + id);
    return res.data;
  },

  getByDirectParent: async (parentId) => {
    const res = await DatabaseClient.get(url + "/load-by-parent/" + parentId);
    return res.data;
  },

  loadByPostLevel: async (postId, level) => {
    const res = await DatabaseClient.get(
      url + "/load-by-post-level/" + postId + "/" + level
    );
    return res.data;
  },

  reactComment: async (commentId, userId) => {
    const res = await DatabaseClient.put(
      url + "/react/" + commentId + "/" + userId
    );
    return res.data;
  },

  getPagination: async (cursor = 0, postId) => {
    const query = postId + "/" + cursor;
    const res = await DatabaseClient.get(url + "/load/limit-comment/" + query);
    return res.data;
  },

  countCommentsByPostId: async (postId) => {
    const res = await DatabaseClient.get(url + "/count/" + postId);
    return res.data;
  },

  updateUsername: async (info) => {
    /// info includes userId and new username
    const res = await DatabaseClient.put(url + "/update/username", info);
    return res.data;
  },

  reload: async (postId, numOfItems) => {
    const res = await DatabaseClient.get(
      url + "/reload/limit-comment/" + postId + "/" + numOfItems
    );
    return res.data;
  },
};

export default NewCommentAPI;
