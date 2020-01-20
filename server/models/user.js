const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  id: String,
  groups: [String],
  password: String,
  // googleid: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
