import React from "react";
import "../css/NavBar.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaCameraRetro } from "react-icons/fa";
import { SlMagnifier } from "react-icons/sl";
import { AiFillStar } from "react-icons/ai";





const NavBar = ({ onSearch, onAddVideoClick, onAddFavoritesVideoClick }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav className={"navigation"}>
        <div className="nav-items">
          <div>
            <FaCameraRetro className="logo"></FaCameraRetro>
          </div>
          <div className="search-container">
        <input
          type="text"
          placeholder="Zadejte jméno videa"
          onChange={handleSearch}
          />
        <SlMagnifier className="search-icon"></SlMagnifier>
      </div>
          <div>
            <a href="http://localhost:3001/favoritemodal"><AiFillStar className="Modal-button-open"></AiFillStar> </a>
            <AiOutlinePlusCircle className="Modal-button-open"onClick={onAddVideoClick} ></AiOutlinePlusCircle> 
          </div>
          </div>
        </nav>
  );
};

export default NavBar;
