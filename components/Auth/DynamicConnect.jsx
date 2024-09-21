"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import { useTransitionRouter } from 'next-view-transitions'
import { DynamicWidget, useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useAppStore } from "@/context/state";

const DynamicConnect = () => {
  const isLoggedIn = useIsLoggedIn();
  const router = useTransitionRouter();
  const { sdkHasLoaded } = useDynamicContext();
  const { setDynamicAuth } = useAppStore();

  useEffect(() => {
    if (isLoggedIn && sdkHasLoaded) {
      setDynamicAuth();
      router.push("/dashboard");
    }
  }, [isLoggedIn, sdkHasLoaded]);

  return (
    !sdkHasLoaded && 
    <div className="flex items-center justify-end sm:justify-center basis-[50%]">
      <Spinner size="large" color="default" />
    </div> ||
    <div className="flex items-center justify-end basis-[50%]">
        <DynamicWidget 
          buttonClassName="flex gap-2"
          buttonContainerClassName="flex gap-4"
          innerButtonComponent={
          <span style={{ display: "flex", gap: "0.5rem", justifyContent: "center", alignItems: "center" }}>
            <Image
              src="/dynamic-icon.png"
              width={24}
              height={24}
              alt="Dynamic Icon"
            />
            <p>
              Dynamic
            </p>
          </span>
        }>
        </DynamicWidget>
    </div>
  )
}

export default DynamicConnect