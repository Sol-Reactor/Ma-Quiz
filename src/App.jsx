import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Quiz from "./pages/QuizPage.jsx";
import Signup from "./pages/LogIn.jsx";
import CompetePage from "./pages/CompetePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
