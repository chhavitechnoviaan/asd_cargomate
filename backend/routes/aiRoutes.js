const router = require("express").Router();
const ctrl = require("../controllers/aiController");

const {protect}=require("../middleware/authMiddleware");
const quota=require("../middleware/subscriptionLimit");
router.post("/ask",protect,quota("aiChatbot"),ctrl.askAI);
router.get("/history", ctrl.getChats);

module.exports = router;