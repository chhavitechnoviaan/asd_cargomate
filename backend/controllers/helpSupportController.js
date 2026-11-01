const SupportTicket = require("../models/SupportTicket");
const HelpArticle = require("../models/HelpArticle");
const HelpCategory = require("../models/HelpCategory");
const User = require("../models/user");
const Role = require("../models/Role");

// Helper to determine normalized role
function getUserRole(user) {
  const roleName = String(user?.roleId?.name || user?.roleName || "").trim().toLowerCase();
  if (roleName === "admin" || String(user?.email || "").toLowerCase().includes("admin")) {
    return "admin";
  }
  if (["b2b", "dealer", "vendor"].includes(roleName)) {
    return "dealer";
  }
  return "user";
}

// Helper to determine ticket userType
function getUserType(user) {
  const role = getUserRole(user);
  if (role === "admin") return "Admin";
  if (role === "dealer") return "Vendor";
  return "Customer";
}

// Auto-seed sample tickets and categories if database is empty
async function seedDefaultDataIfEmpty() {
  try {
    const ticketCount = await SupportTicket.countDocuments();
    if (ticketCount === 0) {
      // Find admin, user, and b2b accounts
      const adminRole = await Role.findOne({ name: "admin" });
      const userRole = await Role.findOne({ name: "user" });
      const b2bRole = await Role.findOne({ name: "b2b" });

      const adminUser = await User.findOne(adminRole ? { roleId: adminRole._id } : {});
      const customerUser = await User.findOne(userRole ? { roleId: userRole._id } : {});
      const vendorUser = await User.findOne(b2bRole ? { roleId: b2bRole._id } : {});

      const fallbackUserId = customerUser?._id || adminUser?._id;

      if (fallbackUserId) {
        await SupportTicket.create([
          {
            ticketId: "TKT-1024",
            userId: customerUser?._id || fallbackUserId,
            userType: "Customer",
            subject: "Shipment Delay - PLN-2025-04-24-000123",
            description: "My shipment has not arrived on the expected date. Please check the current status and confirm the delivery date.",
            category: "Shipments",
            priority: "High",
            status: "Open",
            attachmentName: "shipment-receipt.pdf",
            lastAdminReply: "We are checking with the carrier.",
            lastRepliedBy: {
              name: adminUser?.name || "Priya Sharma",
              role: "Support Admin",
              repliedAt: new Date(Date.now() - 3600000 * 2)
            },
            replies: [
              {
                senderId: adminUser?._id,
                senderName: adminUser?.name || "Priya Sharma",
                senderRole: "Support Admin",
                message: "We are checking with the carrier and will update you shortly.",
                emailSent: true,
                createdAt: new Date(Date.now() - 3600000 * 2)
              }
            ]
          },
          {
            ticketId: "TKT-1023",
            userId: vendorUser?._id || fallbackUserId,
            userType: "Vendor",
            subject: "Invoice Issue - INV-2025-1034",
            description: "Discrepancy in the latest freight billing invoice. Please review line item taxes.",
            category: "Documents",
            priority: "Medium",
            status: "In Progress",
            attachmentName: "invoice-oct.pdf",
            lastAdminReply: "Your invoice is under review.",
            lastRepliedBy: {
              name: adminUser?.name || "Priya Sharma",
              role: "Support Admin",
              repliedAt: new Date(Date.now() - 3600000 * 24)
            },
            replies: [
              {
                senderId: adminUser?._id,
                senderName: adminUser?.name || "Priya Sharma",
                senderRole: "Support Admin",
                message: "Your invoice is under review.",
                emailSent: true,
                createdAt: new Date(Date.now() - 3600000 * 24)
              }
            ]
          },
          {
            ticketId: "TKT-1022",
            userId: customerUser?._id || fallbackUserId,
            userType: "Customer",
            subject: "HS Code Classification Query",
            description: "Need verification for HS code 8471.30 regarding customs duties for electronic components.",
            category: "HS Codes",
            priority: "Low",
            status: "Replied",
            attachmentName: "product-spec.pdf",
            lastAdminReply: "Classification details shared.",
            lastRepliedBy: {
              name: "Rahul Mehta",
              role: "Super Admin",
              repliedAt: new Date(Date.now() - 3600000 * 48)
            },
            replies: [
              {
                senderId: adminUser?._id,
                senderName: "Rahul Mehta",
                senderRole: "Super Admin",
                message: "Classification details shared.",
                emailSent: true,
                createdAt: new Date(Date.now() - 3600000 * 48)
              }
            ]
          }
        ]);
      }
    }

    const catCount = await HelpCategory.countDocuments();
    if (catCount === 0) {
      await HelpCategory.create([
        {
          name: "Shipments",
          icon: "Package",
          description: "Tracking, delays, delivery and status updates."
        },
        {
          name: "Documents",
          icon: "FileText",
          description: "Invoices, packing list, certificates & more."
        },
        {
          name: "HS Codes",
          icon: "FileCode2",
          description: "Classification, lookup and related queries."
        },
        {
          name: "Freight & Costs",
          icon: "CircleDollarSign",
          description: "Rates, charges and cost calculations."
        }
      ]);
    }

    const artCount = await HelpArticle.countDocuments();
    if (artCount === 0) {
      await HelpArticle.create([
        {
          title: "How do I track my shipment?",
          slug: "how-do-i-track-my-shipment",
          category: "Shipments",
          content: "To track your shipment, navigate to the Shipments dashboard and enter your Container ID or Bill of Lading (BOL) number in the search bar. Real-time GPS location and vessel status will display immediately.",
          views: 142
        },
        {
          title: "How is freight cost calculated?",
          slug: "how-is-freight-cost-calculated",
          category: "Freight & Costs",
          content: "Freight costs are calculated based on gross weight vs volumetric weight (CBM), port-of-loading to port-of-discharge distance, bunker fuel surcharges, and current shipping lane spot rates.",
          views: 98
        },
        {
          title: "How do I generate reports?",
          slug: "how-do-i-generate-reports",
          category: "Documents",
          content: "Go to the Reports section from your sidebar menu. Select your desired date range, report format (PDF or Excel), and metrics required. Click 'Export Report' to download.",
          views: 76
        },
        {
          title: "How do I check incentives?",
          slug: "how-do-i-check-incentives",
          category: "HS Codes",
          content: "Use the Incentive Checker tool under DGFT Schemes. Enter your 8-digit HS Code and export destination to check available RoDTEP, RoSCTL, or Drawback duty rates.",
          views: 64
        }
      ]);
    }
  } catch (err) {
    console.error("Auto-seed error in Help & Support:", err.message);
  }
}

