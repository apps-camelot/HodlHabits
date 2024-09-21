// components/PlayerAndVideoList.js
import React, { useState } from "react";
import VideoCardRow from "./VideoCardRow";

const videoData = [
  {
    title: "The 7 AWS Services You NEED to Know as a Web Dev",
    channel: "Kodaps Academy",
    duration: "8:59",
    thumbnailUrl: "https://i.ytimg.com/vi/Js3zZyC-bS8/hqdefault.jpg",
    videoId: "Js3zZyC-bS8",
  },
  // Add more videos...
];

const VideoPicker = () => {
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const handleVideoClick = (videoId) => {
    setCurrentVideoId(videoId);
  };

  return (
    <div className="flex flex-col lg:flex-row container mx-auto p-4">
      {/* Video Player */}
      <div className="lg:w-2/3 w-full mb-6 lg:mb-0">
        <div className="bg-black text-white rounded-lg overflow-hidden">
          {currentVideoId ? (
            <iframe
              className="w-full h-64 lg:h-96"
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
              title="Main Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-64 lg:h-96 flex items-center justify-center text-lg">
              Select a video to play
            </div>
          )}
        </div>
      </div>

      {/* Video List */}
      <div className="lg:w-1/3 w-full lg:pl-6 overflow-y-auto">
        {videoData.map((video, index) => (
          <VideoCardRow key={index} video={video} onClick={handleVideoClick} />
        ))}
      </div>
    </div>
  );
};

export default VideoPicker;
