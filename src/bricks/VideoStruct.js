import "../css/VideoStruct.css";
import { GiCancel } from "react-icons/gi";
import { AiOutlineStar } from "react-icons/ai";




const VideoStruct = ({ movies, searchQuery, deleteMovie, addVideoFavorite }) => {
  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );




  return (
    <div className="all-videos">
      {filteredMovies.map((movie) => {
        const { id, url, name, author, length, dateofrelease, genre } = movie;
        return (
          <div key={id} className="one-video">

            <button className="favorite-menu" onClick={() => addVideoFavorite(movie)}>
            <AiOutlineStar  />
            </button> 
            <a href={url} target="_blank" rel="noreferrer">
              URL adressa
            </a>
            <p>Jméno videa: {name} </p>
            <p>Autor: {author} </p>
            <p>Délka: {length} </p>
            <p>Datum vydání: {dateofrelease} </p>
            <p>Témata: {genre} </p>
            <button
              className="cancel-icon"
              onClick={() => {
                console.log("Clicked delete button for movie:", movie);
                deleteMovie(movie);
              }}
            >
              <GiCancel></GiCancel>
              {"  "}Vymaž video
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default VideoStruct;
