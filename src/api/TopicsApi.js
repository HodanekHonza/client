const fetchTopics = async () => {
    try {
      const response = await fetch("http://localhost:8000/topics/list"); 
      const topics = await response.json();
      return topics;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  export default fetchTopics;
  
