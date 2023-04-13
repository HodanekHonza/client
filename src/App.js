import React, { useEffect, useState } from "react";
import NavBar from "./bricks/NavBar";
import VideoStruct from "./bricks/VideoStruct";
import allMovies from "./data";
import ModalWindow from "./bricks/ModalWindow";
import FavoriteModalWindow from "./bricks/FavoriteModalWindow";
import "./App.css";
// nazev VideosApi je jinak nez je v origo file ale zatim to asi nevadí
import VideosApi from "./api/VideosApi";
import FavoriteVideosApi from "./api/FavoriteVideosApi";


 // TODO 3. přesunout handlery z app do child komponent abych uvolnil app.js file
 // TODO 4. přidat TOPICS jako PRE-SET, doposud mohl uživatel nastavit jakýkoli topic chtěl, odebereme mu totu funkci

function App() {

  //stav pro hledání mezi videi 
  const [searchQuery, setSearchQuery] = useState("");
  //toggle pro modální okno - formulář na vytvoření videa
  const [showModal, setShowModal] = useState(false)
  //toggle pro modální okno -  oblíbené videa
  const [showModalFavorites, setShowModalFavorites] = useState(false)

  const [movies, setMovies] = useState([])

  const [favoriteVideos, setFavoriteVideos] = useState([])
  //state pro načtení videí ze serveru a nasledovného podávaní komponentě video struct


  //volání ze serveru 
  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await VideosApi.fetchVideos();
      setMovies(moviesData);
    };
    fetchMovies()


    //volám poprvé abych načetl oblíbené videa, podruhé to dělam když přidám oblíbené video
    const fetchFavoriteMovies = async () => {
      const favoriteMoviesData = await FavoriteVideosApi.fetchFavoriteVideos();
      setFavoriteVideos(favoriteMoviesData);
    };
    fetchFavoriteMovies()
  }, []);




  const handleAddFavoriteVideo = async (newVideo) => {
    // zkontroluji zda neni video jiz v JSONU
    if (!favoriteVideos.some((video) => video.id === newVideo.id)) {
      try {
        // objekt dat ktery budu posálat, jen id a jmenu uživatele stačí, backend podle id přiřadí data 
        const videoData = {
          videoId: newVideo.id,
          name: 'John', 
        };
  
        // přidání oblíbeného videa pomocí API 
        await FavoriteVideosApi.addFavoriteVideo(videoData);
  
        // Fetch the updated list of favorite videos
        const updatedFavoriteVideos = await FavoriteVideosApi.fetchFavoriteVideos();
        
        // Update the favoriteVideos state with the fetched data
        setFavoriteVideos(updatedFavoriteVideos);
      } catch (error) {
        console.error("Error adding video to favorites:", error);
      }
    } else {
      console.log("The video is already in favorites:", newVideo);
    }
  };
  
  
  //handler pro vymazání ze seznamu oblíbených videí 
  const handleDeleteFavoriteVideo = async (favoriteVideoToDelete) => {
    try {
      await FavoriteVideosApi.deleteFavoriteVideo(favoriteVideoToDelete.id); // Use the deleteVideo function from videoApi
      const updatedVideos = favoriteVideos.filter((movie) => movie.id !== favoriteVideoToDelete.id);
      setFavoriteVideos(updatedVideos);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  }


//handler pro přidání videa do seznamu videí
const handleAddVideo = async (newVideo) => {
  try {
    const addedVideo = await VideosApi.addVideo(newVideo);
    setMovies([...movies, addedVideo]);
  } catch (error) {
    if (error.message === "Validation error") {
      console.log(newVideo)
      console.error("Validation error while adding video:", error);
      // Show a user-friendly validation error message, for example, using a toast notification or an alert
    } else {
      console.error("Error adding video:", error);
    }
  }
};



  //handler pro odstranění videa ze seznamu videí
  const handleDeleteVideo = async (videoToDelete) => {
    try {
      await VideosApi.deleteVideo(videoToDelete.id); // Use the deleteVideo function from videoApi
      const updatedVideos = movies.filter((video) => video.id !== videoToDelete.id);
      setMovies(updatedVideos);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };



  return (
    <div className="App">
        <div className="background-video-container">
        <video className="background-video" src="/background-video/lake-91562.mp4" autoPlay loop muted></video>
      </div>
      <NavBar onSearch={setSearchQuery} onAddVideoClick={() => setShowModal(true)} onAddFavoritesVideoClick={() => setShowModalFavorites(true)} />
      {showModal && <ModalWindow onClose={() => setShowModal(false)} onAddVideo={handleAddVideo}/>}
      {showModalFavorites && <FavoriteModalWindow onClose={() => setShowModalFavorites(false)} showFavoriteVideo={favoriteVideos} deleteFavoriteVideo={handleDeleteFavoriteVideo}/>}
      <VideoStruct movies={movies} searchQuery={searchQuery} deleteMovie={handleDeleteVideo}  addVideoFavorite ={handleAddFavoriteVideo}/>
    </div>
  );
}

export default App;
