import Image from "next/image";

const SelectedVideoCard = ({ video, onClick }) => {
  const { title, thumbnailUrl, videoId } = video;

  const handleVideoClick = () => {
    onClick(videoId);
  };

  return (
    <div
      className="flex items-center cursor-pointer p-2 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg mb-2"
      onClick={handleVideoClick}
    >
      {/* Thumbnail */}
      <Image
        src={thumbnailUrl}
        alt={title}
        width={48}
        height={48}
        className="w-12 h-12 rounded-md"
      />
      
      {/* Title */}
      <div className="ml-3">
        <h3 className="text-xs font-medium text-gray-800">{title}</h3>
      </div>
    </div>
  );
};

export default SelectedVideoCard;
