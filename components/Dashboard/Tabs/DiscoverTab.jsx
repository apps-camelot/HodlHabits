import { useState } from "react";
import { Spinner } from "@nextui-org/react";
import VideoCard from "./Discover/VideoCard";
import HeaderVideoSearch from "./Discover/HeaderVideoSearch";
import { GOOGLE_API_IS_TEST, GOOGLE_VIDEO_API_TEST_DATA } from "@/constants/api-conf";


const DiscoverTab = () => {
  const isTest = false;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const clearVideos = () => {
    setVideos([]);
  }

  // Function to call the API
  const searchVideos = async (query) => {
    setLoading(true);
    try {
      if (GOOGLE_API_IS_TEST) {
        setVideos(GOOGLE_VIDEO_API_TEST_DATA);
        return;
      }
      const response = await fetch(`/api/videos?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (videoId) => {
    setCurrentVideoId(videoId); // Update the main video player with the clicked video
  };

  return (
    <section className="flex flex-col min-h-[calc(100dvh-20rem)]">
      <HeaderVideoSearch searchVideos={searchVideos} clearVideos={clearVideos} />
      <div className="flex flex-col items-center justify-center w-full h-full">
        {loading ? (
          <Spinner color="white" />
        ) : videos.length > 0 && (
          <div className="container mx-auto">
            <div className="block p-4 m-2 bg-black text-white">
              {currentVideoId ? (
                <iframe
                  className="w-full h-64"
                  src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
                  title="Main Video Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-64 flex items-center justify-center text-lg">
                  Select a video to play
                </div>
              )}
            </div>

            <div className="h-96 overflow-y-scroll p-4 bg-gray-100">
              <h1 className="text-2xl font-bold mb-6">Video Grid</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <VideoCard 
                    key={index} 
                    video={video} 
                    onClick={handleVideoClick} 
                    currentVideoId={currentVideoId}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiscoverTab;
