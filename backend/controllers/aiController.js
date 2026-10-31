const ChatMessage = require("../models/ChatMessage");
const Buyer = require("../models/Buyer");
exports.askAI = async (req, res) => {
  try {
    const { message, country, product } = req.body;

    let response = "";
    if (message.toLowerCase().includes("buyers")) {
      const buyers = await Buyer.find({ product })
        .limit(5);

      response = `Top buyers for ${product} in ${country}`;
      
      return res.json({
        status: 1,
        response,
        data: buyers
      });
    }

    response = "AI response generated";

    const chat = await ChatMessage.create({
      message,
      response,
      context: { country, product }
    });

    res.json({
      status: 1,
      data: chat
    });

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};
exports.getChats = async (req, res) => {
  const chats = await ChatMessage.find().sort({ createdAt: -1 });

  res.json({
    status: 1,
    data: chats
  });
};