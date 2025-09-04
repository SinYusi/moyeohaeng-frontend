import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { DashboardProvider } from "./contexts/DashboardContext";
import Login from "./pages/Login";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardAllTeam from "./pages/dashboard/DashboardAllTeam";
import DashboardTeam from "./pages/dashboard/DashboardTeam";
import Plan from "./pages/Plan";

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
        <Route path="/plan/:id" element={<Plan />} />

        {/* Dashboard routes wrapped with DashboardProvider */}
        <Route path="/dashboard" element={<DashboardProvider />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="all-team" element={<DashboardAllTeam />} />
          <Route path="shared-projects" element={<DashboardHome />} />
          <Route path="team/:teamId" element={<DashboardTeam />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
