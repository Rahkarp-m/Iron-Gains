import React, { useState } from 'react';
import axios from 'axios';

export default function AskGymBro() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    try {
      console.log('Sending prompt:', input); // Log the prompt being sent
      const res = await axios.post('http://localhost:5000/api/askgymbro', { prompt: input });
      console.log('Received response:', res.data); // Log the received response
      setResponse(res.data.response);
    } catch (error) {
      console.error('Detailed error:', error.response?.data || error); // Log more detailed error info
      setResponse('An error occurred while processing your request. Please try again.');
    }
    setIsLoading(false);
  }

  return (
    <section id="ask-gym-bro" className="bg-slate-950 text-white flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl sm:text-5xl font-semibold mb-6">Ask Your Gym Bro</h2>

      <div className="w-full max-w-md text-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your workout questions here..."
          className="w-full p-4 rounded-md bg-slate-800 text-white border border-blue-400 focus:outline-none mb-4"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold disabled:opacity-50">
          {isLoading ? 'Thinking...' : 'Ask'}
        </button>
      </div>

      {response && (
        <div className="mt-8 w-full max-w-md bg-slate-800 p-4 rounded-md">
          <h3 className="text-xl font-semibold mb-2">Gym Bro says:</h3>
          <p className="text-left whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </section>
  );
}