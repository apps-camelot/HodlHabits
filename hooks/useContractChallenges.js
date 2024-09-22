import { useState, useEffect } from 'react';
const { ethers, BrowserProvider } = require('ethers');
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from '@/constants/smartcontract';

const useContractChallenges = ({
  getOnlyOwnChallenges = false,
  specificChallengeId = null
}) => {
  const isLoggedIn = useIsLoggedIn();
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let prevChallengeId = null;
    const fetchChallenges = async () => {
      if (!isLoggedIn || !window.ethereum) {
        setError('User is not logged in or Ethereum provider is not available');
        return;
      }

      try {
        setIsLoading(true);

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const currentAddress = await signer.getAddress();
        const contract = new ethers.Contract(SMART_CONTRACT_ADDRESS, SMART_CONTRACT_ABI, signer);

        if(specificChallengeId) {
          const data = await contract.challenges(specificChallengeId);
          const challengeVideos = await contract.getChallengeVideos(specificChallengeId);
          const participants = await contract.getParticipants(specificChallengeId);

          const participantsObject = participants
            .filter(participant => Array.isArray(participant) && participant.length > 0 && participant[0])
            .map(participant => ({
              address: participant[0].toString() || "Unknown",
              progress: 0
            }));

          const challengeData = {
            challengeId: specificChallengeId,
            title: data[0],
            creator: data[1],
            stakeAmount: ethers.formatUnits(data[2], 6),
            repetitions: data[3].toString(),
            startTime: data[4].toString(),
            duration: data[5].toString(),
            isOpenForSponsors: data[6],
            rewardsDistributed: data[7],
            totalStakeAmount: ethers.formatUnits(data[8], 6),
            totalSponsoredAmount: ethers.formatUnits(data[9], 6),
            totalPenalizedAmount: ethers.formatUnits(data[10], 6),
            challengeVideos: challengeVideos[0],
            participants: participantsObject
          };
          
          setChallenges([challengeData]);
          return;
        }

        const challengesResponse = await contract.challengeCounter();
        const challengesCount = Number(challengesResponse.toString());
        
        if(challengesCount === 0) return;

        const challengePromises = Array.from({ length: challengesCount }, (_, index) => {
          const i = index + 1;
          return (async () => {
            const data = await contract.challenges(i);
            const challengeVideos = await contract.getChallengeVideos(i);
            const participants = await contract.getParticipants(i);
  
            const participantsObject = participants
            .filter(participant => Array.isArray(participant) && participant.length > 0 && participant[0])
            .map(participant => ({
              address: participant[0].toString() || "Unknown",
              progress: 0
            }));


            if (getOnlyOwnChallenges && data[1] != currentAddress) return null;
            if (prevChallengeId === i) return null;
  
            const challengeData = {
              challengeId: i,
              title: data[0],
              creator: data[1],
              stakeAmount: ethers.formatUnits(data[2], 6),
              repetitions: data[3].toString(),
              startTime: data[4].toString(),
              duration: data[5].toString(),
              isOpenForSponsors: data[6],
              rewardsDistributed: data[7],
              totalStakeAmount: ethers.formatUnits(data[8], 6),
              totalSponsoredAmount: ethers.formatUnits(data[9], 6),
              totalPenalizedAmount: ethers.formatUnits(data[10], 6),
              challengeVideos: challengeVideos[0],
              participants: participantsObject
            };
            
            prevChallengeId = i;
            return challengeData;
          })();
        });

        const challengeResults = await Promise.all(challengePromises);
        const filteredChallenges = challengeResults.filter(challenge => challenge !== null);
        setChallenges(filteredChallenges);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn && window.ethereum) {
      fetchChallenges();
    }
  }, [isLoggedIn]);

  return { challenges, isLoading, error };
}

export default useContractChallenges;