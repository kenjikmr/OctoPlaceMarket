import { useState } from "react";
import { Button, ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import CreatorFeeModal from "./components/CreatorFeeModal";
import CreatorMarketCancelModal from "./components/CreateMarketCancelModal";
import "@fontsource/inter";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [showFeeModal, setShowFeeModal] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ConnectButton handleOpenModal={onOpen} />
        <Button
          onClick={() => setShowMarketModal(true)}
          mt={12}
          bg="blue.800"
          color="blue.300"
          fontSize="lg"
          fontWeight="medium"
          borderRadius="xl"
          border="1px solid transparent"
          _hover={{
            borderColor: "blue.700",
            color: "blue.400",
          }}
          _active={{
            backgroundColor: "blue.800",
            borderColor: "blue.700",
          }}
        >
          Open Market Cancel
        </Button>
        <Button
          onClick={() => setShowFeeModal(true)}
          mt={12}
          bg="blue.800"
          color="blue.300"
          fontSize="lg"
          fontWeight="medium"
          borderRadius="xl"
          border="1px solid transparent"
          _hover={{
            borderColor: "blue.700",
            color: "blue.400",
          }}
          _active={{
            backgroundColor: "blue.800",
            borderColor: "blue.700",
          }}
        >
          Open Fee Modal
        </Button>
        <AccountModal isOpen={isOpen} onClose={onClose} />
        <CreatorFeeModal
          isOpen={showFeeModal}
          onClose={() => setShowFeeModal(false)}
        />
        <CreatorMarketCancelModal
          isOpen={showMarketModal}
          onClose={() => setShowMarketModal(false)}
        />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
