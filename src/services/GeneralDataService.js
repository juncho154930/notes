import http from "../http-common";

class GeneralDataService {

  // Basic

  getAll() {
    return http.get("/data");
  }

  get(id) {
    return http.get(`/data/${id}`);
  }

  create(data) {
    return http.post("/data", data);
  }

  update(id, data) {
    return http.put(`/data/${id}`, data);
  }

  delete(id) {
    return http.delete(`/data/${id}`);
  }

  deleteAll() {
    return http.delete(`/data`);
  }

  // End Basic

  getNow() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return date +' '+ time;
  }

}

export default new GeneralDataService();