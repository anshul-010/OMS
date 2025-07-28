import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Progress,
  VStack,
  HStack,
  Circle,
} from "@chakra-ui/react";

const stages = ["Placed", "Picked", "Shipped", "Delivered"];

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [statusIndex, setStatusIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const stored = localStorage.getItem("orderData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setOrders(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (e) {
        console.error("Invalid data", e);
      }
    }
  }, []);

  useEffect(() => {
    let timer;
    if (activeOrder) {
      timer = setInterval(() => {
        setStatusIndex((prev) => {
          if (prev < stages.length - 1) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [activeOrder]);

  const handleTrack = (order) => {
    setActiveOrder(order);
    setStatusIndex(0);
    onOpen();
  };

  return (
    <Box p={8} maxW="1000px" m="auto">
      <Heading mb={6} textAlign="center" color="teal.600">
        Your Orders
      </Heading>
      <Flex direction="column" gap={6}>
        {orders.map((order, idx) => (
          <Flex
            key={idx}
            p={4}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="md"
            align="center"
            justify="space-between"
            bg="gray.50"
          >
            <HStack spacing={4}>
              <Image
                src={order.img}
                alt={order.name}
                boxSize="100px"
                borderRadius="md"
                objectFit="cover"
              />
              <Box>
                <Text fontWeight="bold">{order.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  ₹{order.price}
                </Text>
              </Box>
            </HStack>
            <Button colorScheme="teal" onClick={() => handleTrack(order)}>
              Track Order
            </Button>
          </Flex>
        ))}
      </Flex>

      {/* Modal for Tracking */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tracking Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" justify="space-between" px={4} py={6}>
              {stages.map((stage, index) => (
                <React.Fragment key={stage}>
                  <VStack spacing={2}>
                    <Circle
                      size="20px"
                      bg={index <= statusIndex ? "green.400" : "gray.300"}
                    />
                    <Text
                      fontSize="sm"
                      fontWeight={index <= statusIndex ? "bold" : "normal"}
                      color={index <= statusIndex ? "green.600" : "gray.500"}
                    >
                      {stage}
                    </Text>
                  </VStack>
                  {index < stages.length - 1 && (
                    <Box
                      flex="1"
                      height="2px"
                      bg={index < statusIndex ? "green.400" : "gray.300"}
                      //   mx={1}
                      mb={7}
                    />
                  )}
                </React.Fragment>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Order;
