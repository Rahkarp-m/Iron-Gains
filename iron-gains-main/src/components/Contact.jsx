import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white">
      <h2 className="text-3xl mb-4">Contact Us</h2>
      <p className="max-w-2xl text-center">
        If you have any questions or concerns, feel free to reach out to us at <a href="mailto:support@fitnessapp.com" className="text-blue-500">support@fitnessapp.com</a>.
      </p>
    </div>
  );
}
