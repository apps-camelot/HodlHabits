import { useState } from "react";
import VideoPickerCard from "./VideoPickerCard";
import SelectedVideoCard from "./SelectedVideoCard";
import { Avatar, Accordion, AccordionItem, ScrollShadow, Spinner } from "@nextui-org/react";
import HeaderVideoSearch from "@/components/Dashboard/Tabs/Discover/HeaderVideoSearch";
import { GOOGLE_API_IS_TEST, GOOGLE_VIDEO_API_TEST_DATA } from "@/constants/api-conf";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

const VideoSelector = ({ addChallengeVideo, removeChallengeVideo, challengeVideos }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [selectedVideos, setSelectedVideos] = useState(challengeVideos || []);

    const handleAddVideo = (video) => {
      setSelectedVideos((prev) => [...prev, video]);
      addChallengeVideo(video);
    }

    const handleRemoveVideo = (videoId) => {
      setSelectedVideos((prev) => prev.filter((video) => video.videoId !== videoId));
      removeChallengeVideo(videoId);
    }

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


    const searchVideoDetails = async (videoId) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/video-detail?videoIdQuery=${videoId}`);
        const data = await response.json();
        setSelectedVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        toast.error("Error fetching video details.");
      } finally {
        setLoading(false);

      }
    }

    const handleVideoClick = (videoId) => {
        setCurrentVideoId(videoId);
    };

  return (
    <section className="flex flex-col h-full">
      <div className="text-3xl font-bold leading-9 text-default-foreground">
        Video Selector
      </div>
      <div className="py-4 text-default-500">
        Select videos for your challenge.
      </div>
      <HeaderVideoSearch 
        searchVideos={searchVideos} 
        clearVideos={clearVideos} 
        handleAddVideo={handleAddVideo}
        searchVideoDetails={searchVideoDetails}
      />
      <div className="flex flex-col items-center justify-center w-full h-full">
        {
          loading ? (
            <Spinner color="white" />
          ) : (videos.length > 0 || selectedVideos?.length) > 0 && (
            <div className="flex flex-col lg:flex-row container mx-auto p-4 gap-4">
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
                <div>
                  <h3 className="text-lg font-semibold mt-4">Selected Videos</h3>
                  <div className="flex flex-wrap gap-4">
                    {
                      selectedVideos?.length > 0 && (
                        <Accordion className="h-full">
                          <AccordionItem
                              key="selected-videos"	
                              aria-label="Selected videos"
                              startContent={
                                <Avatar
                                  isBordered
                                  color="primary"
                                  radius="lg"
                                  icon={<Icon icon="solar:video-library-broken" width={24} height={24} />}
                                />
                              }
                              subtitle={selectedVideos.length > 1 ? `${selectedVideos.length} videos` : `${selectedVideos.length} video`}
                              title="Selected videos"
                            >
                              {
                                selectedVideos.map((video, index) => (
                                  <SelectedVideoCard key={index} video={video} onClick={handleRemoveVideo} />   
                                ))
                              }
                            </AccordionItem>  
                        </Accordion>
                      )
                    }
                  </div>
                </div>
              </div>

              {/* Video list */}
              <div className="lg:w-1/3 w-full lg:pl-6 overflow-y-auto border border-l-black">
                {
                  videos.length > 0 && (
                    <ScrollShadow orientation="vertical" className="max-h-[70dvh]">
                      {videos.map((video, index) => (
                        <VideoPickerCard 
                          key={index} 
                          video={video} 
                          onClick={handleVideoClick} 
                          addChallengeVideo={handleAddVideo}
                          selectedVideos={selectedVideos}
                        />
                      ))}
                    </ScrollShadow>
                  ) || 
                  // Empty list saying "search for videos or try a different search"
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-lg text-default-400 text-center">
                      Too empty here. Try searching for videos or try a different search.
                    </p>
                    <Icon icon="solar:ghost-broken" className="text-default-400 opacity-20" width={150} />
                  </div>
                }
              </div>
            </div>
          ) || (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Icon icon="line-md:search" className="text-default-400 opacity-20" width={150} />
              <p className="text-lg text-default-400 text-center">
                Get started by search something, It will be awesome.
              </p>
            </div>
          )
        }
      </div>
    </section>
  )
}

export default VideoSelector