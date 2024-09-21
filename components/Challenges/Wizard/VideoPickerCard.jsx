import React from "react";
import { Icon } from "@iconify/react";

const VideoPickerCard = ({ video, onClick, addChallengeVideo, selectedVideos }) => {
  const { title, channel, duration, thumbnailUrl, videoId } = video;

  const isVideoAlreadyAdded = selectedVideos.some((v) => v.videoId === videoId);
  
  const handleVideoClick = () => {
    onClick(videoId);
  };

  return (
    <div
      className="flex items-center cursor-pointer p-2 bg-white hover:bg-gray-100 text-gray-900 mb-2 rounded-lg border border-gray-200 relative"
      onClick={handleVideoClick}
    >
      {/* Thumbnail */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-16 h-auto rounded-lg"
      />

      {/* Video Info */}
      <div className="ml-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-gray-500 text-xs">{channel}</p>
        <p className="text-gray-500 text-xs">{duration}</p>
      </div>

      {/* Plus Button in the Top-Right Corner */}
      <button
        className="absolute top-2 right-2 bg-blue-500 p-2 rounded-full hover:bg-blue-400"
        disabled={isVideoAlreadyAdded}
        onClick={(e) => {
          e.stopPropagation();
          if(isVideoAlreadyAdded) return;

          addChallengeVideo(video);
        }}
      >
        <Icon icon="akar-icons:plus" className="text-white w-4 h-4" />
      </button>
    </div>
  );
};

export default VideoPickerCard;
