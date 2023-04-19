import React, { useEffect, useState } from "react";
import NavBar from "./bricks/NavBar";
import VideoStruct from "./bricks/VideoStruct";
//import allMovies from "./data";
import ModalWindow from "./bricks/ModalWindow";
import FavoriteModalWindow from "./bricks/FavoriteModalWindow";
import "./App.css";
// nazev VideosApi je jinak nez je v origo file ale zatim to asi nevadí
import VideosApi from "./api/VideosApi";
import FavoriteVideosApi from "./api/FavoriteVideosApi";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

  
 // TODO 3. přesunout handlery z app do child komponent abych uvolnil app.js file
 // TODO 4. přidat TOPICS jako PRE-SET, doposud mohl uživatel nastavit jakýkoli topic chtěl, odebereme mu totu funkci

function App() {

  //stav pro hledání, modální okno pro klasická videa
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [movies, setMovies] = useState([])

  
  // stav pro přidání oblíbeného videa 
  const [favoriteVideos, setFavoriteVideos] = useState([])


    useEffect(() => {
      const fetchMovies = async () => {
        const moviesData = await VideosApi.fetchVideos();
        setMovies(moviesData);
      };
      fetchMovies()
      
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
  
        await FavoriteVideosApi.addFavoriteVideo(videoData);
        const updatedFavoriteVideos = await FavoriteVideosApi.fetchFavoriteVideos();
        setFavoriteVideos(updatedFavoriteVideos);

      } catch (error) {
        console.error("Error adding video to favorites:", error);
      }
    } else {
      console.log("The video is already in favorites:", newVideo);
    }
  };
  
  

  const handleDeleteFavoriteVideo = async (favoriteVideoToDelete) => {
    try {
      await FavoriteVideosApi.deleteFavoriteVideo(favoriteVideoToDelete.id);
      const updatedVideos = favoriteVideos.filter((movie) => movie.id !== favoriteVideoToDelete.id);
      setFavoriteVideos(updatedVideos);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  }



  const handleAddVideo = async (newVideo) => {
    try {
      const addedVideo = await VideosApi.addVideo(newVideo);
      setMovies([...movies, addedVideo]);
    } catch (error) {
      if (error.message === "Validation error") {
        console.log(newVideo)
        console.error("Validation error while adding video:", error);
      } else {
        console.error("Error adding video:", error);
      }
    }
  };


  const handleDeleteVideo = async (videoToDelete) => {
    try {
      await VideosApi.deleteVideo(videoToDelete.id);
      const updatedVideos = movies.filter((video) => video.id !== videoToDelete.id);
      setMovies(updatedVideos);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };



  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <div className="background-video-container">
              </div>
              <NavBar
                onSearch={setSearchQuery}
                onAddVideoClick={() => setShowModal(true)}
              />
              {showModal && (
                <ModalWindow
                  onClose={() => setShowModal(false)}
                  onAddVideo={handleAddVideo}
                />
              )}
              <VideoStruct
                movies={movies}
                searchQuery={searchQuery}
                deleteMovie={handleDeleteVideo}
                addVideoFavorite={handleAddFavoriteVideo}
              />
            </>
          } />
          <Route path="/favoritemodal" element={
            <FavoriteModalWindow

              showFavoriteVideo={favoriteVideos}
              deleteFavoriteVideo={handleDeleteFavoriteVideo}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


