import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";

function CreateOrder() {
  const [form, setForm] = useState({ customerName: "", product: "", quantity: 1 });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Order created (mock): " + JSON.stringify(form));
  };

  return (
    <Box  mx="auto">
      <Heading mb={6}>Create Order</Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Customer Name</FormLabel>
          <Input name="customerName" onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Product</FormLabel>
          <Input name="product" onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Quantity</FormLabel>
          <Input type="number" name="quantity" onChange={handleChange} />
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit}>Submit Order</Button>
      </VStack>
    </Box>
  );
}

export default CreateOrder;
