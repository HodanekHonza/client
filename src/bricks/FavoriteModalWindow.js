import React from "react";
import "../css/FavoriteModalWindow.css";
import { GiCancel } from "react-icons/gi";
import { Link } from "react-router-dom";

const FavoritesPage = ({ showFavoriteVideo, deleteFavoriteVideo }) => {
  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h2>Favorites</h2>
        <Link to="/" className="close-button">x</Link>
      </div>
      {showFavoriteVideo.map((video) => {
        return (
          <div key={video.id} className="favorite-video">
            <div className="cancel-button-wrapper">
              <button className={"cancel-button"} onClick={() => deleteFavoriteVideo(video)}>
                <GiCancel />
              </button>
            </div>
            <h1><a href={video.url}>{video.url}</a></h1>
            <h1>{video.name}</h1>
            <h2>{video.author}</h2>
            <h3>{video.length}</h3>
            <h4>{video.dateofrelease}</h4>
            <h5>{video.genre}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default FavoritesPage;
