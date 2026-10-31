const Notification = require("../models/Notification");
const NotificationSetting = require("../models/NotificationSetting");

exports.getNotifications = async (req, res) => {
  try {

    const {
      category,
      urgency,
      search,
      startDate,
      endDate
    } = req.query;

    let query = {
      userId: req.user._id
    };

    if (category && category !== "All") {
      query.category = category;
    }

    if (urgency) {
      query.urgency = urgency;
    }

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          message: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 });

    res.json({
      status: 1,
      total: notifications.length,
      data: notifications
    });

  } catch (err) {

    res.status(500).json({
      status: 0,
      message: err.message
    });

  }
};

exports.getUnreadCount = async (req, res) => {

  try {

    const unread = await Notification.countDocuments({
      userId: req.user._id,
      isRead: false
    });

    res.json({
      status: 1,
      unread
    });

  } catch (err) {

    res.status(500).json({
      status: 0,
      message: err.message
    });

  }

};

exports.markRead = async (req, res) => {

    try {
  
      const notification = await Notification.findOneAndUpdate(
  
        {
          _id: req.params.id,
          userId: req.user._id
        },
  
        {
          isRead: true
        },
  
        {
          new: true
        }
  
      );
  
      if (!notification) {
        return res.status(404).json({
          status: 0,
          message: "Notification not found"
        });
      }
  
      res.json({
        status: 1,
        message: "Notification marked as read",
        data: notification
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
        status: 0,
        message: err.message
      });
  
    }
  
  };

exports.markAllRead = async (req, res) => {

    try {
  
      await Notification.updateMany(
  
        {
          userId: req.user._id,
          isRead: false
        },
  
        {
          isRead: true
        }
  
      );
  
      res.json({
  
        status: 1,
  
        message: "All notifications marked as read"
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

exports.clearNotifications = async (req, res) => {

    try {
  
      await Notification.deleteMany({
  
        userId: req.user._id
  
      });
  
      res.json({
  
        status: 1,
  
        message: "Notifications cleared"
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

exports.getSettings = async (req, res) => {

    try {
  
      let settings = await NotificationSetting.findOne({
  
        userId: req.user._id
  
      });
  
      if (!settings) {
  
        settings = await NotificationSetting.create({
  
          userId: req.user._id
  
        });
  
      }
  
      res.json({
  
        status: 1,
  
        data: settings
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

exports.updateSettings = async (req, res) => {

    try {
  
      const settings = await NotificationSetting.findOneAndUpdate(
  
        {
  
          userId: req.user._id
  
        },
  
        req.body,
  
        {
  
          new: true,
  
          upsert: true
  
        }
  
      );
  
      res.json({
  
        status: 1,
  
        message: "Notification settings updated",
  
        data: settings
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };