import { useState, useEffect } from 'react';
const { ethers, BrowserProvider } = require('ethers');
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from '@/constants/smartcontract';

function useMyChallenges() {
  const isLoggedIn = useIsLoggedIn();
  const [challengeData, setChallengeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      if (!isLoggedIn || !window.ethereum) {
        setError('User is not logged in or Ethereum provider is not available');
        return;
      }

      try {
        setIsLoading(true);

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.debug(signer)
        const contract = new ethers.Contract(SMART_CONTRACT_ADDRESS, SMART_CONTRACT_ABI, signer);
        console.debug(contract.interface)

        const challengeCounter = await contract.challengeCounter();
        console.debug(challengeCounter)

        const challengeId = 2;
        const data = await contract.challenges(challengeId);
        console.debug(data)

        setChallengeData({
          creator: data.creator,
          stakeAmount: data.stakeAmount.toString(),
          repetitions: data.repetitions.toNumber(),
          startTime: data.startTime.toNumber(),
          duration: data.duration.toNumber(),
          isOpenForSponsors: data.isOpenForSponsors,
          rewardsDistributed: data.rewardsDistributed,
          totalStakeAmount: data.totalStakeAmount.toString(),
          totalSponsoredAmount: data.totalSponsoredAmount.toString(),
          totalPenalizedAmount: data.totalPenalizedAmount.toString(),
        });
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

  return { challengeData, isLoading, error };
}

export default useMyChallenges;
