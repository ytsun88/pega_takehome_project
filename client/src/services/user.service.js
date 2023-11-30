import axios from "axios";

const API_URL = "http://localhost:3001/user";

class UserService {
  getUserList() {
    return axios.get(API_URL + "/");
  }

  addUser(username, age) {
    return axios.post(API_URL + "/add", { username, age });
  }

  editUser(id, username, age) {
    return axios.put(API_URL + "/edit/" + id, { username, age });
  }

  deleteUser(id) {
    return axios.delete(API_URL + "/delete/" + id);
  }
}

export default new UserService();
