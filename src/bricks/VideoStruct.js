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




const VideoStruct = ({ movies, searchQuery, deleteMovie, addVideoFavorite }) => {

  const [favoriteStatus, setFavoriteStatus] = useState({});

  const toggleFavorite = (id) => {
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
  };
  

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="all-videos">
      {filteredMovies.map((movie) => {
        const { id, url, name, author, length, dateofrelease, genre, description } = movie;
        return (
          <div key={id} className="one-video">
            <button
                  className="favorite-menu"
                  onClick={() => {
                  toggleFavorite(id);
                  addVideoFavorite(movie);
        }}
      >
        {favoriteStatus[id] ? <AiFillStar /> : <AiOutlineStar />}
      </button>

            <a href={url} target="_blank" rel="noreferrer">
            <AiOutlineLink />  URL adressa
            </a>
            <p className="name-video">
              <strong><FaPhotoVideo/>  Jméno videa:</strong> {name}
            </p>
            <p>
              <strong><BsFillFilePersonFill/>  Autor:</strong> {author}
            </p>
            <p>
              <strong><BiTimeFive/>  Délka:</strong> {length}
            </p>
            <p>
              <strong><BsCalendarDate/>  Datum vydání:</strong> {dateofrelease}
            </p>
            <p>
              <strong><MdOutlineDescription/>  Popisek :</strong> {description}
            </p>
            <p>
              <strong><MdOutlineTopic/>  Témata:</strong> {genre}
            </p>
            <button
              className="cancel-icon"
              onClick={() => {
                deleteMovie(movie);
              }}
            >
              <BsTrash />
              {"  "}Vymaž video
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default VideoStruct;
