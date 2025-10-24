import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Quiz from "./pages/QuizPage.jsx";
import Signup from "./pages/LogIn.jsx";
import CompetePage from "./pages/CompetePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: (
      <div className="flex flex-col  justify-center items-center h-[100vh] text-lg text-gray-400  ">
        <h1>Error 404: Page Not Found</h1>
        <p>Please visit the home page</p>
        <button
          className="mt-6 inline-flex items-center justify-center 
                         px-8 py-4 border border-transparent text-lg 
                         font-bold rounded-full shadow-xl 
                         text-white bg-slate-700 
                         hover:bg-indigo-300 
                         focus:outline-none focus:ring-4 focus:ring-indigo-500 
                         focus:ring-opacity-50 
                         transition transform hover:scale-75 duration-300"
        >
          <Link to="/">Home</Link>
        </button>
      </div>
    ),
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/CompetePage",
    element: <CompetePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
