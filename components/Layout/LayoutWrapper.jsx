"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { baseSepolia } from "viem/chains";
import { Toaster } from "react-hot-toast";
import Nav from "./Nav/Nav";
import { useAppStore } from "@/context/state";
import { Spinner } from "@nextui-org/react";

const baseSepoliaNetwork = {
  chainId: '0x14a34',
  chainName: 'Base Sepolia',
  rpcUrls: ['https://sepolia.basescan.org'],
  nativeCurrency: {
    name: 'SepoliaETH',
    symbol: 'SepoliaETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://sepolia.basescan.org'],
}

const LayoutWrapper = ({ children }) => {
  const { isDynamicAuth, isWorldCoinAuth } = useAppStore();

  return (
    <DynamicContextProvider
      settings={{
        // 2762a57b-faa4-41ce-9f16-abff9300e2c9
        environmentId: "9b8edd78-3c73-4a3d-bb75-af8abf583feb",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <Toaster position="top-left" />
      <div className="w-full">
        { (isDynamicAuth || isWorldCoinAuth) && <Nav /> }
        <main className="flex w-full flex-col items-center">
          { children }          
        </main>
      </div>
    </DynamicContextProvider>
  )
}

export default LayoutWrapper