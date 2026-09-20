import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Achievements from "./pages/Achievements";
import Staff from "./pages/Staff";
import Donors from "./pages/Donors";
import News from "./pages/News";

import Sidebar from "./Components/Sidebar/Sidebar";
import AdminNavbar from "./Components/Navbar/AdminNavbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Content */}
      <main className="ml-64 min-h-screen">
        {/* Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
