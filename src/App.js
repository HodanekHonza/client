import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from "./bricks/NavBar";
import VideoStruct from "./bricks/VideoStruct";
import ModalWindow from "./bricks/ModalWindow";
import FavoriteModalWindow from "./bricks/FavoriteModalWindow";
import Footer from "./bricks/Footer";

import "./App.css";

import VideosApi from "./api/VideosApi";
import FavoriteVideosApi from "./api/FavoriteVideosApi";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [favoriteVideos, setFavoriteVideos] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await VideosApi.fetchVideos();
      setMovies(moviesData);
    };
    fetchMovies();

    const fetchFavoriteMovies = async () => {
      const favoriteMoviesData = await FavoriteVideosApi.fetchFavoriteVideos();
      setFavoriteVideos(favoriteMoviesData);
    };
    fetchFavoriteMovies();
  }, []);

  const handleAddFavoriteVideo = async (newVideo) => {
    if (!favoriteVideos.some((video) => video.id === newVideo.id)) {
      try {
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
      setMovies((prevMovies) => [...prevMovies, addedVideo]);
    } catch (error) {
      if (error.message === "Validation error") {
        console.log(newVideo);
        console.error("Validation error while adding video:", error);
      } else {
        console.error("Error adding video:", error);
      }
    }
  };

  const handleDeleteVideo = async (videoToDelete) => {
    try {
      await VideosApi.deleteVideo(videoToDelete.id);
      setMovies((prevMovies) => prevMovies.filter((video) => video.id !== videoToDelete.id));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="background-video-container" />
                <NavBar
                  onSearch={setSearchQuery}
                  onAddVideoClick={() => setShowModal(true)}
                />
                {showModal && (
                  <ModalWindow
                    onClose={() => setShowModal(false)}
                    onAddVideo={handleAddVideo}
                    videos={movies}
                  />
                )}
                <VideoStruct
                  movies={movies}
                  favoriteVideos={favoriteVideos}
                  searchQuery={searchQuery}
                  deleteMovie={handleDeleteVideo}
                  addVideoFavorite={handleAddFavoriteVideo}
                    />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/favoritemodal"
                element={
                  <FavoriteModalWindow
                    showFavoriteVideo={favoriteVideos}
                    deleteFavoriteVideo={handleDeleteFavoriteVideo}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      );
    }
    
    export default App;
    
    
    
    