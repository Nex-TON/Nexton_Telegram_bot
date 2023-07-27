const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const User = require("../../models/User");

router.get("/", async (req, res) => {
  try {
    // Get userId from query parameters
    const { userId } = req.query;

    // Find the user by the provided userId
    const targetUser = await User.findOne({ userId });

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the found user
    res.status(200).json({ user: targetUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
