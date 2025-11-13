import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Quiz from "./pages/QuizPage.jsx";
import CompetePage from "./pages/CompetePage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx"; // Assuming this is your user dashboard
import LogIn from "./pages/LogIn.jsx"; // Corrected import name
import MainLayout from "./components/layout/MainLayout.jsx";
import { Toaster } from "react-hot-toast";
import "./style/toast.css";
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/common/LoadingSpinner";

const router = createBrowserRouter([
  {
    path: "/", // ✅ Parent layout route (includes NavBar)
    element: <MainLayout />,
    errorElement: (
      <div className="flex flex-col justify-center items-center h-[100vh] text-lg text-gray-400">
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
    children: [
      { index: true, element: <Home /> }, // same as path: "/"
      { path: "about", element: <About /> },
      { path: "quiz", element: <Quiz /> },
      { path: "competepage", element: <CompetePage /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "signin", element: <LogIn /> },
      { path: "signup", element: <LogIn /> }, // Added route for /signup
    ],
  },
]);

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: { marginTop: "20px" },
        }}
        reverseOrder={false}
      />
    </>
  );
}

export default App;
