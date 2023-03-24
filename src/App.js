import React, { useEffect, useState } from "react";
import NavBar from "./bricks/NavBar";
import VideoStruct from "./bricks/VideoStruct";
import allMovies from "./data";
import ModalWindow from "./bricks/ModalWindow";
import FavoriteModalWindow from "./bricks/FavoriteModalWindow";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [showModalFavorites, setShowModalFavorites] = useState(false)
  const [movies, setMovies] = useState([])
  const [favoriteVideos, setFavoriteVideos] = useState([])


  useEffect(() => {
    setMovies(allMovies);
  }, []);

  const handleAddFavoriteVideo = (newVideo) => {
    setFavoriteVideos([...favoriteVideos, newVideo]);
    console.log("Added to favorites:", newVideo);
  };
  
  const handleDeleteFavoriteVideo = (favoriteVideoToDelete) => {
    console.log("Deleting movie:", favoriteVideoToDelete);
    const updatedVideos = favoriteVideos.filter((movie) => movie.id !== favoriteVideoToDelete.id);
    setFavoriteVideos(updatedVideos);
  }

  const handleAddVideo = (newVideo) => {
    const newId = Math.max(...movies.map((movie) => movie.id)) + 1;
    setMovies([...movies, { ...newVideo, id: newId }]);
  };

  const handleDeleteVideo = (movieToDelete) => {
    console.log("Deleting movie:", movieToDelete);
    const updatedVideos = movies.filter((movie) => movie.id !== movieToDelete.id);
    setMovies(updatedVideos);
  };

  return (
    <div className="App">
      <NavBar onSearch={setSearchQuery} onAddVideoClick={() => setShowModal(true)} onAddFavoritesVideoClick={() => setShowModalFavorites(true)} />
      {showModal && <ModalWindow onClose={() => setShowModal(false)} onAddVideo={handleAddVideo}/>}
      {showModalFavorites && <FavoriteModalWindow onClose={() => setShowModalFavorites(false)} showFavoriteVideo={favoriteVideos} deleteFavoriteVideo={handleDeleteFavoriteVideo}/>}
      <VideoStruct movies={movies} searchQuery={searchQuery} deleteMovie={handleDeleteVideo}  addVideoFavorite ={handleAddFavoriteVideo}/>
    </div>
  );
}

export default App;
