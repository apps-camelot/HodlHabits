"use client";

import { useState, useEffect, useRef } from 'react';
import useContractChallenges from "@/hooks/useContractChallenges";
import { getYouTubeVideoId } from '@/constants/util';
import toast from 'react-hot-toast';
import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from '@/constants/smartcontract';
import { useDisclosure } from '@nextui-org/react';
import AttestFormModal from '@/components/Attest/AttestFormModal';

const { Contract, BrowserProvider, formatUnits } = require('ethers');

const Page = ({ params }) => {
  const { id } = params;
  const { challenges, isLoading, error } = useContractChallenges({
    getOnlyOwnChallenges: false,
    specificChallengeId: id
  });

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);
  const playerRef = useRef(null); // Reference for the YouTube player

  useEffect(() => {
    if (challenges && challenges.length > 0) {
      const challenge = challenges[0]; // Assuming one challenge is retrieved

      const videoList = Array.isArray(challenge.challengeVideos)
        ? challenge.challengeVideos
        : [challenge.challengeVideos];

      // Pick a random video if array, or just use the single string
      const randomVideo = videoList[Math.floor(Math.random() * videoList.length)];

      const finalVideoURL = `https://www.youtube.com/embed/${getYouTubeVideoId(randomVideo)}`;
      setVideoUrl(finalVideoURL);
    }
  }, [challenges]);

  useEffect(() => {
    if (showPlayer && videoUrl) {
      loadYouTubePlayer();
    }
  }, [showPlayer, videoUrl]);

  const loadYouTubePlayer = () => {
    if (window.YT) {
      createYouTubePlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        createYouTubePlayer();
      };
    }
  };

  const createYouTubePlayer = () => {
    playerRef.current = new window.YT.Player('player', {
      videoId: getYouTubeVideoId(videoUrl),
      events: {
        onStateChange: handleVideoStateChange,
      },
    });
  };

  const handleVideoStateChange = async (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      console.debug('Video ended!');
      toast.loading('Registering completion...');

      try {
        if (!window.ethereum) {
          console.error('No Ethereum wallet detected');
          return;
        }

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(SMART_CONTRACT_ADDRESS, SMART_CONTRACT_ABI, signer);
        const tx = await contract.completeHabit(id);

        const receipt = await tx.wait(3);
        toast.success('Challenge progress registered! 🎉');
        // router.push(`/dashboard`);
      } catch (error) {
        console.error('Error completing challenge:', error);
        toast.error('Error completing challenge. Please try again.');
      }
    }
  };

  const handleStart = () => {
    setIsPlaying(true);
    setShowPlayer(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100dvh-4rem)]">
        <p>Loading challenge data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[calc(100dvh-4rem)]">
        <p>Error loading challenge data</p>
      </div>
    );
  }

  if (!challenges || challenges.length === 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100dvh-4rem)]">
        <p>No challenge found</p>
      </div>
    );
  }

  const challenge = challenges[0];

  return (
    <div className="flex w-full h-[calc(100dvh-4rem)] max-w-7xl mx-auto p-4">
      {/* Sidebar: Participants */}
      <div className="w-1/3 pr-4">
        <div className="w-full bg-gray-100 p-6 rounded-md">
          <h3 className="text-xl font-semibold mb-4">Participants</h3>
          {challenge.participants.map((participant, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-600 mb-2">{participant.address}</p>
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${participant.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content: Video player on the right */}
      <div className="w-2/3 flex flex-col">
        {/* Video Player */}
        <div className="w-full h-[75%] relative">
          {!showPlayer && (
            <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <button
                className="bg-white text-black px-6 py-3 rounded"
                onClick={handleStart}
              >
                Start
              </button>
            </div>
          )}

          {showPlayer && (
            <div id="player" className="w-full h-full"></div>
          )}
        </div>

        {/* Challenge details below the video */}
        <div className="w-full bg-gray-100 p-6 mt-4 rounded-md">
          <div className='w-full flex justify-between items-center pb-4'>
            <h2 className="text-2xl font-semibold mb-4">{challenge.title}</h2>
            <button
              className="bg-slate-200 text-black px-6 py-3 rounded"
              onClick={onOpen}
            >
              Attest winner
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-gray-600">
              <strong>Creator:</strong> {challenge.creator}
            </p>
            <p className="text-gray-600">
              <strong>Stake Amount:</strong> {challenge.stakeAmount}
            </p>
            <p className="text-gray-600">
              <strong>Repetitions:</strong> {challenge.repetitions}
            </p>
            <p className="text-gray-600">
              <strong>Start Date:</strong> {new Date(challenge.startTime * 1000).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong>End Date:</strong> {new Date((parseInt(challenge.startTime) + parseInt(challenge.duration)) * 1000).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong>Total Stake:</strong> {challenge.totalStakeAmount}
            </p>
          </div>
        </div>
      </div>
      <AttestFormModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Page;
