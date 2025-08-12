import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

function App() {
  const pageRoute = [
    {
      path: "/",
      element: <Main />,
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
