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
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {

  const navigate = useNavigate();

  const handleBuyNow = (product) => {
  navigate("/checkout", { state: product }); // pass full product object
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
          <Button variant="solid" colorScheme="blue" onClick={()=>handleBuyNow(data) }>
            Buy now
          </Button>
          {/* <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
