const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");

const userRoute = express.Router();

// Signup Route
userRoute.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Basic validations
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).send({ msg: "Please fill all fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ msg: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword, // optional: or remove confirmPassword from schema entirely
    });

    await newUser.save();
    res.status(201).send({ msg: "Signup successful" });
  } catch (error) {
    res.status(500).send({ msg: "Signup failed", error: error.message });
  }
});

// Login Route
userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validations
    if (!email || !password) {
      return res.status(400).send({ msg: "Please enter email and password" });
    }

    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "7d",
    });

    res.status(200).send({ msg: "Login successful", token });
  } catch (error) {
    res.status(500).send({ msg: "Login failed", error: error.message });
  }
});

module.exports = { userRoute };
