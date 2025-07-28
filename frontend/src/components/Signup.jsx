import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

let initialData = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
  isStaff: false,
};

const Signup = () => {
  const [data, setData] = useState(initialData);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Signup Successful",
          description: result.message || "Account created successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setData(initialData); // Clear form
      } else {
        toast({
          title: "Signup Failed",
          description: result.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast({
        title: "Network Error",
        description: "Failed to connect to the server",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <Box border="1px" width="500px" m="auto" p={6}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter Password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={data.confirmPassword}
            onChange={handleChange}
          />
        </FormControl>

        <Box textAlign="center" mt={5}>
          <Button type="submit" colorScheme="blue" variant="outline">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Signup;
