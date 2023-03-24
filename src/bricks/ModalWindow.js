import React, { useState } from "react";
import "../css/ModalWindow.css";

const ModalWindow = ({ onClose, onAddVideo }) => {
  const [formData, setFormData] = useState({
    url: "",
    name: "",
    author: "",
    length: "",
    dateofrelease: "",
    genre: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddVideo(formData)
    onClose();
  };

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Add Video</h2>
        <form onSubmit={handleSubmit}>
          <label>URL Address:</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
          <label>Name of the Video:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <label>Length:</label>
          <input
            type="text"
            name="length"
            value={formData.length}
            onChange={handleChange}
          />
          <label>Date of Release:</label>
          <input
            type="text"
            name="dateofrelease"
            value={formData.dateofrelease}
            onChange={handleChange}
          />
          <label>Topics:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ModalWindow;
