import { Icon } from "@iconify/react";
import { Spinner } from "@nextui-org/react";
import ChallengeCard from "@/components/Challenges/ChallengeCard";
import useContractChallenges from "@/hooks/useContractChallenges";

const ChallengesGrid = () => {
  const { challenges, isLoading, error } = useContractChallenges({
    getOnlyOwnChallenges: true,
  });

  return (
    isLoading && 
    <section className="h-[calc(100dvh-20rem)]">
      <Spinner color="primary" className="w-full h-full" />
    </section> ||
    <section className="h-[calc(100dvh-20rem)] grid grid-cols-3 gap-4">
      {
        challenges.length > 0 &&
        challenges.map((challenge, index) => {
          return (
            <ChallengeCard
              key={index}
              title={challenge.title}
              challengeId={challenge.challengeId}
              creator={challenge.creator}
              duration={challenge.duration}
              repetitions={challenge.repetitions}
              stakeAmount={challenge.stakeAmount}
              startTime={challenge.startTime}
              isOpenForSponsors={challenge.isOpenForSponsors}
              rewardsDistributed={challenge.rewardsDistributed}
              participants={challenge.participants}
            />
          )
        }) ||
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 col-span-3">
          <p className="text-lg text-default-400">No challenges found</p>
          <Icon icon="solar:ghost-broken" className="text-default-400 opacity-20" width={200} />
        </div>
      }  
    </section>
  )
}

export default ChallengesGrid