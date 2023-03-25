import React from "react";
import "../css/FavoriteModalWindow.css";
import { GiCancel } from "react-icons/gi";

const FavoriteModalWindow = ({ showFavoriteVideo, onClose, deleteFavoriteVideo }) => {





  return (
    <div className="favorite-modal" onClick={onClose}>
      <div className="favorite-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="favorite-modal-header">
            
          <h2>Favorites</h2>
          
          <button onClick={onClose}>x</button>
        </div>
        <div>
        {"------------------------------------------------------"}
        </div>
        {showFavoriteVideo.map((video) => {
          return (
            <div key={video.id} className="favorite-modal-video">
              <button onClick={() => deleteFavoriteVideo(video)}>
              <GiCancel />
              </button>
              <h1><a href={video.url}>{video.url}</a></h1>
              <h1>{video.name}</h1>
              <h2>{video.author}</h2>
              <h3>{video.length}</h3>
              <h4>{video.dateofrelease}</h4>
              <h5>{video.genre}</h5>
              {"------------------------------------------------------"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteModalWindow;
