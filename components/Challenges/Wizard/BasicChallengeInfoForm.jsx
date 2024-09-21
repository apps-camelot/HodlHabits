"use client";

import { Avatar, cn } from "@nextui-org/react";
import { CustomCheckbox } from "./CustomCheckbox";
import { CheckboxGroup, DateRangePicker, Input, TimeInput } from "@nextui-org/react";
import { DEFAULT_TOKEN } from "@/constants/token-conf";

const BasicChallengeInfoForm = ({ formRef, challengeDetails, setChallengeDetails }) => {
  const inputProps = {
    labelPlacement: "outside",
    classNames: {
      label:
        "text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
    },
  };

  return (
    <section className="flex flex-col justify-center items-center max-w-[50%] m-auto">
      <div className="text-3xl font-bold leading-9 text-default-foreground">
        Challenge Information
      </div>
      <div className="py-4 text-default-500">
        Fill in the information about your new challenge.
      </div>
      <form
        ref={formRef}
        className={cn("grid grid-cols-12 flex-col gap-4 py-8")}
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          required
          isRequired
          className="col-span-12"
          label="Challenge title"
          name="challenge-title"
          placeholder="Type your challenge title here"
          onChange={(e) => setChallengeDetails((prev) => ({ ...prev, title: e.target.value }))}
          defaultValue={challengeDetails.title}
          {...inputProps}
        />

        <TimeInput 
          required
          isRequired 
          className="col-span-12"
          label="Challenge time" 
          name="challenge-time"
          placeholder="Type your challenge time here"
          onChange={(value) => setChallengeDetails((prev) => ({ ...prev, time: value }))}
          defaultValue={challengeDetails.time}
          {...inputProps}
        />

        <Input
          required
          isRequired
          className="col-span-12"
          label="Stake amount"
          name="challenge-stake"
          placeholder="Challenge stake"
          type="number"
          min={0}
          max={1000}
          onChange={(e) => setChallengeDetails((prev) => ({ ...prev, stake: e.target.value }))}
          defaultValue={challengeDetails.stake}
          endContent={
            <div className="flex gap-2">
              <p>{DEFAULT_TOKEN.name}</p>
              <Avatar alt="Token icon" className="h-6 w-6" src={DEFAULT_TOKEN.icon} />
            </div>
          }
          {...inputProps}
        />

        <DateRangePicker 
          required
          isRequired
          className="col-span-12"
          label="Duration"
          visibleMonths={2}
          pageBehavior="single"
          placeholder="Select the challenge duration"
          name="challenge-duration"
          id="challenge-duration"
          onChange={(value) => setChallengeDetails((prev) => ({ ...prev, duration: value }))}
          defaultValue={challengeDetails.duration}
          {...inputProps}
        />

        <CheckboxGroup
          required
          isRequired
          className="gap-1"
          name="challenge-repetition"
          label="Repetition"
          orientation="horizontal"
          classNames={{
            wrapper: "flex !flex-row !flex-nowrap gap-2 maxmd:!flex-wrap",
          }}
          onChange={(value) => setChallengeDetails((prev) => ({ ...prev, repetition: value }))}
          defaultValue={challengeDetails.repetition}
        >
          <CustomCheckbox value="monday">Mon</CustomCheckbox>
          <CustomCheckbox value="tuesday">Tue</CustomCheckbox>
          <CustomCheckbox value="wednesday">Wed</CustomCheckbox>
          <CustomCheckbox value="thursday">Thu</CustomCheckbox>
          <CustomCheckbox value="friday">Fri</CustomCheckbox>
          <CustomCheckbox value="saturday">Sat</CustomCheckbox>
          <CustomCheckbox value="sunday">Sun</CustomCheckbox>
        </CheckboxGroup>
      </form>
    </section>
  );
}

export default BasicChallengeInfoForm
