import React, { useState, useEffect } from "react";
import { BsFillFilePersonFill } from "react-icons/bs";
import { FaPhotoVideo } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineTopic } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
import { AiFillFolderAdd } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import fetchTopics from "../api/TopicsApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/ModalWindow.css";


const ModalWindow = ({ onClose, onAddVideo, videos }) => {
  const [formData, setFormData] = useState({
    url: "",
    name: "",
    author: "",
    length: 0,
    dateofrelease: new Date(),
    description: "",
    genre: "",
  });

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      const fetchedTopics = await fetchTopics();
      setTopics(fetchedTopics);
    };

    getTopics();
  }, []);

  const handleChange = (name, value) => {
    // Check if 'name' is an object, which means it's the event object from a standard HTML input
    if (typeof name === 'object' && name.target) {
      const { target } = name;
      value = target.name === "url" && !target.value.startsWith("https://") ? "https://" + target.value : target.value;
      name = target.name;
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      ...formData,
      length: parseInt(formData.length),
      dateofrelease: formData.dateofrelease.toISOString().split('T')[0],
    };
  
    // check if a video with the same name or URL already exists
    const duplicateName = videos.some(video => video.name === data.name);
    const duplicateUrl = videos.some(video => video.url === data.url);
  
    if (!duplicateName && !duplicateUrl) {
      onAddVideo(data);
      onClose();
    } else {
      let errorMessage = 'Video se stejným';
      if (duplicateName) {
        errorMessage += ' názvem';
      }
      if (duplicateUrl) {
        if (duplicateName) {
          errorMessage += ' a';
        }
        errorMessage += ' URL';
      }
      errorMessage += ' již existuje!';
      alert(errorMessage);      
    }
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
                placeholder="např. youtube.com"
                minLength="5"
                maxLength="100"
                value={formData.url}
                onChange={handleChange}
                required
              />
              <label htmlFor="name"><FaPhotoVideo/>  Jméno videa:</label>
              <input
                type="text"
                name="name"
                minLength="1"
                maxLength="100"
                placeholder="Defaultní jméno"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="author"><BsFillFilePersonFill/>  Autor:</label>
              <input
                type="text"
                name="author"
                minLength="1"
                maxLength="100"
                placeholder="Defaultní autor"
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
            <label htmlFor="description"><MdOutlineDescription/>  Popisek:</label>
            <input
              type="text"
              name="description"
              placeholder="Defaultní popisek"
              minLength="10"
              maxLength="1000"
              value={formData.description}
              onChange={handleChange}
              required
            />
              <label htmlFor="genre"><MdOutlineTopic/>  Téma:</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              >
                <option value="">--Please choose an option--</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.topic}>
                    {topic.topic}
                  </option>
                ))}
              </select>
                <label htmlFor="dateofrelease"><BsCalendarDate/>  Datum vytvoření videa:</label>
                <DatePicker
                  selected={formData.dateofrelease}
                  onChange={(date) => handleChange("dateofrelease", date)}
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
            
           <button type="submit"><FiSend/>  Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ModalWindow;
