import { createContext } from "react";

export const userContext = createContext();

export const userContextProvider = (props) => {
  const [userList, setUserList] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(-1);
  const [editedUser, setEditedUser] = useState({});
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
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
  };

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};
