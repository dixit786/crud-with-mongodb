const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    role: {
        type: String,
        enum: ["Admin", "User"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Role", roleSchema);