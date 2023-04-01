import React, { useEffect, useState } from "react";
import NavBar from "./bricks/NavBar";
import VideoStruct from "./bricks/VideoStruct";
import allMovies from "./data";
import ModalWindow from "./bricks/ModalWindow";
import FavoriteModalWindow from "./bricks/FavoriteModalWindow";
import "./App.css";

// TODO 1. napojit na server, první simple GET na načtení videí, překopírovat mocking data do server "databáze"
// TODO 2. dořešit s danem CSS, dát appce trochu života, žadnou bídu
 // TODO 3. přesunout handlery z app do child komponent abych uvolnil app.js file
 // TODO 4. přidat TOPICS jako PRE-SET, doposud mohl uživatel nastavit jakýkoli topic chtěl, odebereme mu totu funkci

function App() {

  //stav pro hledání mezi videi 
  const [searchQuery, setSearchQuery] = useState("");
  //toggle pro modální okno - formulář na vytvoření videa
  const [showModal, setShowModal] = useState(false)
  //toggle pro modální okno -  oblíbené videa
  const [showModalFavorites, setShowModalFavorites] = useState(false)
  // !!! tento stav zameni s videoLoadCall až zavolám server
  const [movies, setMovies] = useState([])
    // !!! tento stav zameni s videoLoadCallFavorite? až zavolám server
  const [favoriteVideos, setFavoriteVideos] = useState([])
  //state pro načtení videí ze serveru a nasledovného podávaní komponentě video struct
  const [videoLoadCall, setVideoLoadCall] = useState({
    state: "pending",
  });

  //volání ze serveru 
  useEffect(() => {
    setMovies(allMovies);
  }, []);




  const handleAddFavoriteVideo = (newVideo) => {
    // zjištuji jestli video není již v oblíbených, abych nemohl přidat ten stejný znova
    if (!favoriteVideos.some((video) => video.id === newVideo.id)) {
      setFavoriteVideos([...favoriteVideos, newVideo]);
      console.log("Přidán do oblíbených:", newVideo);
    } else {
      console.log("Video je již v oblíbených:", newVideo);
    }
  };
  
  
  //handler pro vymazání ze seznamu oblíbených videí 
  const handleDeleteFavoriteVideo = (favoriteVideoToDelete) => {
    console.log("Deleting movie:", favoriteVideoToDelete);
    const updatedVideos = favoriteVideos.filter((movie) => movie.id !== favoriteVideoToDelete.id);
    setFavoriteVideos(updatedVideos);
  }


//handler pro přidání videa do seznamu videí
  const handleAddVideo = (newVideo) => {
    const newId = Math.max(...movies.map((movie) => movie.id)) + 1;
    setMovies([...movies, { ...newVideo, id: newId }]);
  };


  //handler pro odstranění videa ze seznamu videí
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
