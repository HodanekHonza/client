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


  //volání ze serveru 
  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await VideosApi.fetchVideos();
      setMovies(moviesData);
      console.log(moviesData)
    };
    fetchMovies()

    const fetchFavoriteMovies = async () => {
      const favoriteMoviesData = await FavoriteVideosApi.fetchFavoriteVideos();
      setFavoriteVideos(favoriteMoviesData);
      console.log(favoriteMoviesData)
    };
    fetchFavoriteMovies()
  }, []);




  const handleAddFavoriteVideo = async (newVideo) => {
    // Check if the video is not already in the favorites to avoid adding the same video again
    if (!favoriteVideos.some((video) => video.id === newVideo.id)) {
      try {
        // Prepare the data with only the video id and creator's name
        const videoData = {
          videoId: newVideo.id,
          name: 'John', // Replace with the actual creator name if it's available in newVideo
        };
  
        // Add the new video to the favorites using the API
        await FavoriteVideosApi.addFavoriteVideo(videoData);
  
        // Fetch the updated list of favorite videos
        const updatedFavoriteVideos = await FavoriteVideosApi.fetchFavoriteVideos();
        
        // Update the favoriteVideos state with the fetched data
        setFavoriteVideos(updatedFavoriteVideos);
  
        console.log("Added to favorites:", newVideo);
      } catch (error) {
        console.error("Error adding video to favorites:", error);
      }
    } else {
      console.log("The video is already in favorites:", newVideo);
    }
  };
  
  
  //handler pro vymazání ze seznamu oblíbených videí 
  const handleDeleteFavoriteVideo = (favoriteVideoToDelete) => {
    console.log("Deleting movie:", favoriteVideoToDelete);
    const updatedVideos = favoriteVideos.filter((movie) => movie.id !== favoriteVideoToDelete.id);
    setFavoriteVideos(updatedVideos);
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
    console.log("Deleting video:", videoToDelete);
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
