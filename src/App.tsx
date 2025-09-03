import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";

function App() {
  const pageRoute = [
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {pageRoute.map((page) => (
          <Route path={page.path} element={page.element} key={page.path} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
