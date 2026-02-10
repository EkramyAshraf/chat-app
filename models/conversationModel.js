const mongoose = require("mongoose");
const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
