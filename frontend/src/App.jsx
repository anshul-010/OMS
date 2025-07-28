import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateOrder from "./pages/CreateOrder";
import OrderStatus from "./pages/OrderStatus";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CheckOut from "./pages/CheckOut";
import Order from "./pages/Order";
import Private from "./private/Private";

function App() {
  return (
    <Box border="2px">
      <Router>
        <Navbar />
        <Box p={6} border="0px">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/order" element={<Order />} />
            <Route
              path="/checkout"
              element={
                <Private>
                  <CheckOut />
                </Private>
              }
            />

            {/* <Route path="/create-order" element={<CreateOrder />} /> */}
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Box>
      </Router>
    </Box>
  );
}

export default App;
