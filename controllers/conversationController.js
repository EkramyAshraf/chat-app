const Conversation = require("../models/conversationModel");

//create 1-1 conversation
exports.createConversation = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.body;

    //1-prevent open chat with yourself
    if (senderId === receiverId) {
      return res.status(400).json({
        message: "You cannot create a conversation with yourself",
      });
    }

    //2-check if chat already exists
    const existingConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    //3-create new chat
    const newConversation = await Conversation.create({
      members: [senderId, receiverId],
    });

    return res.status(201).json(newConversation);
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all conversations for logged-in user
exports.getUserConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await Conversation.find({ members: userId }).populate(
      "members",
      "username email",
    );

    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
