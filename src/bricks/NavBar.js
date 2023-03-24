import React from "react";
import "../css/NavBar.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiFillVideoCamera } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";





const NavBar = ({ onSearch, onAddVideoClick, onAddFavoritesVideoClick }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav className={"navigation"}>
      <div>
        <AiFillVideoCamera className="logo"></AiFillVideoCamera>
      </div>
      <div>
      <AiFillStar className="Modal-button-open"onClick={onAddFavoritesVideoClick}></AiFillStar>
      </div>
      {/* <button>
       < AiOutlineStar/>
      </button> */}
      <div>
        <input
          type="text"
          placeholder="Vyhledávejte jménem"
          onChange={handleSearch}
        />
      </div>
      <div>
        <AiOutlinePlusCircle className="Modal-button-open"onClick={onAddVideoClick}></AiOutlinePlusCircle>
    
        
      </div>
    </nav>
  );
};

export default NavBar;
