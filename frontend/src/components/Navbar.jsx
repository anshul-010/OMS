import React from "react";
import { Flex, Box, Button, Heading, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Flex bg="blue.500" color="white" p={4} align="center">
      <Link to="/">
        <Heading size="md">OMS</Heading>
      </Link>
      <Spacer />
      <Box>
        <Link to="/">
          <Button variant="ghost" colorScheme="whiteAlpha" mr={2}>
            Home
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="ghost" colorScheme="whiteAlpha" mr={2}>
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="ghost" colorScheme="whiteAlpha" mr={2}>
            Signup
          </Button>
        </Link>
        <Link to="/create-order">
          <Button variant="ghost" colorScheme="whiteAlpha" mr={2}>
            Create Order
          </Button>
        </Link>
        <Link to="/order">
          <Button variant="ghost" colorScheme="whiteAlpha" mr={2}>
            Track Order
          </Button>
        </Link>
        <Link to="/admin">
          <Button variant="ghost" colorScheme="whiteAlpha">
            Admin
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
