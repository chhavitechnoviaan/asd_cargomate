const Ad = require("../models/Ad");
const AdAnalytics = require("../models/AdAnalytics");

const normalizeUrl = (value) => String(value || "").trim();

exports.createAd = async (req, res) => {
  try {
    const { postText = "", subPostText = "", targetStartDate, linkUrl = "", location = "" } = req.body;
    if (!location.trim()) {
      return res.status(400).json({ status: 0, message: "Ad location is required." });
    }
    if (!req.file) {
      return res.status(400).json({ status: 0, message: "Please upload an ad image." });
    }
    if (!String(postText).trim()) {
      return res.status(400).json({ status: 0, message: "Post Text is required." });
    }

    const safeLink = normalizeUrl(linkUrl);
    if (safeLink) {
      try {
        const parsed = new URL(safeLink);
        if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Invalid protocol");
      } catch {
        return res.status(400).json({ status: 0, message: "Link URL must be a valid http:// or https:// URL." });
      }
    }

    const startDate = targetStartDate ? new Date(targetStartDate) : null;
    if (targetStartDate && Number.isNaN(startDate.getTime())) {
      return res.status(400).json({ status: 0, message: "Target Start Date is invalid." });
    }

    const image = req.file.cloudinaryUrl || req.file.path;
    const text = String(postText).trim();
    const ad = await Ad.create({
      title: text.slice(0, 100) || "Dashboard Ad",
      type: "banner",
      placement: "dashboard",
      image,
      redirectUrl: safeLink,
      linkUrl: safeLink,
      clickBehavior: "new_tab",
      location: String(location).trim(),
      postText: text,
      subPostText: String(subPostText || "").trim(),
      targetStartDate: startDate,
      startDate: startDate || new Date(),
      status: "active",
      priority: 1
    });

    return res.status(201).json({ status: 1, message: "Ad created successfully.", data: ad });
  } catch (err) {
    console.error("createAd error:", err);
    return res.status(500).json({ status: 0, message: "Unable to create ad." });
  }
};

exports.getAds = async (req, res) => {
  try {
    const { search = "", status, placement, location, startDate, endDate, page = 1, limit = 50 } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { postText: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }
    if (status) query.status = status;
    if (placement) query.placement = placement;
    if (location) query.location = location;
    if (startDate && endDate) {
      query.$and = [
        { startDate: { $lte: new Date(endDate) } },
        { $or: [{ endDate: { $gte: new Date(startDate) } }, { endDate: null }] }
      ];
    }

    const safePage = Math.max(1, Number.parseInt(page, 10) || 1);
    const safeLimit = Math.min(100, Math.max(1, Number.parseInt(limit, 10) || 50));
    const [data, total] = await Promise.all([
      Ad.find(query).sort({ priority: 1, createdAt: -1 }).skip((safePage - 1) * safeLimit).limit(safeLimit).lean(),
      Ad.countDocuments(query)
    ]);
    return res.json({ status: 1, data, total, page: safePage, limit: safeLimit });
  } catch (err) {
    console.error("getAds error:", err);
    return res.status(500).json({ status: 0, message: "Unable to load ads." });
  }
};

// Public dashboard placement endpoint. Only active campaigns whose target date has arrived are returned.
exports.getAdsByLocation = async (req, res) => {
  try {
    const location = String(req.query.location || "").trim();
    if (!location) return res.status(400).json({ status: 0, message: "location query parameter is required." });

    const now = new Date();
    const data = await Ad.find({
      location,
      status: "active",
      $and: [
        { $or: [{ targetStartDate: null }, { targetStartDate: { $exists: false } }, { targetStartDate: { $lte: now } }] },
        { $or: [{ startDate: null }, { startDate: { $exists: false } }, { startDate: { $lte: now } }] },
        { $or: [{ endDate: null }, { endDate: { $exists: false } }, { endDate: { $gte: now } }] }
      ]
    }).sort({ priority: 1, createdAt: -1 }).lean();

    return res.json({ status: 1, data });
  } catch (err) {
    console.error("getAdsByLocation error:", err);
    return res.status(500).json({ status: 0, message: "Unable to load ads for this location." });
  }
};

exports.updateAd = async (req, res) => {
  try {
    const updated = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ status: 0, message: "Ad not found." });
    return res.json({ status: 1, data: updated });
  } catch (err) {
    return res.status(500).json({ status: 0, message: "Unable to update ad." });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const deleted = await Ad.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ status: 0, message: "Ad not found." });
    return res.json({ status: 1, message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ status: 0, message: "Unable to delete ad." });
  }
};

exports.duplicateAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ status: 0, message: "Ad not found." });
    const obj = ad.toObject();
    delete obj._id;
    obj.title = `${ad.title} Copy`;
    const newAd = await Ad.create(obj);
    return res.json({ status: 1, data: newAd });
  } catch (err) {
    return res.status(500).json({ status: 0, message: "Unable to duplicate ad." });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["active", "paused", "inactive", "draft"].includes(status)) {
      return res.status(400).json({ status: 0, message: "Invalid ad status." });
    }
    const ad = await Ad.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!ad) return res.status(404).json({ status: 0, message: "Ad not found." });
    return res.json({ status: 1, data: ad });
  } catch (err) {
    return res.status(500).json({ status: 0, message: "Unable to change ad status." });
  }
};

exports.updatePriority = async (req, res) => {
  try {
    const list = Array.isArray(req.body.list) ? req.body.list : [];
    const bulkOps = list.filter(item => item.id).map(item => ({
      updateOne: { filter: { _id: item.id }, update: { priority: Number(item.priority) || 1 } }
    }));
    if (bulkOps.length) await Ad.bulkWrite(bulkOps);
    return res.json({ status: 1, message: "Updated" });
  } catch (err) {
    return res.status(500).json({ status: 0, message: "Unable to update priority." });
  }
};

exports.getAdPreview = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ status: 0, message: "Ad not found." });
    return res.json({ status: 1, data: ad });
  } catch (err) {
    return res.status(500).json({ status: 0, message: "Unable to load ad preview." });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalAds = await Ad.countDocuments();
    const [impressions, clicks] = await Promise.all([
      AdAnalytics.aggregate([{ $group: { _id: null, total: { $sum: "$impressions" } } }]),
      AdAnalytics.aggregate([{ $group: { _id: null, total: { $sum: "$clicks" } } }])
    ]);
    const totalImpressions = impressions[0]?.total || 0;
    const totalClicks = clicks[0]?.total || 0;
    const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    return res.json({ status: 1, data: { totalAds, impressions: totalImpressions, clicks: totalClicks, ctr: ctr.toFixed(2) } });
  } catch (err) {
    return res.status(500).json({ status: 0, message: "Unable to load ad statistics." });
  }
};

exports.getPerformance = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const data = await AdAnalytics.aggregate([
      { $match: { date: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
      { $group: { _id: "$date", impressions: { $sum: "$impressions" }, clicks: { $sum: "$clicks" } } },
      { $sort: { _id: 1 } }
    ]);
    return res.json({ status: 1, data });
  } catch (err) {
    return res.status(500).json({ status: 0, message: "Unable to load ad performance." });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const data = await AdAnalytics.find({ date: { $gte: new Date(startDate), $lte: new Date(endDate) } });
    return res.json({ status: 1, data });
  } catch (err) {
    return res.status(500).json({ status: 0, message: "Unable to load ad analytics." });
  }
};
