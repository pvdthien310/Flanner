import DatabaseClient from "../API/DatabaseAPI";

const url = "/new-comment";

const NewCommentAPI = {
  addRoot: async (comment) => {
    const res = await DatabaseClient.get(url + "/add-root", comment);
    return res.data;
  },

  addReply: async (reply) => {
    const res = await DatabaseClient.get(url + "/add-reply", reply);
    return res.data;
  },

  delete: async (comment) => {
    const res = await DatabaseClient.get(url + "/delete", comment);
    return res.data;
  },

  deleteAll: async () => {
    const res = await DatabaseClient.get(url + "/delete-all");
    return res.data;
  },

  update: async (comment) => {
    const res = await DatabaseClient.get(url + "/update", comment);
    return res.data;
  },

  getById: async (id) => {
    const res = await DatabaseClient.get(url + "/" + id);
    return res.data;
  },

  getByPostId: async (id) => {
    const res = await DatabaseClient.get(url + "/load-by-post/", id);
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
    const res = await DatabaseClient.get(
      url + "/react/" + comment + "/" + userId
    );
    return res.data;
  },

  getPagination: async (cursor = 0, postId) => {
    const query = postId + "/" + cursor;
    const res = await DatabaseClient.get(url + "/load/limit-comment/" + query);
    return res.data;
  },
};

export default NewCommentAPI;
