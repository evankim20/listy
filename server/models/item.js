const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  sender: {
      _id: String,
      name: String,
  },
  id: String,
  groupId: String,
  content: String,
  likedBy: [String],
  dislikedBy: [String],
});

// compile model from schema
module.exports = mongoose.model("item", ItemSchema);
