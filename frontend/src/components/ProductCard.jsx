import {
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Card,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const handleBuyNow = (product) => {
    if (isAuth) {
      try {
        // ✅ Do NOT save to localStorage here anymore

        navigate("/checkout", { state: product }); // Still passing product
      } catch (err) {
        console.error("Buy now error:", err);
      }
    } else {
      // Redirect to login with `from` and `product` in state
      navigate("/login", {
        state: {
          from: { pathname: "/checkout", product },
        },
      });
    }
  };

  return (
    <Card maxW="sm" m={4}>
      <CardBody>
        <Image
          src={data.img}
          alt={data.name}
          borderRadius="lg"
          h="200px"
          w="100%"
          objectFit="cover"
        />
        <Stack mt="4" spacing="2">
          <Heading size="md">{data.name}</Heading>
          <Text>{data.title}</Text>
          <Text color="blue.600" fontSize="2xl">
            ₹{data.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => handleBuyNow(data)}
          >
            Buy now
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
