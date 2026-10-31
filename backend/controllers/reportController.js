const Report = require("../models/Report");
const ScheduledReport = require("../models/ScheduledReport");

exports.getDashboard = async (req, res) => {

    try {
  
      const userId = req.user.id;
  
      const totalReports = await Report.countDocuments({
        userId,
        isDeleted: false
      });
  
      const myReports = await Report.countDocuments({
        userId,
        isDeleted: false
      });
  
      const sharedReports = await Report.countDocuments({
        sharedWith: userId,
        isDeleted: false
      });
  
      const frequentlyUsed = await Report.countDocuments({
        userId,
        totalViews: { $gte: 5 },
        isDeleted: false
      });
  
      const scheduledReports =
        await ScheduledReport.countDocuments({
          userId,
          isActive: true
        });
  
      res.json({
        status: 1,
        data: {
          totalReports,
          myReports,
          sharedReports,
          frequentlyUsed,
          scheduledReports
        }
      });
  
    } catch (err) {
  
      res.status(500).json({
        status: 0,
        message: err.message
      });
  
    }
  
  };

  exports.createReport = async (req, res) => {

    try {
  
      const report = await Report.create({
  
        ...req.body,
  
        userId: req.user.id
  
      });
  
      res.json({
  
        status: 1,
  
        message: "Report created successfully",
  
        data: report
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.getReports = async (req, res) => {

    try {
  
      const {
  
        search = "",
  
        category,
  
        dataSource,
  
        page = 1,
  
        limit = 10
  
      } = req.query;
  
      let query = {
  
        userId: req.user.id,
  
        isDeleted: false
  
      };
  
      if (category)
  
        query.category = category;
  
      if (dataSource)
  
        query.dataSource = dataSource;
  
      if (search) {
  
        query.reportName = {
  
          $regex: search,
  
          $options: "i"
  
        };
  
      }
  
      const reports = await Report.find(query)
  
        .sort({
  
          updatedAt: -1
  
        })
  
        .skip((page - 1) * limit)
  
        .limit(Number(limit));
  
      const total = await Report.countDocuments(query);
  
      res.json({
  
        status: 1,
  
        data: reports,
  
        pagination: {
  
          total,
  
          page: Number(page),
  
          pages: Math.ceil(total / limit)
  
        }
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.getReport = async (req, res) => {

    try {
  
      const report = await Report.findById(req.params.id);
  
      if (!report) {
  
        return res.status(404).json({
  
          status: 0,
  
          message: "Report not found"
  
        });
  
      }
  
      report.totalViews += 1;
  
      report.lastViewed = new Date();
  
      await report.save();
  
      res.json({
  
        status: 1,
  
        data: report
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.deleteReport = async (req, res) => {

    try {
  
      await Report.findByIdAndUpdate(
  
        req.params.id,
  
        {
  
          isDeleted: true
  
        }
  
      );
  
      res.json({
  
        status: 1,
  
        message: "Report deleted"
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.toggleFavourite = async (req, res) => {

    try {
  
      const report = await Report.findById(req.params.id);
  
      report.isFavourite = !report.isFavourite;
  
      await report.save();
  
      res.json({
  
        status: 1,
  
        data: report
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.shareReport = async (req, res) => {

    try {
  
      const {
  
        reportId,
  
        userIds
  
      } = req.body;
  
      const report = await Report.findById(reportId);
  
      report.sharedWith = userIds;
  
      report.isShared = true;
  
      await report.save();
  
      res.json({
  
        status: 1,
  
        message: "Report shared successfully"
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.getCategories = async (req, res) => {

    try {
  
      const result = await Report.aggregate([
  
        {
  
          $match: {
  
            userId: req.user._id,
  
            isDeleted: false
  
          }
  
        },
  
        {
  
          $group: {
  
            _id: "$category",
  
            total: {
  
              $sum: 1
  
            }
  
          }
  
        }
  
      ]);
  
      res.json({
  
        status: 1,
  
        data: result
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.getQuickAccess = async (req, res) => {

    try {
  
      const favourites = await Report.countDocuments({
  
        userId: req.user.id,
  
        isFavourite: true,
  
        isDeleted: false
  
      });
  
      const recent = await Report.find({
  
        userId: req.user.id,
  
        isDeleted: false
  
      })
  
        .sort({
  
          lastViewed: -1
  
        })
  
        .limit(5);
  
      const trash = await Report.countDocuments({
  
        userId: req.user.id,
  
        isDeleted: true
  
      });
  
      const scheduled = await ScheduledReport.countDocuments({
  
        userId: req.user.id,
  
        isActive: true
  
      });
  
      res.json({
  
        status: 1,
  
        data: {
  
          favourites,
  
          recent,
  
          trash,
  
          scheduled
  
        }
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.getStorage = async (req, res) => {

    try {
  
      const reports = await Report.find({
  
        userId: req.user.id,
  
        isDeleted: false
  
      });
  
      let used = 0;
  
      reports.forEach(r => {
  
        used += Buffer.byteLength(
  
          JSON.stringify(r.reportData || {}),
  
          "utf8"
  
        );
  
      });
  
      const usedMB = used / (1024 * 1024);
  
      const totalMB = 10240;
  
      res.json({
  
        status: 1,
  
        data: {
  
          used: usedMB.toFixed(2),
  
          total: totalMB,
  
          percentage: ((usedMB / totalMB) * 100).toFixed(2)
  
        }
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };


  exports.getScheduledReports = async (req, res) => {

    try {
  
      const reports = await ScheduledReport.find({
  
        userId: req.user.id
  
      })
  
        .populate("reportId");
  
      res.json({
  
        status: 1,
  
        data: reports
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  const PDFDocument = require("pdfkit");

exports.downloadReport = async (req, res) => {
  try {

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        status: 0,
        message: "Report not found"
      });
    }

    report.totalDownloads += 1;
    await report.save();

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${report.reportName}.pdf`
    );

    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(20).text(report.reportName);

    doc.moveDown();

    doc.fontSize(12).text(`Category : ${report.category}`);

    doc.text(`Source : ${report.dataSource}`);

    doc.text(`Created : ${report.createdAt}`);

    doc.moveDown();

    doc.text(
      JSON.stringify(report.reportData, null, 2)
    );

    doc.end();

  } catch (err) {

    res.status(500).json({
      status: 0,
      message: err.message
    });

  }
};

exports.importReport = async (req, res) => {

    try {
  
      const report = await Report.create({
  
        userId: req.user.id,
  
        reportName: req.body.reportName,
  
        description: req.body.description,
  
        category: req.body.category,
  
        dataSource: req.body.dataSource,
  
        module: req.body.module,
  
        reportData: req.body.reportData
  
      });
  
      res.json({
  
        status: 1,
  
        message: "Report imported successfully",
  
        data: report
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.runReport = async (req, res) => {

    try {
  
      const report = await Report.findById(req.params.id);
  
      if (!report) {
  
        return res.status(404).json({
  
          status: 0,
  
          message: "Report not found"
  
        });
  
      }
  
      report.lastViewed = new Date();
  
      report.totalViews += 1;
  
      await report.save();
  
      res.json({
  
        status: 1,
  
        message: "Report executed",
  
        data: report.reportData
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.createScheduledReport = async (req, res) => {

    try {
  
      const schedule = await ScheduledReport.create({
  
        reportId: req.body.reportId,
  
        userId: req.user.id,
  
        frequency: req.body.frequency,
  
        email: req.body.email,
  
        nextRun: req.body.nextRun
  
      });
  
      res.json({
  
        status: 1,
  
        message: "Scheduled Report Created",
  
        data: schedule
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.toggleScheduledReport = async (req, res) => {

    try {
  
      const schedule =
        await ScheduledReport.findById(req.params.id);
  
      schedule.isActive = !schedule.isActive;
  
      await schedule.save();
  
      res.json({
  
        status: 1,
  
        data: schedule
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.deleteScheduledReport = async (req, res) => {

    try {
  
      await ScheduledReport.findByIdAndDelete(
        req.params.id
      );
  
      res.json({
  
        status: 1,
  
        message: "Schedule deleted"
  
      });
  
    }
  
    catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };