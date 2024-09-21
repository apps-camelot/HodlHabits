import { useState, useEffect } from 'react';
const { ethers, BrowserProvider } = require('ethers');
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from '@/constants/smartcontract';

const useContractChallenges = ({
  getOnlyOwnChallenges = false,
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

        const challengesResponse = await contract.challengeCounter();
        const challengesCount = Number(challengesResponse.toString());
        
        if(challengesCount === 0) return;

        const challengePromises = Array.from({ length: challengesCount }, (_, index) => {
          const i = index + 1;
          return (async () => {
            const data = await contract.challenges(i);
            const challengeVideos = await contract.getChallengeVideos(i);
  
            if (getOnlyOwnChallenges && data[0] !== currentAddress) return null;
            if (prevChallengeId === i) return null;
  
            const challengeData = {
              challengeId: i,
              creator: data[0],
              stakeAmount: ethers.formatUnits(data[1], 18),
              repetitions: data[2].toString(),
              startTime: data[3].toString(),
              duration: data[4].toString(),
              isOpenForSponsors: data[5],
              rewardsDistributed: data[6],
              totalStakeAmount: ethers.formatUnits(data[7], 18),
              totalSponsoredAmount: ethers.formatUnits(data[8], 18),
              totalPenalizedAmount: ethers.formatUnits(data[9], 18),
              challengeVideos: challengeVideos[0]
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