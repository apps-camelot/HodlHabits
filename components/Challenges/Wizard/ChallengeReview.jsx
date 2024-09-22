import ChallengeDetailsCard from "./ChallengeDetails/ChallengeDetailsCard"

const ChallengeReview = ({ challengeDetails, challengeVideos }) => {

  return (
    <section>
        <header>
          <div className="text-3xl font-bold leading-9 text-default-foreground">
              Challenge Review
          </div>
          <div className="py-4 text-default-500">
              Review the information about your new challenge before upload.
          </div>
        </header>

        <div className="flex flex-row gap-4 p-4">
          <ChallengeDetailsCard details={challengeDetails} videos={challengeVideos}/>
        </div>
    </section>
  )
}

export default ChallengeReview