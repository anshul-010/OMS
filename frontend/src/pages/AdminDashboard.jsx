import React from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";

function AdminDashboard() {
  const mockOrders = [
    { id: "1", customer: "John", status: "PAID" },
    { id: "2", customer: "Jane", status: "FULFILLED" },
  ];

  return (
    <Box>
      <Heading>Admin Dashboard</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Customer</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {mockOrders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer}</Td>
              <Td>{order.status}</Td>
              <Td>
                <Button size="sm" colorScheme="blue">Edit</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default AdminDashboard;