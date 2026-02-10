const Conversation = require("../models/conversationModel");

exports.createConversation = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.body;

    //prevent open chat with yourself
    if (senderId === receiverId) {
      return res.status(400).json({
        message: "You cannot create a conversation with yourself",
      });
    }

    //check if chat already exists

    const existingConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      res.status(200).json(existingConversation);
    }
  } catch (err) {}
};
