const AdminSettings = require("../models/AdminSettings");
const asyncHandler = require("express-async-handler");

/**
 * Create Singleton Settings if not exists
 */
const getOrCreateSettings = async () => {
  let settings = await AdminSettings.findOne({
    singleton: "ADMIN_SETTINGS",
  });

  if (!settings) {
    settings = await AdminSettings.create({
      singleton: "ADMIN_SETTINGS",
    });
  }

  return settings;
};

/**
 * Common Success Response
 */
const sendResponse = (res, message, data = {}) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

const initializeSettings = (settings) => {

    if (!settings.general)
        settings.general = {};

    if (!settings.socialLogin)
        settings.socialLogin = {};

    if (!settings.ai)
        settings.ai = {};

    if (!settings.emailSms)
        settings.emailSms = {};

    if (!settings.subscription)
        settings.subscription = {};

    if (!settings.paymentGateway)
        settings.paymentGateway = {};

    if (!settings.documents)
        settings.documents = {};

    if (!settings.features)
        settings.features = {};

    if (!settings.security)
        settings.security = {};

    if (!settings.miscellaneous)
        settings.miscellaneous = {};

    if (!settings.noticeBoard)
        settings.noticeBoard = {};

    if (!settings.whatsapp)
        settings.whatsapp = {};

    return settings;
};

/**
 * GET
 * /api/admin-settings
 */

exports.getSettings = asyncHandler(async (req, res) => {

    let settings = await getOrCreateSettings();

    settings = initializeSettings(settings);

  return sendResponse(
    res,
    "Admin settings fetched successfully",
    settings
  );

});

/**
 * PUT
 * /api/admin-settings/general
 */

exports.updateGeneralSettings = asyncHandler(async (req, res) => {

  const {
    companyName,
    websiteTitle,
    description,
    socialUrl,
    maintenanceMode,
  } = req.body;

  let settings = await getOrCreateSettings();

settings = initializeSettings(settings);

  if (companyName !== undefined)
    settings.general.companyName = companyName;

  if (websiteTitle !== undefined)
    settings.general.websiteTitle = websiteTitle;

  if (description !== undefined)
    settings.general.description = description;

  if (socialUrl !== undefined)
    settings.general.socialUrl = socialUrl;

  if (maintenanceMode !== undefined)
    settings.general.maintenanceMode = maintenanceMode;

  await settings.save();

  return sendResponse(
    res,
    "General settings updated successfully",
    settings.general
  );

});

/**
 * PUT /api/admin-settings/social
 */

exports.updateSocialLogin = asyncHandler(async (req, res) => {

    const { facebook, google } = req.body;

    const settings = await AdminSettings.getSingleton();
    if (!settings.socialLogin) settings.socialLogin = {};
    if (!settings.socialLogin.facebook) settings.socialLogin.facebook = {};
    if (!settings.socialLogin.google) settings.socialLogin.google = {};

    if (facebook) {
        Object.assign(settings.socialLogin.facebook, facebook);
    }

    if (google) {
        Object.assign(settings.socialLogin.google, google);
    }

    await settings.save();

    return sendResponse(
        res,
        "Social login settings updated successfully",
        settings.socialLogin
    );

});

/**
 * PUT /api/admin-settings/ai
 */

exports.updateAISettings = asyncHandler(async (req, res) => {

    const {
        enabled,
        provider,
        model,
        apiKey,
        customInstructions,
        forceInstructions
    } = req.body;

    let settings = await getOrCreateSettings();

    settings = initializeSettings(settings);

    if (enabled !== undefined)
        settings.ai.enabled = enabled;

    if (provider)
        settings.ai.provider = provider;

    if (model)
        settings.ai.model = model;

    if (apiKey)
        settings.ai.apiKey = apiKey;

    if (customInstructions !== undefined)
        settings.ai.customInstructions = customInstructions;

    if (forceInstructions !== undefined)
        settings.ai.forceInstructions = forceInstructions;

    await settings.save();

    return sendResponse(
        res,
        "AI settings updated successfully",
        settings.ai
    );

});

/**
 * PUT /api/admin-settings/email
 */

exports.updateEmailSMS = asyncHandler(async (req, res) => {

    const { smtp, sms } = req.body;

    let settings = await getOrCreateSettings();

    settings = initializeSettings(settings);

    if (smtp) {

        if (!settings.emailSms) settings.emailSms = {};
        if (!settings.emailSms.smtp) settings.emailSms.smtp = {};
        if (!settings.emailSms.sms) settings.emailSms.sms = {};
        
        if (smtp) {
            Object.assign(settings.emailSms.smtp, smtp);
        }
        
        if (sms) {
            Object.assign(settings.emailSms.sms, sms);
        }

    }

    if (sms) {

        settings.emailSms.sms = {
            ...settings.emailSms.sms.toObject(),
            ...sms
        };

    }

    await settings.save();

    return sendResponse(
        res,
        "Email & SMS settings updated successfully",
        settings.emailSms
    );

});

/**
 * PUT /api/admin-settings/subscription
 */

