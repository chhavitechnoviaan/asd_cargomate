const User = require("../models/user");
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");
const Invoice = require("../models/Invoice");
const BillingHistory = require("../models/BillingHistory");
const PaymentMethod = require("../models/PaymentMethod");
const Shipment = require("../models/Shipment");
const ShipmentDocument = require("../models/ShipmentDocument");
const HSLookupHistory = require("../models/HSCode");

exports.getSubscriptionDashboard = async (req, res) => {

    try {

        const userId = req.user._id;

        const subscription = await Subscription
            .findOne({ userId })
            .populate("planId");

        const paymentMethod = await PaymentMethod.findOne({
            userId,
            isDefault: true
        });

        const latestInvoice = await Invoice
            .findOne({ userId })
            .sort({ createdAt: -1 });

        res.json({

            status: 1,

            data: {

                currentPlan: subscription,

                billing: {

                    billingCycle: subscription?.billingCycle,

                    amount: subscription?.amount,

                    nextBillingDate: subscription?.nextBillingDate,

                    status: subscription?.status

                },

                paymentMethod,

                latestInvoice

            }

        });

    } catch (err) {

        res.status(500).json({

            status: 0,

            message: err.message

        });

    }

};


exports.getUsageSummary = async (req, res) => {

    try {

        const userId = req.user._id;

        const subscription = await Subscription
            .findOne({ userId })
            .populate("planId");

        const shipmentCount = await Shipment.countDocuments({
            userId
        });

        const hsLookupCount =
            await HSLookupHistory.countDocuments({
                userId
            });

        const docs = await ShipmentDocument.find({
            uploadedBy: userId
        });

        let totalStorage = 0;

        docs.forEach(doc => {

            totalStorage += doc.fileSize || 0;

        });

        res.json({

            status: 1,

            data: {

                shipments: {

                    used: shipmentCount,

                    limit:
                        subscription?.planId
                            ?.shipmentLimit || 0

                },

                hsLookup: {

                    used: hsLookupCount,

                    limit:
                        subscription?.planId
                            ?.hsLookupLimit || 0

                },

                storage: {

                    used: totalStorage,

                    limit:
                        subscription?.planId
                            ?.storageLimit || 0

                }

            }

        });

    } catch (err) {

        res.status(500).json({

            status: 0,

            message: err.message

        });

    }

};


exports.getInvoices = async (req, res) => {

    try {

        const invoices = await Invoice.find({

            userId: req.user._id

        }).sort({

            createdAt: -1

        });

        res.json({

            status: 1,

            data: invoices

        });

    } catch (err) {

        res.status(500).json({

            status: 0,

            message: err.message

        });

    }

};

exports.downloadInvoice = async (req, res) => {

    try {

        const invoice = await Invoice.findById(
            req.params.id
        );

        if (!invoice) {

            return res.status(404).json({

                status: 0,

                message: "Invoice not found"

            });

        }

        res.json({

            status: 1,

            downloadUrl: invoice.invoiceUrl

        });

    } catch (err) {

        res.status(500).json({

            status: 0,

            message: err.message

        });

    }

};

exports.getBillingHistory = async (req, res) => {

    try {

        const history =
            await BillingHistory.find({

                userId: req.user._id

            }).sort({

                paymentDate: -1

            });

        res.json({

            status: 1,

            data: history

        });

    } catch (err) {

        res.status(500).json({

            status: 0,

            message: err.message

        });

    }

};

exports.getPaymentMethod = async (req, res) => {

    try {

        const paymentMethod = await PaymentMethod.findOne({

            userId: req.user._id,
            isDefault: true

        });

        res.json({

            status: 1,
            data: paymentMethod

        });

    } catch (err) {

        res.status(500).json({

            status: 0,
            message: err.message

        });

    }

};


exports.changePlan = async (req, res) => {

    try {

        const { planId } = req.body;

        const subscription = await Subscription.findOne({

            userId: req.user._id

        });

        if (!subscription) {

            return res.status(404).json({

                status: 0,
                message: "Subscription not found"

            });

        }

        const plan = await Plan.findById(planId);

        if (!plan) {

            return res.status(404).json({

                status: 0,
                message: "Plan not found"

            });

        }

        subscription.planId = plan._id;
        subscription.amount = plan.price;

        await subscription.save();

        res.json({

            status: 1,
            message: "Plan updated successfully",
            data: subscription

        });

    } catch (err) {

        res.status(500).json({

            status: 0,
            message: err.message

        });

    }

};


exports.updatePaymentMethod = async (req, res) => {

    try {

        const {

            cardHolder,
            cardBrand,
            cardLast4,
            expiryMonth,
            expiryYear

        } = req.body;

        let payment = await PaymentMethod.findOne({

            userId: req.user._id,
            isDefault: true

        });

        if (!payment) {

            payment = new PaymentMethod({

                userId: req.user._id

            });

        }

        payment.cardHolder = cardHolder;
        payment.cardBrand = cardBrand;
        payment.cardLast4 = cardLast4;
        payment.expiryMonth = expiryMonth;
        payment.expiryYear = expiryYear;
        payment.isDefault = true;

        await payment.save();

        res.json({

            status: 1,
            message: "Payment Method Updated",
            data: payment

        });

    } catch (err) {

        res.status(500).json({

            status: 0,
            message: err.message

        });

    }

};


exports.cancelSubscription = async (req, res) => {

    try {

        const subscription = await Subscription.findOne({

            userId: req.user._id

        });

        if (!subscription) {

            return res.status(404).json({

                status: 0,
                message: "Subscription not found"

            });

        }

        subscription.status = "Cancelled";

        await subscription.save();

        res.json({

            status: 1,
            message: "Subscription cancelled successfully"

        });

    } catch (err) {

        res.status(500).json({

            status: 0,
            message: err.message

        });

    }

};