import axios from "axios";
import userValidator from "../validator";

const API_URL = "http://localhost:3001/user";

class UserService {
  getUserList() {
    return axios.get(API_URL + "/");
  }

  addUser(username, age) {
    const { error } = userValidator({ username: username, age: age });
    if (error) {
      return new Promise((resolve, reject) => {
        reject(error.details[0].message);
      });
    }
    return axios.post(API_URL + "/add", { username, age });
  }

  editUser(id, username, age) {
    const { error } = userValidator({ username: username, age: age });
    if (error) {
      return new Promise((resolve, reject) => {
        reject(error.details[0].message);
      });
    }
    return axios.put(API_URL + "/edit/" + id, { username, age });
  }

  deleteUser(id) {
    return axios.delete(API_URL + "/delete/" + id);
  }
}

export default new UserService();
