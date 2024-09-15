const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const genRoutes = require("./routes/genRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

const app = express();
connectDB();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(cors());
app.use(express.json());

// Custom middleware for Gemini AI
app.use((req, res, next) => {
  req.genAI = { model };
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gen", genRoutes); // Updated from "/api" to "/api/gen" to avoid route conflicts
app.use("/api/workouts", workoutRoutes);


// AskGymBro route
app.post("/api/askgymbro", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt); // Log the received prompt
    const result = await req.genAI.model.generateContent(prompt);
    console.log("Generated result:", result); // Log the generated result
    const response = await result.response;
    const text = response.text();
    res.json({ response: text });
  } catch (error) {
    console.error("Detailed error:", error); // Log the full error object
    res.status(500).json({
      error: "An error occurred while processing your request.",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
