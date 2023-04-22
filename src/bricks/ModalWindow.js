import { BsFillFilePersonFill } from "react-icons/bs";
import { FaPhotoVideo } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineTopic } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
import { AiFillFolderAdd } from "react-icons/ai";
import { FiSend } from "react-icons/fi";






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
         <h2><AiFillFolderAdd/>  Přidat Video</h2>
          <form onSubmit={handleSubmit}>
              <label htmlFor="url"><BiLinkExternal/>  URL adresa:</label>
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
              <label htmlFor="name"><FaPhotoVideo/>  Jméno videa:</label>
              <input
                type="text"
                name="name"
                minlength="1"
                maxlength="100"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="author"><BsFillFilePersonFill/>  Autor:</label>
              <input
                type="text"
                name="author"
                minlength="1"
                maxlength="100"
                value={formData.author}
                onChange={handleChange}
              />
            <label htmlFor="length"><BiTimeFive/>  Délka v minutách:</label>
            <input
              type="number"
              name="length"
              value={formData.length}
              onChange={handleChange}
            />
            <label htmlFor="dateofrelease"><BsCalendarDate/>  Datum vydání: eg. 14071999 </label>
            <input
              type="number"
              name="dateofrelease"
              value={formData.dateofrelease}
              onChange={handleChange}
            />
            <label htmlFor="description"><MdOutlineDescription/>  Popisek:</label>
            <input
              type="text"
              name="description"
              minlength="1"
              maxlength="1000"
              value={formData.description}
              onChange={handleChange}
            />
           <label htmlFor="genre"><MdOutlineTopic/>  Téma:</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            >
              <option value="">--Please choose an option--</option>
              <option value="learning">Learning</option>
              <option value="fun">Fun</option>
              <option value="school">School</option>
              <option value="work">Work</option>
              <option value="something">Something</option>
            </select>
            
           <button type="submit"><FiSend/>  Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ModalWindow;
