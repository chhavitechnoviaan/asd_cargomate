const express=require("express");

const router=express.Router();

const controller=require("../controllers/helpSupportController");

const {protect}=require("../middleware/authMiddleware");
router.get("/dashboard",protect,controller.getDashboard);
router.post("/ticket",protect,controller.createTicket);

router.get("/tickets",protect,controller.getTickets);

router.get("/ticket/:id",protect,controller.getTicket);
router.get("/articles",protect,controller.getArticles);

router.get("/article/:slug",protect,controller.getArticle);
router.get("/categories",protect,controller.getCategories);

router.get(
    "/search",
    protect,
    controller.searchKnowledgeBase
);

module.exports=router;