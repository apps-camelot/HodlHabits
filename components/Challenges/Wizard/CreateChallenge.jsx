"use client";

import React from "react";
import { useRef, useState } from "react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";

import MultiStepSidebar from "./MultistepSidebar";
import MultistepNavigationButtons from "./MultistepNavigationButtons";
import BasicChallengeInfoForm from "./BasicChallengeInfoForm";
import toast from "react-hot-toast";
import VideoSelector from "./VideoSelector";
import ChallengeReview from "./ChallengeReview";
import Image from "next/image";
import ChangingText from "./ChallengeCreating/ChangingText";
import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from "@/constants/smartcontract";
import { useTransitionRouter } from "next-view-transitions";

const { Contract, parseUnits, BrowserProvider } = require('ethers');

const variants = {
  enter: (direction) => ({
    y: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    y: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
};

const CreateChallenge = () => {
  const router = useTransitionRouter();
  const [loadingChallengeCreation, setLoadingChallengeCreation] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const challengeDetailsFormRef = useRef(null);
  const [challengeVideos, setChallengeVideos] = useState([]);
  const [challengeDetails, setChallengeDetails] = useState({
    title: null,
    time: null,
    stake: null,
    duration: null,
    repetition: null,
  });

  const paginate = React.useCallback((newDirection) => {
    setPage((prev) => {
      const nextPage = prev[0] + newDirection;

      if (nextPage < 0 || nextPage > 3) return prev;

      return [nextPage, newDirection];
    });
  }, []);

  const onChangePage = React.useCallback((newPage) => {
    setPage((prev) => {
      if (newPage < 0 || newPage > 3) return prev;
      const currentPage = prev[0];

      return [newPage, newPage > currentPage ? 1 : -1];
    });
  }, []);

  const onBack = React.useCallback(() => {
    paginate(-1);
  }, [paginate]);

  const onNext = React.useCallback(() => {
    paginate(1);
  }, [paginate]);

  const addChallengeVideo = (video) => {
    setChallengeVideos((prev) => [...prev, video]);
  }

  const removeChallengeVideo = (videoId) => {
    setChallengeVideos((prev) => prev.filter((video) => video.videoId !== videoId));
  }

  const handleBasicChallengeInfoFormSubmit = () => {
    challengeDetailsFormRef.current.requestSubmit();
    
    let valid = true;
    Object.values(challengeDetails).forEach((value) => {
      const isArray = Array.isArray(value);

      if(isArray) {
        if (value.length === 0) {
          valid = false;
          return;
        }
      }

      if (value) return;

      valid = false;
    });

    if (!valid) {
      toast.error("Please fill in all required fields");
      return;
    };

    onNext();
  }

  const handleVideosSetup = () => {
    if (challengeVideos.length == 0) {
      toast.error("Please select at least one video");
      return;
    }

    onNext();
  }

  const calculateRepetitions = (start, end, repetitionDays) => {
    const dayMapping = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6
    };
  
    const startDate = new Date(start.year, start.month - 1, start.day);
    const endDate = new Date(end.year, end.month - 1, end.day);
  
    let count = 0;
  
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const currentDay = d.getDay();
      if (repetitionDays.some(day => dayMapping[day] === currentDay)) {
        count++;
      }
    }
  
    return count;
  };
  
  const handleCreateChallenge = async () => {
    setLoadingChallengeCreation(true);
  
    const dayMapping = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7
    };
  
    const repetitions = challengeDetails.repetition.map(day => dayMapping[day]);
  
    const startTime = Math.floor(new Date(challengeDetails.duration.start.year, challengeDetails.duration.start.month - 1, challengeDetails.duration.start.day).getTime() / 1000);
    const duration = Math.floor(new Date(challengeDetails.duration.end.year, challengeDetails.duration.end.month - 1, challengeDetails.duration.end.day).getTime() / 1000) - startTime;
  
    const stakeAmount = parseUnits(challengeDetails.stake, 18);
  
    const repetitionCount = calculateRepetitions(challengeDetails.duration.start, challengeDetails.duration.end, challengeDetails.repetition);
  
    try {
      if (!window.ethereum) {
        console.error('No Ethereum wallet detected');
        return;
      }
  
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(SMART_CONTRACT_ADDRESS, SMART_CONTRACT_ABI, signer);
  
      const videoLinks = challengeVideos.map(video => `https://www.youtube.com/watch?v=${video.videoId}`);
  
      const tx = await contract.createChallenge(
        videoLinks,         
        stakeAmount,        
        repetitionCount,    
        startTime,          
        duration,           
        true
      );
  
      const receipt = await tx.wait(3);
      toast.success('Challenge created successfully! 🎉');
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Error creating challenge:', error);
    } finally {
      setLoadingChallengeCreation(false);
    }
  };

  const content = React.useMemo(() => {
    let component = <BasicChallengeInfoForm 
      formRef={challengeDetailsFormRef} 
      challengeDetails={challengeDetails} 
      setChallengeDetails={setChallengeDetails} 
    />;

    switch (page) {
      case 1:
        component = <VideoSelector addChallengeVideo={addChallengeVideo} removeChallengeVideo={removeChallengeVideo} challengeVideos={challengeVideos}/>;
        break;
      case 2:
        component = <ChallengeReview challengeDetails={challengeDetails} challengeVideos={challengeVideos} />;
        break;
    }

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          key={page}
          animate="center"
          className="col-span-12 h-full"
          custom={direction}
          exit="exit"
          initial="exit"
          transition={{
            y: {
              ease: "backOut",
              duration: 0.35,
            },
            opacity: {duration: 0.4},
          }}
          variants={variants}
        >
          {component}
        </m.div>
      </LazyMotion>
    );
  }, [direction, page]);

  return (
    !loadingChallengeCreation ? (
      <AnimatePresence
        mode="wait"
        initial={false}
        custom={direction}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <MultiStepSidebar
          currentPage={page}
          onBack={onBack}
          onChangePage={onChangePage}
          onNext={onNext}
        >
          <div className="relative flex h-fit w-full flex-col pt-6 text-center lg:h-full lg:justify-center lg:pt-0">
            {content}
            <MultistepNavigationButtons
              backButtonProps={{isDisabled: page === 0}}
              className="hidden justify-start lg:flex"
              nextButtonProps={{
                children: page === 0 ? "Select videos" : page === 1 ? "Confirm details" : "Create challenge",
              }}
              stepCallback={
                page === 0 ? handleBasicChallengeInfoFormSubmit : 
                page === 1 ? handleVideosSetup : 
                handleCreateChallenge
              }
              onBack={onBack}
              onNext={onNext}
            />
          </div>
        </MultiStepSidebar>
      </AnimatePresence>
    ) : (
      <section className="flex flex-col justify-center items-center h-full">
        <Image 
          width={150} 
          height={0} 
          src='/create-challenge.gif' 
        />
        <ChangingText words={["awesome", "amazing", "stunning", "extraordinary", "spectacular"]} />
    </section>
    )
  );
}

export default CreateChallenge;