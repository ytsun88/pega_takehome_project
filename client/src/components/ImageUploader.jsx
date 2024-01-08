import React, { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const ImageUploader = () => {
  const { handleImageChange, filename, image, setImage, handleDeleteImage } =
    useContext(UserContext);
  return (
    <div className="imageContainer">
      <label className="uploadButton">
        Upload image
        <input
          type="file"
          onChange={handleImageChange}
          className="imageUpload"
        />
      </label>
      <span>
        {filename}{" "}
        {image && (
          <button className="deleteImage" onClick={handleDeleteImage}>
            &#128465;
          </button>
        )}
      </span>
      {image && <img className="image" src={image} alt="Preview" />}
    </div>
  );
};

export default ImageUploader;
