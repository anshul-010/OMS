import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
const CheckOut = () => {
  const toast = useToast();

  const location = useLocation();
  const product = location.state;

  function handleConfirmOrder() {
  let existingOrders = [];

  try {
    const rawData = localStorage.getItem("orderData");
    existingOrders = Array.isArray(JSON.parse(rawData)) ? JSON.parse(rawData) : [];
  } catch (e) {
    existingOrders = []; // fallback to empty array on error
  }

  const updatedOrders = [...existingOrders, product];

  localStorage.setItem("orderData", JSON.stringify(updatedOrders));

  toast({
    position: 'top',
    render: () => (
      <Box color='white' p={3} bg='green.500'>
        Order Placed 😊
      </Box>
    ),
  });
}


  if (!product) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="md">No product data found.</Heading>
      </Box>
    );
  }

  const discount = 0.05; // 5% discount
  const discountedPrice = product.price - product.price * discount;

  return (
    <Box
      p={8}
      maxW="1000px"
      m="auto"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading mb={6} textAlign="center" color="teal.600">
        Checkout
      </Heading>

      <Flex gap={8} direction={{ base: "column", md: "row" }} align="center">
        <Image
          src={product.img}
          alt={product.name}
          boxSize="250px"
          objectFit="cover"
          borderRadius="md"
        />
        <Box flex="1">
          <Heading size="md" mb={2}>
            {product.name}
          </Heading>
          <Text color="gray.600" mb={2}>
            Delicious food prepared fresh with quality ingredients. Packed with
            flavors!
          </Text>
          <Text fontWeight="bold" mb={2}>
            Price:{" "}
            <Text as="span" color="red.500" textDecor="line-through">
              ₹{product.price}
            </Text>{" "}
            <Text as="span" color="green.600" ml={2}>
              ₹{discountedPrice.toFixed(2)} (5% OFF)
            </Text>
          </Text>
          <Text mt={2} fontSize="sm" color="gray.500">
            Estimated Delivery: 30–45 mins • Free delivery
          </Text>
        </Box>
      </Flex>

      <Box mt={10}>
        <Heading size="sm" mb={4}>
          Choose Payment Method:
        </Heading>
        <RadioGroup defaultValue="card">
          <Stack spacing={4} direction="column">
            <Radio value="card">Pay Online (Credit/Debit/UPI)</Radio>
            <Radio value="cod">Cash on Delivery</Radio>
          </Stack>
        </RadioGroup>
      </Box>

      <Button colorScheme="teal" mt={8} width="100%" onClick={handleConfirmOrder}>
        Confirm Order
      </Button>
    </Box>
  );
};

export default CheckOut;
