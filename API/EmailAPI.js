import AuthClient from "../API/AuthAPI.js";
import DatabaseClient from "./DatabaseAPI.js";

const url = "/sendEmail";

const Api = {
  sendEmail: async (item) => await DatabaseClient.post(url, item),
};

export default Api;
