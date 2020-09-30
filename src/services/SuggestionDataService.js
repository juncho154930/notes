import http from "../http-common";

class SuggestionDataService {

  // Basic

  getAll() {
    return http.get("/suggestions");
  }

  get(id) {
    return http.get(`/suggestions/${id}`);
  }

  create(data) {
    return http.post("/suggestions", data);
  }

  update(id, data) {
    return http.put(`/suggestions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/suggestions/${id}`);
  }

  deleteAll() {
    return http.delete(`/suggestions`);
  }

  // End Basic

  addSuggestion(id, newSuggestion) {
    return http.put(`/suggestions/addSuggestion/${id}`, newSuggestion);
  }

  finishSuggestion(id, suggestion) {
    return http.put(`/suggestions/finishSuggestion/${id}`, suggestion);
  }

  updateVote(id, data) {
    return http.put(`/suggestions/updateVote/${id}`, data);
  }

  getNow() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return date +' '+ time;
  }

}

export default new SuggestionDataService();