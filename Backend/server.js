const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDatabase = require("./config/db.js");
const LoginRoutes = require("./routes/login.route.js");
const RegisterRoutes =require('./routes/signup.route.js')
const path = require('path')
dotenv.config();
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.PORT) {
  console.error("ERROR: PORT is not defined in the environment variables.");
  process.exit(1);
}

// Connect to the database
connectToDatabase()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });

// Routes
app.get("/", (req, res) => {
  res.send("The API is running");
});

app.use("/api/v1/", RegisterRoutes);
app.use("/api/v1/", LoginRoutes);

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});