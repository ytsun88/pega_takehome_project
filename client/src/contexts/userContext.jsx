import { createContext, useState } from "react";
import userService from "../services/user.service";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userList, setUserList] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(-1);
  const [editedUser, setEditedUser] = useState({});
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function openAddModal() {
    setAddModalIsOpen(true);
  }

  function closeAddModal() {
    setErrorMessage("");
    setAddModalIsOpen(false);
  }

  function openEditModal(oldUser) {
    setEditedUser(oldUser);
    setUsername(oldUser.username);
    setAge(oldUser.age);
    setEditModalIsOpen(true);
  }

  function closeEditModal() {
    setErrorMessage("");
    setEditModalIsOpen(false);
  }
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
        if (err.response) {
          setErrorMessage(err.response.data);
        } else {
          setErrorMessage(err);
        }
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
      return user._id !== id;
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
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data);
      } else {
        setErrorMessage(err);
      }
    }
  };

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

  const contextValue = {
    userList,
    setUserList,
    username,
    setUsername,
    age,
    setAge,
    editedUser,
    setEditedUser,
    addModalIsOpen,
    setAddModalIsOpen,
    editModalIsOpen,
    setEditModalIsOpen,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    handleAdd,
    handleDelete,
    handleEdit,
    errorMessage,
    setErrorMessage,
    customStyles,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
