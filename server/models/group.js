const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  groupName: String,
  activiationCode: String,
  creatorId: String,
  items: Number,
  timestamp: { type: Date, default: Date.now }, 
  users: [String],
});

// compile model from schema
module.exports = mongoose.model("group", GroupSchema);
