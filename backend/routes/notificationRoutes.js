const express=require("express");

const router=express.Router();

const notification=require("../controllers/notificationController");

const {protect}=require("../middleware/authMiddleware");

router.get("/",protect,notification.getNotifications);

router.get("/count",protect,notification.getUnreadCount);

router.put("/:id/read",protect,notification.markRead);

router.put("/read-all",protect,notification.markAllRead);

router.delete("/clear",protect,notification.clearNotifications);

router.get("/settings",protect,notification.getSettings);

router.put("/settings",protect,notification.updateSettings);

module.exports=router;