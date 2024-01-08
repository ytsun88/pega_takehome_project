import axios from "axios";
import userValidator from "../validator";

const API_URL = "http://localhost:8000/user";

class UserService {
  // get all users
  getUserList() {
    return axios.get(API_URL + "/");
  }

  // add a new user
  addUser(username, age, thumbnail) {
    const { error } = userValidator({ username: username, age: age });
    if (error) {
      return new Promise((resolve, reject) => {
        reject(error.details[0].message);
      });
    }
    return axios.post(API_URL + "/add", { username, age, thumbnail });
  }

  // update a user's information
  editUser(id, username, age, thumbnail) {
    const { error } = userValidator({ username: username, age: age });
    if (error) {
      return new Promise((resolve, reject) => {
        reject(error.details[0].message);
      });
    }
    return axios.put(API_URL + "/edit/" + id, { username, age, thumbnail });
  }

  // delete a user
  deleteUser(id) {
    return axios.delete(API_URL + "/delete/" + id);
  }
}

export default new UserService();
