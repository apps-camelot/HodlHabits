"use client";

import {
  Button,
  Tabs,
  Tab,
  Chip,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import ChallengesGrid from "@/components/Dashboard/Tabs/ChallengesGrid";
import DiscoverTab from "@/components/Dashboard/Tabs/DiscoverTab";
import { useTransitionRouter } from "next-view-transitions";
import GlobalChallengesTab from "@/components/Dashboard/Tabs/GlobalChallengesTab";

export default function Component() {
    const router = useTransitionRouter();

  return (
    <div className="w-full max-w-[1024px] px-4 lg:px-8">
        <header className="mb-6 flex w-full items-center justify-between">
            <div className="flex flex-col">
                <h1 className="text-xl font-bold text-default-900 lg:text-3xl">Dashboard</h1>
                <p className="text-small text-default-400 lg:text-medium">Manage your On-Chain habit challenges</p>
            </div>
            <Button
                className="bg-foreground text-background"
                startContent={
                    <Icon className="flex-none text-background/60" icon="lucide:plus" width={16} />
                }
                onClick={() => router.push("/challenge/new")}
            >
                New challenge
            </Button>
        </header>
        <Tabs
            aria-label="Navigation Tabs"
            classNames={{
                cursor: "bg-default-200 shadow-none",
                base: "w-full",
            }}
            radius="full"
            variant="light"
        >
            <Tab
                key="deployments"
                title={
                    <div className="flex items-center gap-2">
                        <p>My challenges</p>
                        <Icon icon="material-symbols:award-star-outline-rounded" className="text-default-400" width={16} />
                    </div>
                }
            >
                <ChallengesGrid />
            </Tab>

            {/* <Tab 
                key="discover" 
                title={
                    <div className="flex items-center gap-2">
                        <p>Discover</p>
                        <Icon icon="ri:compass-line" className="text-default-400" width={16} />
                    </div>
                }
            >
                <DiscoverTab />
            </Tab> */}
            <Tab 
                key="settings" 
                title={
                    <div className="flex items-center gap-2">
                        <p>Global challenges</p>
                        <Icon icon="ri:compass-line" className="text-default-400" width={16} />
                    </div>
                }
            >
                <GlobalChallengesTab />
            </Tab>
        </Tabs>
    </div>
  );
}
