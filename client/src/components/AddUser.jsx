import React, { useEffect, useState } from "react";
import userService from "../services/user.service";
import Modal from "react-modal";
import "./style.css";

const AddUser = () => {
  const [userList, setUserList] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(-1);
  const [editedUser, setEditedUser] = useState({});
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  Modal.setAppElement(document.getElementById("root"));
  const customStyles = {
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      width: "30%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "0.5rem",
    },
  };

  function openAddModal() {
    setAddModalIsOpen(true);
  }

  function closeAddModal() {
    setAddModalIsOpen(false);
  }

  function openEditModal(oldUser) {
    setEditedUser(oldUser);
    setUsername(oldUser.username);
    setAge(oldUser.age);
    setEditModalIsOpen(true);
  }

  function closeEditModal() {
    setEditModalIsOpen(false);
  }

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

  const handleAdd = () => {
    userService
      .addUser(username, age)
      .then((res) => {
        const newUser = {
          _id: res.data._id,
          username: res.data.username,
          age: res.data.age,
        };
        setUserList((prevUser) => [...prevUser, newUser]);
        setUsername("");
        setAge(-1);
        alert("Succeeded");
        setAddModalIsOpen(false);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const handleDelete = async (id) => {
    try {
      const result = await userService.deleteUser(id);
      alert(result.data);
    } catch (error) {
      console.log(error);
      return alert(error.response.data);
    }
    const newUserList = userList.filter((user) => {
      return user._id != id;
    });
    setUserList(newUserList);
  };

  const handleEdit = async (id) => {
    try {
      const result = await userService.editUser(id, username, age);
      let newUserList = [...userList];
      for (let i = 0; i < newUserList.length; i++) {
        if (newUserList[i]._id === id) {
          newUserList[i].username = username;
          newUserList[i].age = age;
        }
      }
      setUserList(newUserList);
      setUsername("");
      setAge(-1);
      alert(result.data);
      closeEditModal();
    } catch (error) {
      console.log(error);
      return alert(error.response.data);
    }
  };

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

      <button className="addUser" onClick={openAddModal}>
        Add
      </button>
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        style={customStyles}
        id="addUserModal"
      >
        <button className="closeButton" onClick={closeAddModal}>
          ✖
        </button>
        <h3 className="modalHeader">Create a new user</h3>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="age">Age: </label>
        <input
          type="number"
          id="age"
          name="age"
          autoComplete="off"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <button className="addButton" onClick={handleAdd}>
          Add User
        </button>
      </Modal>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        style={customStyles}
        id="editUserModal"
      >
        <button className="closeButton" onClick={closeEditModal}>
          ✖
        </button>
        <h3 className="modalHeader">Edit the user</h3>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          defaultValue={editedUser.username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="age">Age: </label>
        <input
          type="number"
          id="age"
          name="age"
          autoComplete="off"
          defaultValue={editedUser.age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <button className="editUser" onClick={() => handleEdit(editedUser._id)}>
          Edit User
        </button>
      </Modal>
    </div>
  );
};

export default AddUser;
