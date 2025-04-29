// const express = require('express');
// const userController = require("../controller/userController");
// const router = express.Router();

// router.post("/register", userController.register);


// module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");
const userController = require("../controller/userController");

const router = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Store images in 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Initialize Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // Limit file size to 2MB
});

// Register route with file upload
router.post("/register", upload.single("profileImage"), userController.register);

module.exports = router;
