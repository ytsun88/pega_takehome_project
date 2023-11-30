import React, { useContext, useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import userService from "../services/user.service";

import "./style.css";
import AddUserModal from "./AddUserModal";
import { UserContext } from "../contexts/userContext";
import EditUserModal from "./EditUserModal";

const UserList = () => {
  const { setUserList, userList, openEditModal, handleDelete, openAddModal } =
    useContext(UserContext);

  useEffect(() => {
    userService
      .getUserList()
      .then((response) => {
        setUserList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const headers = [
    { label: "id", key: "_id" },
    { label: "username", key: "username" },
    { label: "age", key: "age" },
  ];

  return (
    <div className="container">
      <h1 className="header">User List:</h1>
      <div className="listContainer">
        {userList.length === 0 && <h2>Please add a user</h2>}
        {userList.map((user) => (
          <div className="userList" key={user._id}>
            <div className="userData">
              {user.username} ({user.age} years old)
            </div>
            <div className="DEbuttons">
              <button
                className="editButton"
                onClick={() => openEditModal(user)}
              >
                Edit
              </button>
              <button
                className="deleteButton"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="buttonContainer">
        <button className="addUser" onClick={openAddModal}>
          Add
        </button>
        <CSVLink data={userList} headers={headers} filename={"my-file.csv"}>
          <button className="exportButton">Export</button>
        </CSVLink>
      </div>
      <AddUserModal />
      <EditUserModal />
    </div>
  );
};

export default UserList;