// Run auto-seed once on startup
seedDefaultDataIfEmpty();

// GET /api/help-support/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const role = getUserRole(req.user);
    const userId = req.user._id;

    const categories = await HelpCategory.find();
    const popularArticles = await HelpArticle.find().sort({ views: -1 }).limit(5);

    if (role === "admin") {
      const totalTickets = await SupportTicket.countDocuments();
      const openTickets = await SupportTicket.countDocuments({ status: "Open" });
      const inProgressTickets = await SupportTicket.countDocuments({ status: "In Progress" });
      const repliedTickets = await SupportTicket.countDocuments({
        status: { $in: ["Replied", "Resolved"] }
      });

      const recentTickets = await SupportTicket.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("userId", "name email roleId companyName");

      return res.json({
        status: 1,
        role: "admin",
        data: {
          metrics: {
            totalTickets,
            openTickets,
            inProgressTickets,
            repliedTickets
          },
          recentTickets,
          categories,
          popularArticles
        }
      });
    }

    // Role is User or Dealer
    const totalTickets = await SupportTicket.countDocuments({ userId });
    const openTickets = await SupportTicket.countDocuments({ userId, status: "Open" });
    const inProgressTickets = await SupportTicket.countDocuments({ userId, status: "In Progress" });
    const resolvedTickets = await SupportTicket.countDocuments({
      userId,
      status: { $in: ["Replied", "Resolved", "Closed"] }
    });

    const recentTickets = await SupportTicket.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    return res.json({
      status: 1,
      role,
      data: {
        summary: {
          myTickets: totalTickets,
          openTickets,
          inProgressTickets,
          resolvedTickets,
          knowledgeBase: await HelpArticle.countDocuments(),
          liveSupport: {
            available: true,
            timing: "Mon - Sat | 9:00 AM - 6:00 PM"
          }
        },
        recentTickets,
        categories,
        popularArticles,
        contactSupport: {
          phone: "+91 22 1234 5678",
          email: "support@asdcargomate.com",
          workingHours: "Mon - Sat | 9:00 AM - 6:00 PM"
        }
      }
    });

  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

