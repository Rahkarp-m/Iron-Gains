const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

router.post("/", async (req, res) => {
  const { name, sets, reps, weight } = req.body;

  // Validate inputs
  if (!name || !sets || !reps || !weight) {
    return res.status(400).json({
      success: false,
      message: "All fields are required (name, sets, reps, weight)",
    });
  }

  try {
    // Create and save the workout with separate fields
    const newWorkout = new Workout({
      name,
      sets,
      reps,
      weight
    });
    await newWorkout.save();

    res.status(201).json({ success: true, workout: newWorkout });
  } catch (error) {
    console.error("Error saving workout:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



router.get("/", async (req, res) => {
  console.log("GET /api/workouts route hit");
  try {
    // Fetch all workouts from the database
    const workouts = await Workout.find();
    console.log("Workouts fetched:", workouts);
    res.status(200).json({ success: true, workouts });
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
