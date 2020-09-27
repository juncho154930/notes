import http from "../http-common";

class UserDataService {

  register(data) {
    return http.post("/user/register", data);
  }

  login(data) {
    return http.post("/user/login", data);
  }

  updateData(data) {
    return http.post("/user/updateData", data);
  }

  postUserDetails(data) {
  	return http.post("/user/userData", data);
  }

}

export default new UserDataService();