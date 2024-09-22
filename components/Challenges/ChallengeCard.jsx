"use client";

import {Card, CardBody, CardFooter, Avatar, Chip, useDisclosure} from "@nextui-org/react";
import { AcmeIcon } from "../Icons/Acme";
import JoinChallengeModal from "./JoinChallengeModal";
import { abbreviateAddress, convertDuration, convertUnixToDate } from "@/constants/util";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect, useState } from "react";

const { ethers, BrowserProvider } = require('ethers');

const ChallengeCard = ({ 
  challengeId,
  title,
  creator, 
  duration, 
  repetitions, 
  stakeAmount, 
  startTime, 
  isOpenForSponsors,
  rewardsDistributed,
  participants
}) => {
  const router = useTransitionRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [hasAlreadyJoined, setHasAlreadyJoined] = useState(false);

  console.debug(`hasAlreadyJoined ${title}`, hasAlreadyJoined);

  const handleOpenCard = async () => {
    if (hasAlreadyJoined) {
      router.push(`/challenge/${challengeId}`);
      return;
    }

    onOpen();
  }

  useEffect(() => {
    const handleSearchIfJoinedAlready = async () => {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const currentAddress = await signer.getAddress();
  
      return setHasAlreadyJoined(participants.find((participant) => participant.address === currentAddress));
    }

    handleSearchIfJoinedAlready();
  }, [participants]);

  return (
    <>
      <Card 
        isPressable
        className="max-w-[320px] h-fit border-small border-default-100 p-3" 
        shadow="sm"
        onClick={handleOpenCard}
      >
        <CardBody className="px-4 pb-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex max-w-[80%] flex-col gap-1">
              <p className="text-medium font-medium">{ title }</p>
              <p className="text-small text-default-500">by { abbreviateAddress(creator) }</p>
            </div>
            <Avatar className="bg-content2" icon={<AcmeIcon />} />
          </div>
            <p className="text-small text-default-500">{ convertUnixToDate(startTime) }</p>
            <p className="text-small text-default-500">{ convertDuration(duration) }</p>
            <p className="text-small text-default-500">{ repetitions } repetitions</p>
            <p className="text-small text-default-500">{ stakeAmount } stake amount</p>
        </CardBody>
        <CardFooter className="justify-between gap-2">
          {
            isOpenForSponsors && 
            <Chip color="primary" variant="dot">
              Open for sponsors
            </Chip>
          }
          {
            rewardsDistributed && 
            <Chip color="success" variant="dot">
              Rewards distributed
            </Chip>
          }
          {
            hasAlreadyJoined && 
            <Chip color="primary" variant="shadow">
              Joined
            </Chip>
          }
        </CardFooter>
      </Card>

      <JoinChallengeModal isOpen={isOpen} onClose={onClose} challengeId={challengeId} />
    </>
  )
}

export default ChallengeCard