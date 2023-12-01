import React, { useContext } from "react";
import Modal from "react-modal";
import { UserContext } from "../contexts/userContext";
import ImageUploader from "./ImageUploader";

const AddUserModal = () => {
  Modal.setAppElement(document.getElementById("root"));
  const {
    addModalIsOpen,
    closeAddModal,
    handleAdd,
    setAge,
    setUsername,
    errorMessage,
    customStyles,
  } = useContext(UserContext);
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
        {errorMessage !== "" && (
          <div className="errorMessage">{errorMessage}</div>
        )}
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
        <ImageUploader />
        <button className="addButton" onClick={handleAdd}>
          Add User
        </button>
      </Modal>
    </div>
  );
};

export default AddUserModal;