exports.updateSubscription = asyncHandler(async (req, res) => {

    const {
        autoRenewal,
        trialPeriod
    } = req.body;

    let settings = await getOrCreateSettings();

    settings = initializeSettings(settings);

    if (autoRenewal !== undefined)
        settings.subscription.autoRenewal = autoRenewal;

    if (trialPeriod !== undefined)
        settings.subscription.trialPeriod = trialPeriod;

    await settings.save();

    return sendResponse(
        res,
        "Subscription settings updated successfully",
        settings.subscription
    );

});

/**
 * PUT /api/admin-settings/payment
 */

exports.updatePaymentGateway = asyncHandler(async (req, res) => {

    const { stripe, razorpay, paypal } = req.body;

    let settings = await AdminSettings.getSingleton();

    if (!settings.paymentGateway)
        settings.paymentGateway = {};

    if (stripe) {
        settings.paymentGateway.stripe = {
            ...(settings.paymentGateway.stripe || {}),
            ...stripe,
        };
    }

    if (razorpay) {
        settings.paymentGateway.razorpay = {
            ...(settings.paymentGateway.razorpay || {}),
            ...razorpay,
        };
    }

    if (paypal) {
        settings.paymentGateway.paypal = {
            ...(settings.paymentGateway.paypal || {}),
            ...paypal,
        };
    }

    await settings.save();

    return res.json({
        success: true,
        message: "Payment Gateway Updated",
        data: settings.paymentGateway,
    });

});

/**
 * PUT /api/admin-settings/documents
 */

exports.updateDocuments = async (req, res) => {

    try {

        const {
            invoiceTemplate,
            documentPrefix
        } = req.body;

        let settings = await getOrCreateSettings();

        settings = initializeSettings(settings);

        if (!settings.documents) {
            settings.documents = {};
        }
        
        if (invoiceTemplate !== undefined) {
            settings.documents.invoiceTemplate = invoiceTemplate;
        }
        
        if (documentPrefix !== undefined) {
            settings.documents.documentPrefix = documentPrefix;
        }
        await settings.save();

        return sendResponse(
            res,
            "Documents updated successfully",
            settings.documents
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * PUT /api/admin-settings/features
 */

exports.updateFeatures = async (req, res) => {

    try {
        let settings = await getOrCreateSettings();

        settings = initializeSettings(settings);

        if (!settings.features) {
            settings.features = {};
        }
        
        Object.assign(settings.features, req.body);
        
        await settings.save();
        
        return sendResponse(
            res,
            "Features updated successfully",
            settings.features
        );

        await settings.save();

        return sendResponse(
            res,
            "Features updated successfully",
            settings.features
        );

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

/**
 * PUT /api/admin-settings/security
 */

exports.updateSecurity = async (req, res) => {

    try {

        let settings = await getOrCreateSettings();

        settings = initializeSettings(settings);

        if (!settings.security) {
            settings.security = {};
        }
        
        Object.assign(settings.security, req.body);
        
        await settings.save();
        
        return sendResponse(
            res,
            "Security settings updated successfully",
            settings.security
        );

        await settings.save();

        return sendResponse(
            res,
            "Security settings updated successfully",
            settings.security
        );

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

/**
 * PUT /api/admin-settings/misc
 */

exports.updateMiscellaneous = async (req, res) => {

    try {

        let settings = await getOrCreateSettings();

        settings = initializeSettings(settings);

        if (!settings.miscellaneous) {
            settings.miscellaneous = {};
        }
        
        Object.assign(settings.miscellaneous, req.body);
        
        await settings.save();
        
        return sendResponse(
            res,
            "Miscellaneous settings updated successfully",
            settings.miscellaneous
        );
        await settings.save();

        return sendResponse(
            res,
            "Miscellaneous settings updated successfully",
            settings.miscellaneous
        );

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

/**
 * PUT /api/admin-settings/notice
 */

exports.updateNoticeBoard = async (req, res) => {

    try {

        let settings = await getOrCreateSettings();

        settings = initializeSettings(settings);

        if (!settings.noticeBoard) {
            settings.noticeBoard = {};
        }
        
        Object.assign(settings.noticeBoard, req.body);
        
        await settings.save();
        
        return sendResponse(
            res,
            "Notice board updated successfully",
            settings.noticeBoard
        );

        await settings.save();

        return sendResponse(
            res,
            "Notice board updated successfully",
            settings.noticeBoard
        );

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

/**
 * PUT /api/admin-settings/whatsapp
 */

exports.updateWhatsapp = async (req, res) => {

    try {

        let settings = await getOrCreateSettings();

settings = initializeSettings(settings);

if (!settings.whatsapp) {
    settings.whatsapp = {};
}

Object.assign(settings.whatsapp, req.body);

await settings.save();

return sendResponse(
    res,
    "Whatsapp settings updated successfully",
    settings.whatsapp
);
        await settings.save();

        return sendResponse(
            res,
            "Whatsapp settings updated successfully",
            settings.whatsapp
        );

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};