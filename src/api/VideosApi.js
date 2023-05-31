// api/videosApi.js
const fetchVideos = async () => {
  try {
    const response = await fetch("http://localhost:8000/video/list"); 
    const moviesData = await response.json();
    return moviesData;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};


const addVideo = async (videoData) => {
  try {
    const response = await fetch("http://localhost:8000/video/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoData),
    });

    if (response.status === 400) {
      console.log("error adding video with sa")
      throw new Error("Validation error");
    }

    if (!response.ok) {
      throw new Error("Failed to add video");
    }

    const addedVideo = await response.json();
    return addedVideo;
  } catch (error) {
    console.error("Error adding video:", error);
    throw error;
  }
};

const deleteVideo = async (videoId) => {
  try {
    const response = await fetch(`http://localhost:8000/video/delete/${videoId}`, {
      method: "DELETE",
    });

    if (response.status === 404) {
      throw new Error("Video not found");
    }

    if (!response.ok) {
      throw new Error("Failed to delete video");
    }

    const deletedVideo = await response.json();
    return deletedVideo;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
};


const videoApi = {
  fetchVideos,
  addVideo,
  deleteVideo

};


export default videoApi
