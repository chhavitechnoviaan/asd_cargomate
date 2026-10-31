const Setting = require("../models/Setting");
const User = require("../models/user");
const Activity = require("../models/Activity");

exports.getSettings = async (req, res) => {
    try {
  
      const settings = await Setting.findOne({
        userId: req.user._id
      });
  
      res.json({
        status: 1,
        data: settings
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.updateGeneral = async (req, res) => {
    try {
  
      const settings = await Setting.findOneAndUpdate(
  
        {
          userId: req.user._id
        },
  
        {
          language: req.body.language,
          timezone: req.body.timezone,
          currency: req.body.currency,
          theme: req.body.theme,
          dashboardLayout: req.body.dashboardLayout,
          units: req.body.units
        },
  
        {
          new: true,
          upsert: true
        }
  
      );
  
      res.json({
        status: 1,
        message: "General settings updated",
        data: settings
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.updatePreferences = async (req, res) => {
    try {
  
      const settings = await Setting.findOneAndUpdate(
  
        {
          userId: req.user._id
        },
  
        {
          defaultCountry: req.body.defaultCountry,
          defaultPage: req.body.defaultPage,
          itemsPerPage: req.body.itemsPerPage
        },
  
        {
          new: true
        }
  
      );
  
      res.json({
        status: 1,
        data: settings
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.updateNotifications = async (req, res) => {
    try {
  
      const settings = await Setting.findOneAndUpdate(
  
        {
          userId: req.user._id
        },
  
        {
          emailNotification: req.body.emailNotification,
          pushNotification: req.body.pushNotification,
          smsNotification: req.body.smsNotification
        },
  
        {
          new: true
        }
  
      );
  
      res.json({
        status: 1,
        data: settings
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.updateSecurity = async (req, res) => {
    try {
  
      const settings = await Setting.findOneAndUpdate(
  
        {
          userId: req.user._id
        },
  
        {
          twoFactorAuth: req.body.twoFactorAuth,
          sessionTimeout: req.body.sessionTimeout
        },
  
        {
          new: true
        }
  
      );
  
      res.json({
        status: 1,
        data: settings
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.updateBilling = async (req, res) => {
  try {

    const settings = await Setting.findOneAndUpdate(
      {
        userId: req.user._id
      },
      {
        billingEmail: req.body.billingEmail,
        billingCompanyName: req.body.billingCompanyName,
        billingGstNumber: req.body.billingGstNumber
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json({
      status: 1,
      message: "Billing updated successfully",
      data: settings
    });

  } catch (error) {

    res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};
  exports.updateTheme = async(req,res)=>{

    try{
    
    const settings=await Setting.findOneAndUpdate(
    
    {
    userId:req.user._id
    },
    
    {
    theme:req.body.theme
    },
    
    {
    new:true
    }
    
    );
    
    res.json({
    
    status:1,
    
    message:"Theme updated successfully",
    
    data:settings
    
    });
    
    }catch(error){
    
    res.status(500).json({
    
    status:0,
    
    message:error.message
    
    });
    
    }
    
    };

   const bcrypt = require("bcryptjs");

exports.changePassword = async (req, res) => {
  try {

    const {
      oldPassword,
      newPassword
    } = req.body;

    const user = await User.findById(req.user._id)
      .select("+password");

    const match = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        status: 0,
        message: "Old password is incorrect"
      });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    user.password = hash;

    await user.save();

    res.json({
      status: 1,
      message: "Password changed successfully"
    });

  } catch (error) {

    res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};

exports.getActivity=async(req,res)=>{

    try{
    
    const activity=await Activity.find({
    
    userId:req.user._id
    
    })
    
    .sort({
    
    createdAt:-1
    
    })
    
    .limit(10);
    
    res.json({
    
    status:1,
    
    data:activity
    
    });
    
    }catch(error){
    
    res.status(500).json({
    
    status:0,
    
    message:error.message
    
    });
    
    }
    
    };

   exports.getAccountSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select(
        "name email phone companyName gstNumber importExportId businessType " +
        "country city address accountType plan accountStatus profileCompletion " +
        "emailVerified phoneVerified gstVerified twoFactorEnabled profileImage " +
        "designation createdAt lastLogin planExpiry " +
        "kycStatus kycVerifiedAt kycRejectedAt " +
        "kycRejectionReasons kycRejectionNote kycDocuments"
      )
      .populate("roleId", "name")
      .populate("planId");

    const settings = await Setting.findOne({
      userId: req.user._id
    });

    res.json({
      status: 1,
      data: {
        user,
        theme: settings?.theme,
        language: settings?.language,
        currency: settings?.currency,
        timezone: settings?.timezone
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};
exports.uploadKYCDocuments = async (req, res) => {
  try {
    const documents = req.files || [];

    if (!documents.length) {
      return res.status(400).json({
        status: 0,
        message: "Please upload at least one document",
      });
    }

    const documentTypes = Array.isArray(req.body.documentTypes)
      ? req.body.documentTypes
      : req.body.documentTypes
      ? [req.body.documentTypes]
      : [];

    const documentTitles = Array.isArray(req.body.documentTitles)
      ? req.body.documentTitles
      : req.body.documentTitles
      ? [req.body.documentTitles]
      : [];

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    documents.forEach((file, index) => {
      const documentType =
        documentTypes[index] || "KYC Document";

      const documentTitle =
        documentTitles[index] || file.originalname;

      const newDocument = {
        type: documentType,
        title: documentTitle,
        url: `https://${req.get("host")}/uploads/documents/${file.filename}`,
        uploadedAt: new Date(),
      };

      const existingDocumentIndex = (
        user.kycDocuments || []
      ).findIndex(
        (document) => document.type === documentType
      );

      if (existingDocumentIndex !== -1) {
        user.kycDocuments[existingDocumentIndex] =
          newDocument;
      } else {
        user.kycDocuments.push(newDocument);
      }
    });

   
    await user.save();

    res.json({
      status: 1,
      message: "KYC documents uploaded successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};
exports.submitKYC = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    const REQUIRED_KYC_DOCUMENTS = [
      "GST Certificate",
      "IEC Certificate",
      "PAN Card",
      "Company Registration",
      "Address Proof",
    ];

    const uploadedTypes = (user.kycDocuments || []).map(
      (document) => document.type
    );

    const missingDocuments = REQUIRED_KYC_DOCUMENTS.filter(
      (requiredType) => !uploadedTypes.includes(requiredType)
    );

    if (missingDocuments.length > 0) {
      return res.status(400).json({
        status: 0,
        message: "Please upload all required KYC documents before submitting.",
        missingDocuments,
      });
    }

    if (user.kycStatus === "Verified") {
      return res.status(400).json({
        status: 0,
        message: "Your KYC is already verified.",
      });
    }

    user.kycStatus = "Submitted";

    user.kycVerifiedAt = null;
    user.kycRejectedAt = null;
    user.kycRejectionReasons = [];
    user.kycRejectionNote = "";

    await user.save();

    res.json({
      status: 1,
      message: "KYC submitted successfully. Your documents are now under review.",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};