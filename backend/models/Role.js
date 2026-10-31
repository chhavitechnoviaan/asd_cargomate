const mongoose = require("mongoose");

const permissionSchema = {
  view: { type: Boolean, default: false },
  add: { type: Boolean, default: false },
  edit: { type: Boolean, default: false },
  delete: { type: Boolean, default: false }
};

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  permissions: {
    dashboard: permissionSchema,
    booking: permissionSchema,
    shipment: permissionSchema,
    tracking: permissionSchema,
    documents: permissionSchema,
    earnings: permissionSchema,
    ads: permissionSchema,
    support: permissionSchema,
    settings: permissionSchema
  }

}, { timestamps: true });

module.exports = mongoose.model("Role", roleSchema);