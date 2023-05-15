import React from "react";
import "../css/FavoriteModalWindow.css";
import { BsTrash } from "react-icons/bs";

import { MdMusicVideo } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillFilePersonFill } from "react-icons/bs";
import { FaPhotoVideo } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineTopic } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
import { Link } from "react-router-dom";

const FavoritesPage = ({ showFavoriteVideo, deleteFavoriteVideo }) => {
  return (
    <div className="App">
      <div className="background-video-container" />
      <div className="favorites-page">
        <div className="favorites-header">
          <h2>
            <MdMusicVideo />
          </h2>
          <Link to="/" className="close-button">
            <AiOutlineHome /> Domovská stránka
          </Link>
        </div>
        {showFavoriteVideo.map((video) => {
          return (
            <div key={video.id} className="favorite-video">
              <div className="cancel-button-wrapper">
                <button
                  className="cancel-button"
                  onClick={() => deleteFavoriteVideo(video)}
                >
                  <BsTrash />
                </button>
              </div>
              <div className="url-link">
                <h1>
                  <a href={video.url}>
                    <BiLinkExternal /> URL videa
                  </a>
                </h1>
              </div>
              <p>
                <strong>
                  <FaPhotoVideo /> Jméno videa:
                </strong>{" "}
                {video.name}
              </p>
              <p>
                <BsFillFilePersonFill /> Autor: {video.author}
              </p>
              <p>
                <BiTimeFive /> Délka: {video.length}
              </p>
              <p>
                <BsCalendarDate /> Datum vydání: {video.dateofrelease}
              </p>
              <p>
                <MdOutlineDescription /> Popisek: {video.description}
              </p>
              <p>
                <MdOutlineTopic /> Téma: {video.genre}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesPage;
