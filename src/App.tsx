import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { DashboardProvider } from "./contexts/DashboardContext";
import Login from "./pages/Login";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/main" element={<Main />} />
        <Route path="/profile" element={<Profile />} />

        {/* Dashboard routes wrapped with DashboardProvider */}
        <Route
          path="/dashboard/*"
          element={
            <DashboardProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/all-team" element={<Dashboard />} />
                <Route path="/shared-projects" element={<Dashboard />} />
                <Route path="/team/:teamId" element={<Dashboard />} />
              </Routes>
            </DashboardProvider>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
