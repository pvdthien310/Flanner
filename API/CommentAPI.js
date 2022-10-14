import DatabaseClient from "../API/DatabaseAPI";

const url = "/comment";
const url2 = "/new-comment";

const CommentAPI = {
  getAll: async () => {
    const res = await DatabaseClient.get(url);
    return res.data;
  },

  getItembyPostID: async (item) => {
    const res = await DatabaseClient.get(url + "/load-data/" + item);
    return res.data;
  },
  sendNoti: async (newNoti) => {
    const res = await DatabaseClient.post(url + "/send-data", newNoti);
    return res.data.json();
  },
  removeNoti: async (removedNoti) => {
    const res = await DatabaseClient.post(url + "/delete", removedNoti);
    return res.data.json();
  },
  updateTrue: async (item, user) => {
    const res = await DatabaseClient.post(
      url + "/update/" + item + "/true/" + user
    );
    return res.data;
  },
  updateFalse: async (item, user) => {
    const res = await DatabaseClient.post(
      url + "/update/" + item + "/false/" + user
    );
    return res.data;
  },
  AddComment: async (item) => {
    const res = await DatabaseClient.post(url + "/send-data", item);
    return res.data;
  },
  UpdateItem: async (item) => {
    const res = await DatabaseClient.post(url + "/update", item);
    return res.data;
  },
  Delete: async (item) => {
    const res = await DatabaseClient.post(url + "/delete", item);
    return res.data;
  },
  AddRootComment: async (comment) => {
    const res = await DatabaseClient.post(url2 + "/add-root", comment);
    return res.data;
  },
  GetNewCommentsByPostId: async (postId) => {
    const res = await DatabaseClient.get(url2 + `/load-by-post/${postId}`);
    return res.data;
  },
  GetNewCmtById: async (cmtId) => {
    const res = await DatabaseClient.get(url2 + `/${cmtId}`);
    return res.data;
  },
  GetCommentByPostAndLevel: async (postId, level) => {
    const res = await DatabaseClient.get(
      url2 + `/load-by-post-level/${postId}/${level}`
    );
    return res.data;
  },
  GetCommentByItsDirectParent: async (parentCmtId) => {
    const res = await DatabaseClient.get(
      url2 + `/load-by-parent/${parentCmtId}`
    );
    return res.data;
  },
};

export default CommentAPI;
