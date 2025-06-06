"use strict";

var multer = require("multer");

var _require = require("multer-storage-cloudinary"),
    CloudinaryStorage = _require.CloudinaryStorage;

var cloudinary = require("cloudinary").v2;

var dotenv = require("dotenv");

dotenv.config(); // Configurazione Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
}); // Configurazione storage per multer

var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "immagini_test",
    // Nome della cartella su Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"]
  }
});
var upload = multer({
  storage: storage
});
module.exports = upload;