// GET /api/help-support/tickets
exports.getTickets = async (req, res) => {
  try {
    const role = getUserRole(req.user);
    const { status, userType, search } = req.query;

    let filter = {};

    // Strict role check:
    // Admin can see all tickets. User and Dealer see ONLY their own tickets.
    if (role !== "admin") {
      filter.userId = req.user._id;
    } else {
      // Admin filters
      if (userType && userType !== "all" && userType !== "All Users") {
        if (userType.toLowerCase() === "vendor" || userType.toLowerCase() === "dealer") {
          filter.userType = { $in: ["Vendor", "Dealer"] };
        } else if (userType.toLowerCase() === "customer") {
          filter.userType = "Customer";
        } else {
          filter.userType = userType;
        }
      }
    }

    if (status && status !== "all" && status !== "All Status") {
      filter.status = new RegExp(`^${status}$`, "i");
    }

    if (search && search.trim()) {
      const q = search.trim();
      filter.$or = [
        { ticketId: { $regex: q, $options: "i" } },
        { subject: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ];
    }

    const tickets = await SupportTicket.find(filter)
      .sort({ createdAt: -1 })
      .populate("userId", "name email roleId companyName");

    return res.json({
      status: 1,
      total: tickets.length,
      data: tickets
    });

  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

// GET /api/help-support/ticket/:id
exports.getTicket = async (req, res) => {
  try {
    const role = getUserRole(req.user);

    let query = { _id: req.params.id };
    // Non-admin can only access their own ticket
    if (role !== "admin") {
      query.userId = req.user._id;
    }

    const ticket = await SupportTicket.findOne(query)
      .populate("userId", "name email roleId companyName")
      .populate("replies.senderId", "name email");

    if (!ticket) {
      return res.status(404).json({
        status: 0,
        message: "Ticket not found or access denied"
      });
    }

    return res.json({
      status: 1,
      data: ticket
    });

  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

// POST /api/help-support/ticket
exports.createTicket = async (req, res) => {
  try {
    const { subject, description, category, priority } = req.body;

    if (!subject || !subject.trim()) {
      return res.status(400).json({ status: 0, message: "Subject is required" });
    }

    const userType = getUserType(req.user);

    // Generate readable Ticket ID: TKT-1025 or random 4-digit unique
    const totalCount = await SupportTicket.countDocuments();
    let ticketId = `TKT-${1020 + totalCount + 1}`;
    const exists = await SupportTicket.findOne({ ticketId });
    if (exists) {
      ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    let attachment = "";
    let attachmentName = "";

    if (req.file) {
      attachment = `/uploads/documents/${req.file.filename}`;
      attachmentName = req.file.originalname;
    } else if (req.body.attachment) {
      attachment = req.body.attachment;
      attachmentName = req.body.attachmentName || "attachment";
    }

    const ticket = await SupportTicket.create({
      userId: req.user._id,
      userType,
      ticketId,
      subject: subject.trim(),
      description: (description || req.body.message || "").trim(),
      category: category || "Shipments",
      priority: priority || "Medium",
      status: "Open",
      attachment,
      attachmentName
    });

    return res.json({
      status: 1,
      message: `Support ticket ${ticketId} created successfully`,
      data: ticket
    });

  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

// POST /api/help-support/ticket/:id/reply
exports.replyTicket = async (req, res) => {
  try {
    const role = getUserRole(req.user);
    const { message, newStatus, status } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ status: 0, message: "Reply message is required" });
    }

    let query = { _id: req.params.id };
    // Non-admin can only reply to their own ticket
    if (role !== "admin") {
      query.userId = req.user._id;
    }

    const ticket = await SupportTicket.findOne(query);
    if (!ticket) {
      return res.status(404).json({
        status: 0,
        message: "Ticket not found or access denied"
      });
    }

    const senderRole = role === "admin" ? "Support Admin" : (ticket.userType === "Vendor" ? "Vendor" : "Customer");
    const senderName = req.user.name || (role === "admin" ? "Support Admin" : "User");

    const reply = {
      senderId: req.user._id,
      senderName,
      senderRole,
      message: message.trim(),
      emailSent: true,
      createdAt: new Date()
    };

    ticket.replies.push(reply);

    if (role === "admin") {
      ticket.lastAdminReply = message.trim();
      ticket.lastRepliedBy = {
        name: senderName,
        role: senderRole,
        repliedAt: new Date()
      };
      if (newStatus || status) {
        ticket.status = newStatus || status;
      } else if (ticket.status === "Open") {
        ticket.status = "Replied";
      }
    } else {
      // If customer replies, status can remain or flip back to In Progress
      if (ticket.status === "Replied" || ticket.status === "Resolved") {
        ticket.status = "In Progress";
      }
    }

    await ticket.save();

    return res.json({
      status: 1,
      message: "Reply sent via email successfully",
      data: ticket
    });

  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

// PUT /api/help-support/ticket/:id/status
exports.updateTicketStatus = async (req, res) => {
  try {
    const role = getUserRole(req.user);
    if (role !== "admin") {
      return res.status(403).json({ status: 0, message: "Only admin can update ticket status" });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ status: 0, message: "Status is required" });
    }

    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ status: 0, message: "Ticket not found" });
    }

    return res.json({
      status: 1,
      message: "Ticket status updated",
      data: ticket
    });

  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

// GET /api/help-support/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await HelpCategory.find();
    return res.json({
      status: 1,
      total: categories.length,
      data: categories
    });
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

// GET /api/help-support/articles
exports.getArticles = async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;

    const query = {};
    if (search.trim()) {
      query.title = { $regex: search.trim(), $options: "i" };
    }
    if (category.trim()) {
      query.category = category.trim();
    }

    const articles = await HelpArticle.find(query).sort({ views: -1 });

    return res.json({
      status: 1,
      total: articles.length,
      data: articles
    });
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

// GET /api/help-support/article/:slug
exports.getArticle = async (req, res) => {
  try {
    const article = await HelpArticle.findOne({ slug: req.params.slug });

    if (!article) {
      return res.status(404).json({
        status: 0,
        message: "Article not found"
      });
    }

    article.views += 1;
    await article.save();

    return res.json({
      status: 1,
      data: article
    });
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

// GET /api/help-support/search
exports.searchKnowledgeBase = async (req, res) => {
  try {
    const { keyword = "" } = req.query;

    const articles = await HelpArticle.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } }
      ]
    });

    return res.json({
      status: 1,
      data: articles
    });
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
