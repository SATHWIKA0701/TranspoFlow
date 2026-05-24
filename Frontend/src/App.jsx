import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import Deliveries from "./pages/Deliveries";
import Tracking from "./pages/Tracking";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {[
        ["/dashboard", <Dashboard />],
        ["/vehicles", <Vehicles />],
        ["/drivers", <Drivers />],
        ["/deliveries", <Deliveries />],
        ["/tracking", <Tracking />],
        ["/schedule", <Schedule />],
        ["/reports", <Reports />],
        ["/settings", <Settings />]
      ].map(([path, page]) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <MainLayout>{page}</MainLayout>
            </ProtectedRoute>
          }
        />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;