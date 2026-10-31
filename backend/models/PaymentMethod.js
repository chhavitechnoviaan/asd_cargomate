const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    cardHolder: String,

    cardBrand: String,

    cardLast4: String,

    expiryMonth: Number,

    expiryYear: Number,

    isDefault: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "PaymentMethod",
    paymentMethodSchema
);