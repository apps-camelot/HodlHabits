import useMyChallenges from "@/hooks/useMyChallenges";
import { Icon } from "@iconify/react";

const ChallengesGrid = () => {
  const { challengeData, isLoading, error } = useMyChallenges();

  return (
    <section className="h-[calc(100dvh-20rem)]">
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <p className="text-lg text-default-400">No challenges found</p>
            <Icon icon="solar:ghost-broken" className="text-default-400 opacity-20" width={200} />
        </div>
    </section>
  )
}

export default ChallengesGrid