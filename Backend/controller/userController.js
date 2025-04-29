
const RegisterModel = require("../model/RegisterModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await RegisterModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ success: true, token,profile:user.profileImage,name:user.name });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error. Please try again later." });
    }
};

// Register function
exports.register = async (req, res) => {
    try {
        const { name,email, password } = req.body;
        const profileImage = req.file; // Multer handles file uploads

        // Validate inputs
        if (!name ||!email || !password || !profileImage) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check if user already exists
        const existingUser = await RegisterModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new RegisterModel({
            name,
            email,
            password: hashedPassword,
            profileImage: profileImage.filename,
        });

        // Save user to the database
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {name, email, profileImage: profileImage.filename },
        });
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ success: false, message: "Internal Server Error. Please try again later." });
    }
};
