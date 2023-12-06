import { createContext, useState } from "react";
import userService from "../services/user.service";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userList, setUserList] = useState(null);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(-1);
  const [errorMessage, setErrorMessage] = useState("");
  // information od user to be edited
  const [editedUser, setEditedUser] = useState({});
  // data URL of uploaded image
  const [image, setImage] = useState(null);
  // name and size of uploaded image
  const [filename, setfilename] = useState("");
  const [fileSize, setFileSize] = useState(0);
  // state of whether modal opening
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  // state to check if there is something in process
  const [inProcess, setInProcess] = useState(false);

  // Change image file to data URL and set state
  const handleImageChange = (e) => {
    if (!inProcess) {
      const file = e.target.files[0];
      if (file) {
        setfilename(file.name);
        setFileSize((file.size / 2 ** 20).toFixed(1));
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // If user discard the uploaded image
  const handleDeleteImage = () => {
    if (!inProcess) {
      setFileSize(0);
      setfilename("");
      setImage(null);
    }
  };

  // Open & close functions for adding user modal
  function openAddModal() {
    setAddModalIsOpen(true);
  }

  function closeAddModal() {
    if (!inProcess) {
      setUsername("");
      setAge(-1);
      setErrorMessage("");
      setFileSize(0);
      setfilename("");
      setImage(null);
      setAddModalIsOpen(false);
    }
  }

  // Open & close functions for editing user modal
  function openEditModal(oldUser) {
    setEditedUser(oldUser);
    setUsername(oldUser.username);
    setAge(oldUser.age);
    setImage(oldUser.thumbnail);
    setEditModalIsOpen(true);
  }

  function closeEditModal() {
    if (!inProcess) {
      setUsername("");
      setAge(-1);
      setErrorMessage("");
      setFileSize(0);
      setfilename("");
      setImage(null);
      setEditModalIsOpen(false);
    }
  }

  // Function for adding user
  const handleAdd = () => {
    if (!inProcess) {
      setInProcess(true);
      if (fileSize > 1) {
        setErrorMessage("File size should be less than 1MB");
        setInProcess(false);
        return;
      }
      userService
        .addUser(username, age, image)
        .then((res) => {
          const newUser = {
            _id: res.data._id,
            username: res.data.username,
            age: res.data.age,
            thumbnail: res.data.thumbnail,
          };
          // set state
          setUserList((prevUser) => [...prevUser, newUser]);
          setInProcess(false);
          alert("Succeeded");
          closeAddModal();
        })
        .catch((err) => {
          setInProcess(false);
          if (err.response) {
            setErrorMessage(err.response.data);
          } else {
            // in case of DB not working
            if (err.message) {
              setErrorMessage(err.message);
            } else {
              setErrorMessage(err);
            }
          }
        });
    }
  };

  // Function for deleting user
  const handleDelete = async (id) => {
    if (!inProcess) {
      setInProcess(true);
      try {
        const result = await userService.deleteUser(id);
        // set state
        const newUserList = userList.filter((user) => {
          return user._id !== id;
        });
        setUserList(newUserList);
        setInProcess(false);
        alert(result.data);
      } catch (error) {
        setInProcess(false);
        if (error.resopnse) {
          return alert(error.response.data);
        } else {
          // in case of DB not working
          if (error.message) {
            return alert(error.message);
          } else {
            return alert(error);
          }
        }
      }
    }
  };

  // Function for editing user
  const handleEdit = async (id) => {
    if (!inProcess) {
      setInProcess(true);
      if (fileSize > 1) {
        setErrorMessage("File size should be less than 1MB");
        setInProcess(false);
        return;
      }
      try {
        const result = await userService.editUser(id, username, age, image);
        // update state
        let newUserList = [...userList];
        for (let i = 0; i < newUserList.length; i++) {
          if (newUserList[i]._id === id) {
            newUserList[i].username = username;
            newUserList[i].age = age;
            newUserList[i].thumbnail = image;
          }
        }
        setUserList(newUserList);
        setInProcess(false);
        alert(result.data);
        closeEditModal();
      } catch (err) {
        setInProcess(false);
        if (err.response) {
          setErrorMessage(err.response.data);
        } else {
          // in case of DB not working
          if (err.message) {
            setErrorMessage(err.message);
          } else {
            setErrorMessage(err);
          }
        }
      }
    }
  };

  // CSS setting for modal
  const customStyles = {
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      width: "50%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "0.5rem",
      maxHeight: "90vh",
      overFlowY: "scroll",
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
    image,
    setImage,
    filename,
    setfilename,
    fileSize,
    setFileSize,
    handleImageChange,
    handleDeleteImage,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
