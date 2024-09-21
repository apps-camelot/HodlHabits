"use client";

import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";
import DetailCell from "./DetailCell";
import { DEFAULT_TOKEN } from "@/constants/token-conf";

// Define the colors for summary variables
const SUMMARY_COLORS = Object.freeze({
  days: "text-blue-500",
  time: "text-green-500",
  videos: "text-indigo-500",
  startDate: "text-purple-500",
  endDate: "text-red-500",
  stake: "text-yellow-500",
  penalty: "text-orange-500",
});

// Helper function to format time to 12-hour format
const formatTime = (time) => {
  let hours = time.hour % 12 || 12;
  let minutes = time.minute.toString().padStart(2, '0');
  let period = time.hour >= 12 ? 'PM' : 'AM';
  return `${hours}:${minutes} ${period}`;
};

// Helper function to format date to "Day Month Year"
const formatDate = (date) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${date.day} of ${months[date.month - 1]} ${date.year}`;
};

// Capitalize first letter function
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const ChallengeDetailsCard = ({ details, videos = [] }) => {
  const { title, time, stake, duration, repetition } = details;

  const formattedTime = formatTime(time);
  const formattedStartDate = formatDate(duration.start);
  const formattedEndDate = formatDate(duration.end);
  const formattedRepetition = repetition.map(capitalize).join(", ");

  // Calculate penalty based on stake and number of repetitions
  const penalty = (stake / repetition.length).toFixed(2);

  return (
    <Card className="p-2 w-[50%] m-auto">
      <CardHeader className="justify-between px-4">
        <div className="flex flex-col items-start">
          <p className="text-large capitalize">{title}</p>
        </div>
      </CardHeader>
      <CardBody className="space-y-2 px-6">
        <DetailCell label="Stake" value={stake} />

        <DetailCell label="Penalty" value={penalty} />

        <DetailCell
          label="Token"
          value={
            <div className="flex gap-2">
              <p>{DEFAULT_TOKEN.name}</p>
              <Avatar alt="Token icon" className="h-6 w-6" src={DEFAULT_TOKEN.icon} />
            </div>
          }
        />

        <DetailCell label="Time" value={`Starts at: ${formattedTime}`} />

        <DetailCell label="Start Date" value={formattedStartDate} />

        <DetailCell label="End Date" value={formattedEndDate} />

        <DetailCell label="Repetition" value={formattedRepetition} />

        {/* Human-readable summary */}
        <h1 className="font-semibold text-center">Lets take a look 👀...</h1>
        <p className="text-sm mt-4">
          <span className="capitalize">{title}</span> is programmed to be every 
          <span className={`ml-1 ${SUMMARY_COLORS.days}`}>{formattedRepetition}</span> by 
          <span className={`ml-1 ${SUMMARY_COLORS.time}`}>{formattedTime}</span>, with a collection of
          <span className={`ml-1 ${SUMMARY_COLORS.videos}`}>{videos.length} videos</span> in total, challenge is starting on 
          <span className={`ml-1 ${SUMMARY_COLORS.startDate}`}>{formattedStartDate}</span> and finishing on 
          <span className={`ml-1 ${SUMMARY_COLORS.endDate}`}>{formattedEndDate}</span>. The challenge stake will be 
          <span className={`ml-1 ${SUMMARY_COLORS.stake}`}>{stake} Tether</span>. If anyone in this event does not complete the required quota, they will be penalized with 
          <span className={`ml-1 ${SUMMARY_COLORS.penalty}`}>{penalty} Tether</span>, which will be distributed among the remaining participants who meet the requirements.
        </p>

        <p className="text-sm font-semibold mt-2">Just one step ahead! ➡️</p>
        <p className="text-sm mt-2">
          If this configuration is ok, please, click on the "Create Challenge" button to complete challenge registration.
        </p>
      </CardBody>
    </Card>
  );
};

export default ChallengeDetailsCard;
