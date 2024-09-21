"use client"

import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { useTransitionRouter } from 'next-view-transitions'
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'
import { useAppStore } from '@/context/state';
import toast from 'react-hot-toast';

const WorldCoinConnect = () => {
    const router = useTransitionRouter();
    const { setWorldCoinAuth } = useAppStore();
    
    const onSuccess = (...args) => {
        if(!Array.isArray(args) && args.length <= 0) {
            toast.error('An error occurred while retrieving your WorldCoin data. Please try again.');
            return;
        };

        const authData = args[0];
        setWorldCoinAuth(authData);
        router.push('/dashboard');
        // window.location.replace("/dashboard");
    };
  

  return (
    <div className='flex items-center justify-start basis-[50%]'>
        <IDKitWidget
            app_id="app_staging_82f5386311a13c524bb95ff3a04e7c61"
            action="create-hold-habit"
            false
            verification_level={VerificationLevel.Device}
            // handleVerify={verifyProof}
            onSuccess={onSuccess}>
            {({ open }) => (
                <Button 
                    className="p-[1.7rem] bg-foreground font-medium text-background" 
                    onClick={open}
                    endContent={
                        <Image
                            src="/worldcoin-icon.png"
                            width={24}
                            height={24}
                            alt="WorldCoin Icon"
                        />
                    }
                >
                    WorldCoin
                </Button>
            )}
        </IDKitWidget>
    </div>
  )
}

export default WorldCoinConnect