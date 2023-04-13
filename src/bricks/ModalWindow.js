import React, { useState } from "react";
import "../css/ModalWindow.css";

const ModalWindow = ({ onClose, onAddVideo }) => {
  const [formData, setFormData] = useState({
    url: "",
    name: "",
    author: "",
    length: 0,
    dateofrelease: 0,
    description: "",
    genre: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      ...formData,
      length: parseInt(formData.length),
      dateofrelease: parseInt(formData.dateofrelease),
    };
    onAddVideo(data);
    onClose();
  };
  

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Přidat Video</h2>
        <form onSubmit={handleSubmit}>
          <label>URL adresa:</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
          <label>Jméno videa:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Autor:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <label>Délka:</label>
          <input
            type="number"
            name="length"
            value={formData.length}
            onChange={handleChange}
          />
          <label>Datum vydání:</label>
          <input
            type="number"
            name="dateofrelease"
            value={formData.dateofrelease}
            onChange={handleChange}
          />
          <label>Popisek:</label>
          <input
            type="string"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label>Témata:</label>
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
