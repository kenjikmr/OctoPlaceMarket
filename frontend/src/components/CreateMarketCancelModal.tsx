import React from "react";
import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";

import { ethers } from "ethers";
import contractABI from "../abi/OctoplaceMarket.json";

type Props = {
  isOpen: any;
  onClose: any;
};

interface CustomWindow extends Window {
  ethereum?: any;
}

export default function CreatorMarketCancelModal({ isOpen, onClose }: Props) {
  const initialRef = React.useRef(null);

  const [nftContractValue, setNftContractValue] = useState("");
  const [itemIdValue, setItemIdValue] = useState("");

  const toast = useToast();

  async function handleSendTransaction() {
    try {
      console.log(nftContractValue + " : " + itemIdValue);
      // Create a new provider using MetaMask
      const customWindow = window as CustomWindow;
      const provider = new ethers.providers.Web3Provider(customWindow.ethereum);

      // Request access to the user's MetaMask account
      await provider.send("eth_requestAccounts", []);

      // Use the provider to interact with the smart contract
      const contractAddress = "0x680c79E9863FCce243BFB33b939539b9696a2C36";

      // const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);

      const signer = provider.getSigner();
      const contractForTx = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        signer
      );

      // Call a function on the smart contract
      await contractForTx.createMarketCancelAdmin(
        nftContractValue,
        itemIdValue
      );

      toast({
        title: "Successed.",
        description: "Successfully!!!",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const handleNftContractChange = (event: any) => {
    setNftContractValue(event.target.value);
  };

  const handleItemIdChange = (event: any) => {
    setItemIdValue(event.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent
        background="gray.900"
        border="1px"
        borderStyle="solid"
        borderColor="gray.700"
        borderRadius="3xl"
      >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
          createMarketCancelAdmin
        </ModalHeader>
        <ModalCloseButton
          color="white"
          fontSize="sm"
          _hover={{
            color: "whiteAlpha.700",
          }}
        />
        <ModalBody pt={0} px={4} pb={2}>
          <Box
            borderRadius="3xl"
            border="1px"
            borderStyle="solid"
            borderColor="gray.600"
            px={5}
            pt={6}
            pb={6}
            mb={3}
          >
            <FormControl>
              <FormLabel color="gray.400" fontSize="sm">
                NFT Contract Address(address)
              </FormLabel>
              <Input
                value={nftContractValue}
                onChange={handleNftContractChange}
                ref={initialRef}
                color="white"
                placeholder="NFT Contract Address"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="gray.400" fontSize="sm">
                Item ID(uint256)
              </FormLabel>
              <Input
                value={itemIdValue}
                onChange={handleItemIdChange}
                color="white"
                placeholder="Item ID"
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter
          justifyContent="end"
          background="gray.700"
          borderBottomLeftRadius="3xl"
          borderBottomRightRadius="3xl"
          p={6}
        >
          <Button
            onClick={handleSendTransaction}
            color="white"
            bg="blue.600"
            border="1px solid transparent"
            _hover={{
              border: "1px",
              borderStyle: "solid",
              borderColor: "blue.400",
              backgroundColor: "gray.700",
            }}
            borderRadius="xl"
            m="1px"
            px={3}
            height="38px"
          >
            Send transaction here...
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
