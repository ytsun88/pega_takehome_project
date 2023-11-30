import React, { useContext } from "react";
import Modal from "react-modal";
import { UserContext } from "../contexts/userContext";

const EditUserModal = () => {
  Modal.setAppElement(document.getElementById("root"));
  const {
    editModalIsOpen,
    closeEditModal,
    editedUser,
    setAge,
    setUsername,
    handleEdit,
    errorMessage,
    customStyles,
  } = useContext(UserContext);

  return (
    <div>
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
        {errorMessage !== "" && (
          <div className="errorMessage">{errorMessage}</div>
        )}
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

export default EditUserModal;
