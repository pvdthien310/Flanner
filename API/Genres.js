import DatabaseClient from "./DatabaseAPI";

const url = "/genre";

const GenreApi = {
  getAll: async () => await DatabaseClient.get(url),
  getById: async (id) => await DatabaseClient.get(`${url}/${id}`),
  create: async (genre) => await DatabaseClient.post(url, genre),
  updateById: async (genre) => await DatabaseClient.put(`${url}/${id}`, genre),
  delete: async (id) => await DatabaseClient.delete(`${url}/${id}`),
};

export default GenreApi;
