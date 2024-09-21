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

  const handleCreateChallenge = () => {
    setLoadingChallengeCreation(true);
  }

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