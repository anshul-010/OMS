import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";

function OrderStatus() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);

  const handleLookup = () => {
    setStatus("Placed → Picked → Shipped → Delivered (mock)");
  };

  return (
    <Box maxW="500px" mx="auto">
      <Heading mb={6}>Track Your Order</Heading>
      <VStack spacing={4}>
        <Input placeholder="Enter Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        <Button colorScheme="teal" onClick={handleLookup}>Lookup</Button>
        {status && <Text>Status: {status}</Text>}
      </VStack>
    </Box>
  );
}

export default OrderStatus;