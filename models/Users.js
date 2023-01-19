const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  phone: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  isActive: {
    type : Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
