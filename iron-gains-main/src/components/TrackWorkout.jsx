import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TrackWorkout() {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/workouts');
        console.log('Response data:', res.data); // Add this line
        if (res.data.success && Array.isArray(res.data.workouts)) {
          setExercises(res.data.workouts);
        } else {
          console.error('Unexpected response format:', res.data);
        }
      } catch (error) {
        console.error('Error fetching exercises:', error.response ? error.response.data : error.message);
      }
    };
    fetchExercises();
  }, []);
  
  const handleAddExercise = async () => {
    if (!exercise.trim() || !sets || !reps || !weight) {
      alert('Please fill out all fields');
      return;
    }
  
    try {
      const payload = {
        name: exercise.trim(), // Changed 'mame' to 'name'
        sets: parseInt(sets, 10),
        reps: parseInt(reps, 10),
        weight: parseFloat(weight)
      };
  
      const res = await axios.post('http://localhost:5000/api/workouts', payload, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (res.data.success) {
        setExercises([...exercises, res.data.workout]);
        setExercise('');
        setSets('');
        setReps('');
        setWeight('');
      } else {
        alert('Failed to add exercise');
      }
    } catch (error) {
      console.error('Error adding exercise:', error.response ? error.response.data : error.message);
      alert('Failed to add exercise: ' + (error.response ? error.response.data.message : error.message));
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-950 text-white p-8">
      <h2 className="text-4xl font-semibold mb-6">Track My Workout</h2>

      <div className="flex flex-col mb-6 w-full max-w-md">
        <input
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="Enter exercise name"
          className="p-4 text-black rounded-md mb-2"
        />
        <input
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          placeholder="Sets"
          className="p-4 text-black rounded-md mb-2"
        />
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          placeholder="Reps"
          className="p-4 text-black rounded-md mb-2"
        />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight (kg)"
          className="p-4 text-black rounded-md mb-4"
        />
        <button
          onClick={handleAddExercise}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Add Exercise
        </button>
      </div>

      <ul className="w-full max-w-md">
  {exercises.length > 0 ? (
    exercises.map((exercise, index) => (
      <li key={index} className="bg-slate-800 text-white p-4 rounded-md mb-2">
        <div className="flex justify-between">
          <span>{exercise.name}</span>
          <span>{`${exercise.sets} sets x ${exercise.reps} reps @ ${exercise.weight} kg`}</span>
        </div>
      </li>
    ))
  ) : (
    <p className="text-slate-400">No exercises added yet.</p>
  )}
</ul>
    </div>
  );
}
