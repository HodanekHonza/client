import "../css/VideoStruct.css";
import { BsTrash } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";
import { BsFillFilePersonFill } from "react-icons/bs";
import { FaPhotoVideo } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineTopic } from "react-icons/md";
import { useState } from "react";

const VideoStruct = ({ movies, favoriteVideos, searchQuery, deleteMovie, addVideoFavorite }) => {
  const [favoriteStatus, setFavoriteStatus] = useState({});

  const toggleFavorite = (id, movie) => {
    if (favoriteVideos.find(video => video.id === id)) {
      alert('Toto video je již v oblíbených');
      return;
    }
    
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
    
    addVideoFavorite(movie);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="all-videos">
      {filteredMovies.map((movie) => {
        const { id, url, name, author, length, dateofrelease, genre, description } = movie;
        const isFavorite = favoriteStatus[id] || favoriteVideos.some(video => video.id === id);
        
        return (
          <div key={id} className="one-video">
            <button
              className="favorite-menu"
              onClick={() => toggleFavorite(id, movie)}
            >
              {isFavorite ? <AiFillStar /> : <AiOutlineStar />}
            </button>

            <a href={url} target="_blank" rel="noreferrer">
              <AiOutlineLink /> URL adresa
            </a>
            <p className="name-video">
              <strong><FaPhotoVideo/> Jméno videa:</strong> {name}
            </p>
            <p>
              <strong><BsFillFilePersonFill/> Author:</strong> {author}
            </p>
            <p>
              <strong><BiTimeFive/> Délka v minutách:</strong> {length} min
            </p>
            <p>
              <strong><BsCalendarDate/> Datum vytvoření:</strong> {dateofrelease}
            </p>
            <p>
              <strong><MdOutlineDescription/> Popisek:</strong> {description}
            </p>
            <p>
              <strong><MdOutlineTopic/> Téma:</strong> {genre}
            </p>
            <button
              className="cancel-icon"
              onClick={() => {
                deleteMovie(movie);
              }}
            >
              <BsTrash />
              {"  "}Delete Video
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default VideoStruct;
