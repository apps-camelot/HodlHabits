import React from "react";
import AppScreenshotLight from "@/components/Landing/AppScreenshotLight";
import WorldCoinConnect from "@/components/Auth/WorldCoinConnect";
import DynamicConnect from "@/components/Auth/DynamicConnect";


const Page = () => {
  return (
    <div className="relative flex h-screen min-h-dvh w-full flex-col gap-9 overflow-y-auto bg-background p-4 md:gap-12 md:px-10 md:py-[34px]">
      <main className="flex flex-col items-center rounded-2xl bg-hero-section-centered-navbar px-3 md:rounded-3xl md:px-0">
        <section className="my-14 mt-24 flex flex-col items-center justify-center gap-6">
          <h1 className="text-center text-[clamp(2.125rem,1.142rem+3.659vw,4rem)] font-bold leading-none text-foreground">
            Generate new <br /> On-Chain habits.
          </h1>
          <p className="text-center text-base text-default-600 sm:w-[466px] md:text-lg md:leading-6">
            Create habits that are stored on the blockchain and earn rewards for completing them!
          </p>
          <p className="text-center text-sm text-default-500 sm:w-[466px] md:text-sm md:leading-6">
            Continue with
          </p>
          <div className="w-full flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <DynamicConnect />
            <WorldCoinConnect />
          </div>
        </section>
        <div className="mt-auto w-[calc(100%-calc(theme(spacing.4)*2))] max-w-6xl overflow-hidden rounded-tl-2xl rounded-tr-2xl border-1 border-white/25 bg-white/40 px-2 pt-3 md:px-4 md:pt-6">
          <AppScreenshotLight />
        </div>
      </main>
    </div>
  )
}

export default Page