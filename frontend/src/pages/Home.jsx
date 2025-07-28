import React, { useEffect, useState } from "react";
import { Box, Grid, Heading, Text, Spinner } from "@chakra-ui/react";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box textAlign="center" p={4}>
      <Heading mb={4}>Welcome to the Order Management System</Heading>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
          {data?.map((item) => (
            <ProductCard key={item._id || item.id} data={item} />
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Home;
