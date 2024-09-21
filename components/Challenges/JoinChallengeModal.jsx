import { useState } from "react";
import toast from "react-hot-toast";
import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from "@/constants/smartcontract";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "@nextui-org/react";

const { Contract, BrowserProvider } = require('ethers');

const JoinChallengeModal = ({
    isOpen,
    onClose,
    challengeId,
}) => {  
    const [joiningChallenge, setJoiningChallenge] = useState(false);

    const handleJoinChallenge = async () => {
        setJoiningChallenge(true);
        try {
            if (!window.ethereum) {
                console.error('No Ethereum wallet detected');
                return;
            }
        
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(SMART_CONTRACT_ADDRESS, SMART_CONTRACT_ABI, signer);
            const tx = await contract.joinChallenge(challengeId);
        
            const receipt = await tx.wait(3);
            toast.success('Joined challenge! 🎉');
            onClose();
        } catch (error) {
            console.error('Error joining challenge:', error);
            toast.error('Error joining challenge. Please try again.');
        } finally {
            setJoiningChallenge(false);
        }
    }

    return (
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Join challenge</ModalHeader>
                <ModalBody>
                    <p> 
                        Wanna join this challenge?
                    </p>
                </ModalBody>
                <ModalFooter className="p-4">
                    {
                        joiningChallenge && 
                        <Spinner color="primary" label="Joining..." className="w-full" />
                        ||
                        <>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Nevermind
                            </Button>
                            <Button color="primary" onPress={handleJoinChallenge}>
                                Let's do it!
                            </Button>
                        </>
                    }
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    );
}

export default JoinChallengeModal