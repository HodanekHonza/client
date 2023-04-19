import React from "react";
import "../css/FavoriteModalWindow.css";
import { GiCancel } from "react-icons/gi";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";



const FavoritesPage = ({ showFavoriteVideo, deleteFavoriteVideo }) => {
  return (
    <div className="App">
      <div className="background-video-container" />
      <div className="favorites-page">
        <div className="favorites-header">
          <h2><MdFavoriteBorder/>   Favorites</h2>
          <Link to="/" className="close-button">
            x
          </Link>
        </div>
        {showFavoriteVideo.map((video) => {
          return (
            <div key={video.id} className="favorite-video">
              <div className="cancel-button-wrapper">
                <button
                  className={"cancel-button"}
                  onClick={() => deleteFavoriteVideo(video)}
                >
                  <GiCancel />
                </button>
              </div>
              <h1>
                <a href={video.url}>{video.url}</a>
              </h1>
              <p><strong>Jméno videa: </strong> {video.name}</p>
              <p>Autor: {video.author}</p>
              <p>Délka: {video.length}</p>
              <p>Datum vydání: {video.dateofrelease}</p>
              <p>Popisek: {video.description}</p>
              
              <p>Téma: {video.genre}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesPage;
