
import { Icon } from "@iconify/react"
import {
  SignProtocolClient,
  SpMode,
  EvmChains
} from "@ethsign/sp-sdk";
import { Modal, ModalContent, ModalHeader, ModalBody, Input, Button, ModalFooter, Textarea } from "@nextui-org/react"

const { privateKeyToAccount } = require("viem/accounts");

const AttestFormModal = ({ isOpen, onClose }) => {
  const createNotaryAttestation = async (contractDetails, signer) => {
    const client = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.optimismSepolia,
      account: privateKeyToAccount("onchain_evm_11155420_0x45"),
    });

    const res = await client.createAttestation({
      schemaId: "0x45",
      data: {
        contractDetails,
        signer
      },
      indexingValue: signer.toLowerCase()
    });
  }

  return (
    <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        placement="top-center"
      >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Attest a winner</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <Icon icon="solar:cup-star-bold" className="text-lg" />
                }
                label="Winner address"
                placeholder="Enter winner address"
                variant="bordered"
              />
              <Input
                endContent={
                  <Icon icon="streamline:star-2" className="text-lg" />
                }
                label="Challenge ID"
                placeholder="Enter challenge ID"
                variant="bordered"
              />
              <Textarea
                label="Congratulations message"
                placeholder="Enter congratulations message"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={createNotaryAttestation}>
                Attest
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default AttestFormModal