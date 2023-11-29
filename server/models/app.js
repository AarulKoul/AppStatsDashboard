const mongoose = require("mongoose");
const appSchema = mongoose.Schema({
  "App Name": String,
  "App Id": String,
  Category: String,
  Rating: Number,
  "Rating Count": Number,
  Installs: String,
  "Maximum Installs": Number,
  Free: Boolean,
  Price: Number,
  Currency: String,
  Size: String,
  "Minimum Android": String,
  "Developer Id": String,
  Released: String,
  "Last Updated": String,
  "Content Rating": String,
  "Ad Supported": Boolean,
  "In App Purchases": Boolean,
});
module.exports = mongoose.model("App", appSchema, "AppData");
