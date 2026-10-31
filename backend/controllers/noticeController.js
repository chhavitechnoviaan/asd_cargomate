
const Notice = require("../models/Notice");

exports.createNotice = async (req, res) => {
  try {
    const { title, description, scheduleDate, image } = req.body;

    const notice = await Notice.create({
      title,
      description,
      image,
      scheduleDate,
      createdBy: req.user.id
    });

    res.json({
      msg: "Notice created",
      notice
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNotices = async (req, res) => {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  };