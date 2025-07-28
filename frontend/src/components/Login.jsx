import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/AuthReducer/action";
import { useNavigate, useLocation } from "react-router-dom";

const initialData = {
  email: "",
  password: "",
  isStaff: false,
};

const Login = () => {
  const [data, setData] = useState(initialData);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, isError } = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname || "/";
  const productToPass = location.state?.from?.product;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(data))
      .then(() => {
        toast({
          title: "Login successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        if (from === "/checkout" && productToPass) {
          navigate("/checkout", { state: productToPass });
        } else {
          navigate(from);
        }
      })
      .catch(() => {
        toast({
          title: "Login failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <Box border="1px" width="500px" m="auto" mt={10} p={6}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={data.password}
            type="password"
            onChange={handleChange}
            placeholder="Enter Password"
          />
        </FormControl>

        <FormControl mt={4}>
          <Checkbox
            name="isStaff"
            isChecked={data.isStaff}
            onChange={handleChange}
            colorScheme="green"
          >
            Is Staff
          </Checkbox>
        </FormControl>

        <Box textAlign="center" mt={5}>
          <Button
            type="submit"
            colorScheme="blue"
            variant="outline"
            isLoading={isLoading}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
