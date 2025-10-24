import React from "react";
import img from "../assets/images/girl.jpg";
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-700 sm:text-5xl tracking-tight">
            About CodeQuest 🚀
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Your ultimate destination for sharpening skills and testing
            knowledge in Software Engineering.
          </p>
        </header>

        {/* Introductory Image */}
        <div className="mb-12">
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc0ODd8MHwxfHNlYXJjaHwyMHx8c29mdHdhcmUlMjBlbmdpbmVlcmluZyUyMHN0dWRlbnRzfGVufDB8fHx8MTcwMDcwNzU3MXww&ixlib=rb-4.0.3&q=80&w=800"
            alt="Software engineering students collaborating"
            className="rounded-xl shadow-lg w-full h-80 object-cover"
          />
          <p className="mt-4 text-sm text-gray-500 text-center">
            Collaborate, learn, and grow your software engineering skills.
          </p>
        </div>

        {/* Mission Statement */}
        <section className="bg-white p-8 rounded-xl shadow-lg mb-12 border-l-4 border-indigo-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            We aim to foster a vibrant community of software enthusiasts by
            making technical education **accessible, competitive, and fun**. We
            provide the tools for continuous learning across core engineering
            disciplines.
          </p>
        </section>

        {/* Core Offerings Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Solo Quizzes */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <div className="flex items-center mb-4">
              <span className="text-3xl text-green-500 mr-3">🧠</span>
              <h3 className="text-2xl font-bold text-gray-900">
                1. Solo Quizzes: Personal Skill Check
              </h3>
            </div>
            {/* Image for Solo Quizzes */}
            <img
              src={img}
              alt="Person coding on a laptop, focusing on solo learning"
              className="rounded-md w-full h-40 object-cover mb-6"
            />
            <p className="text-gray-700 mb-6">
              Dive deep into specific topics with focused sessions designed to
              help you master core concepts at your own pace.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span>
                  **Comprehensive Topics:** Covers **Networking**, **Web
                  Development** (Frontend/Backend), **OOP**, Data Structures,
                  and more.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span>
                  **Instant Feedback:** Receive immediate scores and feedback to
                  quickly identify your knowledge gaps.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span>
                  **Flexible Learning:** Quiz anytime, anywhere—perfect for
                  studying or a quick refresh.
                </span>
              </li>
            </ul>
          </div>

          {/* Competitions */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <div className="flex items-center mb-4">
              <span className="text-3xl text-red-500 mr-3">🏆</span>
              <h3 className="text-2xl font-bold text-gray-900">
                2. Head-to-Head Competitions
              </h3>
            </div>
            {/* Image for Competitions */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc0ODd8MHwxfHNlYXJjaHw3fHxjb21wZXRpdGlvbiUyMGdhbWVzJTIwdGVhbXdvcmt8ZW58MHx8fHwxNzAwNzA3NDg0fDA&ixlib=rb-4.0.3&q=80&w=400"
              alt="Team collaborating or competing, showing teamwork"
              className="rounded-md w-full h-40 object-cover mb-6"
            />
            <p className="text-gray-700 mb-6">
              Ready to prove your mastery? Challenge friends or other users in
              real-time, high-stakes quiz battles.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✓</span>
                <span>
                  **Multiplayer Battles:** Compete against **two or more**
                  opponents simultaneously. Speed and accuracy matter!
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✓</span>
                <span>
                  **Leaderboards:** Track your progress, earn points, and climb
                  the global rankings for competitive glory.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✓</span>
                <span>
                  **Dynamic Question Sets:** A randomized mix of questions from
                  all software disciplines for a true test of breadth.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Start Your CodeQuest Today!
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
