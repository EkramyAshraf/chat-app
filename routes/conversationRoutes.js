const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { createConversation } = require("../controllers/conversationController");

const router = express.Router();
router.post("/", protect, createConversation);
module.exports = router;
