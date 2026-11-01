const mongoose = require("mongoose");
const Notice = require("../models/Notice");

// Seed default notice if database is empty
async function seedDefaultNoticeIfEmpty() {
  try {
    if (mongoose.connection.readyState !== 1) return;
    const count = await Notice.countDocuments();
    if (count === 0) {
      await Notice.create({
        title: "Important Shipping Notice",
        subtitle: "Shipping Guidelines",
        description: "Please review the latest shipping guidelines before booking your next shipment.",
        details: "Ensure all consignee details, hazardous goods declarations, and export shipping documents comply with current maritime customs clearance standards.",
        status: "published",
        isActive: true,
        targetAudience: "all"
      });
      console.log("Default Notice seeded successfully");
    }
  } catch (err) {
    console.error("Notice seeder error:", err.message);
  }
}

// Run seeder once
seedDefaultNoticeIfEmpty();

// GET /api/notices
exports.getNotices = async (req, res) => {
  try {
    await seedDefaultNoticeIfEmpty();
    const role = String(req.user?.roleName || req.user?.roleId?.name || "").toLowerCase();

    let query = {};
    if (role !== "admin") {
      query = {
        status: "published",
        isActive: true
      };
      if (role === "b2b" || role === "dealer" || role === "vendor") {
        query.targetAudience = { $in: ["all", "dealer", "b2b"] };
      } else {
        query.targetAudience = { $in: ["all", "user", "customer"] };
      }
    }

    const notices = await Notice.find(query)
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email");

    return res.json({
      status: 1,
      total: notices.length,
      data: notices
    });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

// GET /api/notices/active
exports.getActiveNotice = async (req, res) => {
  try {
    await seedDefaultNoticeIfEmpty();
    const role = String(req.user?.roleName || req.user?.roleId?.name || "").toLowerCase();

    let query = {
      status: "published",
      isActive: true
    };

    if (role === "b2b" || role === "dealer" || role === "vendor") {
      query.targetAudience = { $in: ["all", "dealer", "b2b"] };
    } else if (role !== "admin") {
      query.targetAudience = { $in: ["all", "user", "customer"] };
    }

    const notice = await Notice.findOne(query).sort({ createdAt: -1 });

    return res.json({
      status: 1,
      data: notice || null
    });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

// GET /api/notices/:id
exports.getNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ status: 0, message: "Notice not found" });
    }
    return res.json({ status: 1, data: notice });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

// POST /api/notices (Admin only)
exports.createNotice = async (req, res) => {
  try {
    const { title, subtitle, description, details, scheduleDate, status, targetAudience } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ status: 0, message: "Notice title is required" });
    }

    let image = req.body.image || "";
    if (req.file) {
      image = `/uploads/documents/${req.file.filename}`;
    }

    const notice = await Notice.create({
      title: title.trim(),
      subtitle: (subtitle || "Shipping Guidelines").trim(),
      description: (description || "").trim(),
      details: (details || "").trim(),
      scheduleDate: scheduleDate ? new Date(scheduleDate) : new Date(),
      status: status || "published",
      targetAudience: targetAudience || "all",
      isActive: true,
      image,
      createdBy: req.user?._id || req.user?.id
    });

    return res.json({
      status: 1,
      message: "Notice created successfully",
      data: notice
    });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

// PUT /api/notices/:id (Admin only)
exports.updateNotice = async (req, res) => {
  try {
    const { title, subtitle, description, details, scheduleDate, status, targetAudience, isActive } = req.body;

    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ status: 0, message: "Notice not found" });
    }

    if (title !== undefined) notice.title = title.trim();
    if (subtitle !== undefined) notice.subtitle = subtitle.trim();
    if (description !== undefined) notice.description = description.trim();
    if (details !== undefined) notice.details = details.trim();
    if (scheduleDate !== undefined) notice.scheduleDate = new Date(scheduleDate);
    if (status !== undefined) notice.status = status;
    if (targetAudience !== undefined) notice.targetAudience = targetAudience;
    if (isActive !== undefined) notice.isActive = Boolean(isActive);

    if (req.file) {
      notice.image = `/uploads/documents/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      notice.image = req.body.image;
    }

    await notice.save();

    return res.json({
      status: 1,
      message: "Notice updated successfully",
      data: notice
    });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

// DELETE /api/notices/:id (Admin only)
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      return res.status(404).json({ status: 0, message: "Notice not found" });
    }
    return res.json({
      status: 1,
      message: "Notice deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

// PATCH /api/notices/:id/toggle (Admin only)
exports.toggleNoticeStatus = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ status: 0, message: "Notice not found" });
    }

    notice.isActive = !notice.isActive;
    notice.status = notice.isActive ? "published" : "draft";
    await notice.save();

    return res.json({
      status: 1,
      message: `Notice ${notice.isActive ? 'published' : 'unpublished'} successfully`,
      data: notice
    });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};
