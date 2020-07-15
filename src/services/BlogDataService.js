import http from "../http-common";

class BlogDataService {

  // Basic

  getAll() {
    return http.get("/blogs");
  }

  get(id) {
    return http.get(`/blogs/${id}`);
  }

  create(data) {
    return http.post("/blogs", data);
  }

  update(id, data) {
    return http.put(`/blogs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/blogs/${id}`);
  }

  deleteAll() {
    return http.delete(`/blogs`);
  }

  findByTitle(title) {
    return http.get(`/blogs?title=${title}`);
  }

  // End Basic

  getNow() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return date +' '+ time;
  }

  // getAllSorted() {
  //   return this.getAll()
  //       .then(response => {
  //         // this.blogs.sort((a, b) => a.name - b.name );
  //         return response;
  //       })
  // }

}

export default new BlogDataService();