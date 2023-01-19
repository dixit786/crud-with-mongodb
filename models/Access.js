const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accessSchema = new Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    access_array: {
        type: [String],
        default: []
        // enum: ["Add", "Edit", "Delete", "View"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Access", accessSchema);