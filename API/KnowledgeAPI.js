import DatabaseClient from "../API/DatabaseAPI";

const url = "/knowledge";

const KnowLedgeApi = {
  getAll: async () => {
    const res = await DatabaseClient.get(url);
    return res.data;
  },
  getKnowledgeUser: async (user) => {
    const res = await DatabaseClient.get(url + "/load-data/" + user);
    return res.data;
  },
  getKnowledgeUserForFriend: async (user) => {
    const res = await DatabaseClient.get(url + "/load-data/friend/" + user);
    return res.data;
  },
  getPagination: async (cursor = null) => {
    let query = "";
    if (cursor) {
      query = "?cursor=" + cursor;
    }
    const res = await DatabaseClient.get(url + "/load-data/newsfeeds" + query);
    return res.data;
  },
  getRandom: async () => {
    const res = await DatabaseClient.get(url + "/load-data/newsfeed/random");
    return res.data;
  },
  getItem: async (item) => {
    const res = await DatabaseClient.get(url + "/" + item);
    return res.data;
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
  AddPost: async (item) => {
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
  UpdatePublic: async (postID) => {
    const res = await DatabaseClient.post(
      url + "/update/mode/" + postID + "/public"
    );
    return res.data;
  },
  UpdatePrivate: async (postID) => {
    const res = await DatabaseClient.post(
      url + "/update/mode/" + postID + "/private"
    );
    return res.data;
  },
  UpdateLimitary: async (postID) => {
    const res = await DatabaseClient.post(
      url + "/update/mode/" + postID + "/limitary"
    );
    return res.data;
  },
  UpdateUserInfo: async (item) => {
    const res = await DatabaseClient.post(url + "/update-post", item);
    return res.data;
  },
};

export default KnowLedgeApi;
