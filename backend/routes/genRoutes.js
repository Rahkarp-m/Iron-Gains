const express = require("express");
const router = express.Router();

router.post("/generate-workout", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Define workout-related keywords
    const workoutKeywords = [
      "workout",
      "exercise",
      "fitness",
      "training",
      "gym",
      "muscles",
    ];

    // Check if the prompt is workout-related
    const isWorkoutRelated = workoutKeywords.some((keyword) =>
      prompt.toLowerCase().includes(keyword)
    );

    if (!isWorkoutRelated) {
      return res.json({
        workoutPlan:
          "I'm sorry, but I can only assist with workout-related queries. Please ask me about workouts, exercises, or fitness routines.",
      });
    }

    // Construct the prompt for the AI model
    const aiPrompt = `You are a fitness assistant designed to generate workout routines only. 
Generate a brief, structured workout plan based on the following user query. 
If the query is not specific enough, create a general workout plan.
Use the following format:

1. [Exercise Name]: [Sets] x [Reps]
2. [Exercise Name]: [Sets] x [Reps]
3. [Exercise Name]: [Duration]
...

Total Workout Duration: [Estimated Time]

User Query: ${prompt}

Response:`;

    // Assuming req.genAI.model.generateContent is the method to interact with your AI model
    const result = await req.genAI.model.generateContent(aiPrompt);
    const response = await result.response;
    const workoutPlan = response.text(); // Assuming this returns the text response from the AI model

    res.json({ workoutPlan });
  } catch (error) {
    console.error("Error generating workout:", error);
    res.status(500).json({
      error: "An error occurred while generating the workout plan.",
    });
  }
});

module.exports = router;
