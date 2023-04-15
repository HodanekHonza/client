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
    const { name, value } = event.target;
  
    if (name === "url" && !value.startsWith("https://")) {
      setFormData({
        ...formData,
        [name]: "https://" + value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
              <label htmlFor="url">URL adresa:</label>
              <input
                type="text"
                name="url"
                placeholder="eg. youtube.com"
                minlength="5"
                maxlength="100"
                value={formData.url}
                onChange={handleChange}
                required
              />
              <label htmlFor="name">Jméno videa:</label>
              <input
                type="text"
                name="name"
                minlength="1"
                maxlength="100"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="author">Autor:</label>
              <input
                type="text"
                name="author"
                minlength="1"
                maxlength="100"
                value={formData.author}
                onChange={handleChange}
              />
            <label htmlFor="length">Délka:</label>
            <input
              type="number"
              name="length"
              value={formData.length}
              onChange={handleChange}
            />
            <label htmlFor="dateofrelease">Datum vydání: eg. 14071999 </label>
            <input
              type="number"
              name="dateofrelease"
              value={formData.dateofrelease}
              onChange={handleChange}
            />
            <label htmlFor="description">Popisek:</label>
            <input
              type="text"
              name="description"
              minlength="1"
              maxlength="1000"
              value={formData.description}
              onChange={handleChange}
            />
            <label htmlFor="genre">Témata:</label>
            <input
              type="text"
              name="genre"
              minlength="1"
              maxlength="100"
              value={formData.genre}
              onChange={handleChange}
              required
            />
           <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ModalWindow;
