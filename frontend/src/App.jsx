import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Quiz from "./pages/QuizPage.jsx";
import CompetePage from "./pages/CompetePage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx"; // Assuming this is your user dashboard
import LogIn from "./pages/LogIn.jsx"; // Corrected import name
import Profile from "./pages/Profile.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import { Toaster } from "react-hot-toast";
import "./style/toast.css";
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ProtectedRoute from "./ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/", // ✅ Parent layout route (includes NavBar)
    element: <MainLayout />,
    errorElement: (
      <div className="flex flex-col justify-center items-center h-[100vh] text-lg text-gray-100 p-10 bg-gray-500">
        <h1>Error 404: Page Not Found</h1>
        <p>Please Go Back To home page</p>
        <button
          className="mt-6 inline-flex items-center justify-center 
                         px-8 py-4 border border-transparent text-lg 
                         font-bold rounded-3xl shadow-xl 
                         text-white bg-slate-700 
                         hover:bg-indigo-300 
                         focus:outline-none focus:ring-4 focus:ring-indigo-500 
                         focus:ring-opacity-50 
                         transition transform hover:scale-85 duration-300"
        >
          <Link to="/">Home</Link>
        </button>
      </div>
    ),
    children: [
      { index: true, element: <Home /> }, // same as path: "/"
      { path: "about", element: <About /> },
      {
        path: "quiz",
        element: (
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        ),
      },
      { path: "competepage", element: <CompetePage /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
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
          style: { marginTop: "10px" },
        }}
        reverseOrder={false}
      />
    </>
  );
}

export default App;
