import React from "react";
import Modal from "react-modal";
import userService from "../services/user.service";

const AddUserModal = () => {
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
  return (
    <div>
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

export default AddUserModal;
