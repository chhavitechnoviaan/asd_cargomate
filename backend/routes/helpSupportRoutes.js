const express = require("express");
const router = express.Router();
const controller = require("../controllers/helpSupportController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.get("/dashboard", protect, controller.getDashboard);
router.post("/ticket", protect, upload.single("attachment"), controller.createTicket);
router.get("/tickets", protect, controller.getTickets);
router.get("/ticket/:id", protect, controller.getTicket);
router.post("/ticket/:id/reply", protect, controller.replyTicket);
router.put("/ticket/:id/status", protect, controller.updateTicketStatus);

router.get("/articles", protect, controller.getArticles);
router.get("/article/:slug", protect, controller.getArticle);
router.get("/categories", protect, controller.getCategories);
router.get("/search", protect, controller.searchKnowledgeBase);

module.exports = router;
