import { useAppStore } from "@/context/state";
import { useTransitionRouter } from "next-view-transitions";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import { useEffect, useState } from "react";

const abbreviateMerkleRoot = (merkleRoot) => {
  if (!merkleRoot) return "No Merkle Root";
  if (merkleRoot.length <= 10) return merkleRoot; // No need to abbreviate if it's too short
  const start = merkleRoot.slice(0, 6); // First 6 characters (0x + 4 chars)
  const end = merkleRoot.slice(-4); // Last 4 characters
  return `${start}...${end}`;
};

const WorldCoinWidgetData = () => {
  const router = useTransitionRouter();
  const { worldCoinData, handleLogout } = useAppStore();
  const { merkle_root, verification_level } = worldCoinData;
  const [abbreviatedMerkleRoot, setAbbreviatedMerkleRoot] = useState(abbreviateMerkleRoot(merkle_root));

  useEffect(() => {
    setAbbreviatedMerkleRoot(abbreviateMerkleRoot(merkle_root));
  }, [worldCoinData]);

  const logout = () => {
    router.push("/");
    handleLogout();
  }

  return (
    <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "/worldcoin-icon.png",
              color: "primary",
              className: "bg-black",
              size: "sm",
            }}
            className="transition-transform"
            description={`Verification Level: ${verification_level}`}
            name={abbreviatedMerkleRoot}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{ abbreviatedMerkleRoot }</p>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={() => logout()}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}

export default WorldCoinWidgetData