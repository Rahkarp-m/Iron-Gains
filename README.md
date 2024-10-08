# Iron Gains 💪

**Iron Gains** is an AI-driven, personalized fitness workout website designed to help users track their workouts and improve their fitness journey. The website leverages modern web technologies like **React.js**, **Node.js**, and **MongoDB** for a seamless user experience. It also incorporates **Google's Generative AI (Gemini-1.5-flash)** to assist users with workout queries and suggestions.

## Features 🌟

### 1. **Personalized Workouts**:
Iron Gains generates personalized workout plans based on the user's fitness level and goals. The AI-powered assistant, **AskGymBro**, suggests tailored workouts using **Google's Generative AI (Gemini-1.5)**, providing real-time fitness advice and recommendations.

### 2. **Track Your Workouts**:
Users can track the exercises they perform, record the number of sets, reps, and weight used. Each workout is stored in a **MongoDB** database to keep track of progress.

### 3. **Exercise Management**:
- Add different exercises to your workout list.
- Each exercise has its own input:
  - Number of sets
  - Average reps per set
  - Weight used for the exercise
- All workout data is stored in the backend to ensure easy access to exercise history and stats.

### 4. **Intuitive UI with Tailwind CSS**:
The website's front-end is built with **React.js** and styled with **Tailwind CSS**, offering a clean and responsive user interface. The design is minimalistic but powerful, allowing users to navigate effortlessly between tracking their workouts and exploring new exercises.

### 5. **Secure Authentication**:
Iron Gains includes user authentication through **JWT tokens** and bcrypt password hashing to keep user data secure. The authentication system is managed through a dedicated **auth API** in the backend.

---

## Technologies Used 🛠️

- **Front-end**: React.js, Tailwind CSS
- **Back-end**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Google Generative AI (Gemini-1.5-flash)
- **Authentication**: JWT, bcrypt
- **Styling**: Tailwind CSS
- **API**: Axios for API requests

---

## Project Structure 📁

### Frontend:
- **src/components**: Contains components like `TrackWorkout`, `WorkoutGenerator`, `Hero`, and `AskGymBro` for AI-based queries.
- **src/utils**: Helper functions like `generateWorkout.js` to dynamically create workouts based on user inputs.

### Backend:
- **server.js**: Main server file that connects routes, handles middleware, and initializes the AI model.
- **routes**: 
  - `authRoutes.js`: Handles user authentication.
  - `genRoutes.js`: Handles AI-generated responses.
  - `workoutRoutes.js`: Manages workout tracking (saving sets, reps, weight).

- **models**: Contains Mongoose models for users, workouts, and exercises.

---

## Installation & Usage ⚙️

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/iron-gains.git
   cd iron-gains
   
Backend Setup:

Create a .env file in the root directory
cd backend
npm install
npm run dev
cd frontend
npm install
npm start

