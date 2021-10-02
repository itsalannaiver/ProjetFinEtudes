const mongoose = require("mongoose");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");

let connectionString = "mongodb://localhost:27017/Eff";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => {
    throw new Error(err);
  });

let storage = new GridFsStorage({
  url: connectionString,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

module.exports = { mongoose, upload };
