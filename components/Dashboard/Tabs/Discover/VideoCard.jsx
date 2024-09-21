import React, { useState } from "react";

const VideoCard = ({ video, onClick, currentVideoId }) => {
  const { title, channel, duration, thumbnailUrl, videoId } = video;
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    setIsPlaying(true);
    onClick(videoId);
  };

  return (
    <div className="video-card bg-white rounded-lg shadow-lg p-4">
      <div
        className="relative cursor-pointer"
        onClick={handleVideoClick}
      >
        <img
          src={thumbnailUrl}
          alt={title}
          className={`w-full h-auto rounded-lg ${isPlaying && currentVideoId === videoId ? 'blur-sm' : ''}`}
        />
        {isPlaying && currentVideoId === videoId && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold">
            Playing
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-sm rounded-md">
          {duration}
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{channel}</p>
      </div>
    </div>
  );
};

export default VideoCard;
