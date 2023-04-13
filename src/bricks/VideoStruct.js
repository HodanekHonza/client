import "../css/VideoStruct.css";
import { GiCancel } from "react-icons/gi";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
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
              URL adressa
            </a>
            <p>
              <strong>Jméno videa:</strong> {name}
            </p>
            <p>
              <strong>Autor:</strong> {author}
            </p>
            <p>
              <strong>Délka:</strong> {length}
            </p>
            <p>
              <strong>Datum vydání:</strong> {dateofrelease}
            </p>
            <p>
              <strong>Popisek :</strong> {description}
            </p>
            <p>
              <strong>Témata:</strong> {genre}
            </p>
            <button
              className="cancel-icon"
              onClick={() => {
                console.log("Clicked delete button for movie:", movie);
                deleteMovie(movie);
              }}
            >
              <GiCancel />
              {"  "}Vymaž video
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default VideoStruct;
