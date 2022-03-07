const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let HairSchema = new Schema({
  color: { type: String, required: true },
  style: { type: String, required: true },
  assetLocation: { type: String, required: true },
});

module.exports = mongoose.model("hair", HairSchema);
