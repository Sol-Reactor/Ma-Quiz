import NavBar from "../components/layout/NavBar.jsx";
import Footer from "../components/layout/Footer.jsx";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow pt-6 md:pt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl  mx-auto text-center ">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              WELCOME TO OUR WEBSITE
              <span className="block text-indigo-600 mt-2">
                Earn Knowledge With Us
              </span>
            </h1>

            <div className="space-y-4 max-w-2xl mx-auto text-gray-600 text-lg sm:text-xl mt-8">
              <p>
                Test your knowledge with our engaging quizzes and challenges
                designed for all ages and interests.
              </p>
              <p className="font-medium text-gray-700">
                Join our community of learners and start your journey today!
              </p>
            </div>

            <button
              className="mt-6 inline-flex items-center justify-center 
                         px-8 py-4 border border-transparent text-lg 
                         font-bold rounded-full shadow-xl 
                         text-white bg-indigo-600 
                         hover:bg-indigo-700 
                         focus:outline-none focus:ring-4 focus:ring-indigo-500 
                         focus:ring-opacity-50 
                         transition transform hover:scale-105 duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
