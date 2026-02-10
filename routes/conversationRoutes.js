const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  createConversation,
  getUserConversations,
} = require("../controllers/conversationController");

const router = express.Router();
router.post("/", protect, createConversation);
router.get("/", protect, getUserConversations);
module.exports = router;
