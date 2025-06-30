import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Complaints from "./pages/Complaints";
import AdminComplaints from "./pages/AdminComplaints";
import api from "./api/api";

function ProtectedRoute({ user, children, adminOnly }) {
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;
  return children;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      api.get("/auth/me")
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="max-w-2xl mx-auto p-4">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute user={user}><Dashboard user={user} /></ProtectedRoute>
          } />
          <Route path="/complaints" element={
            <ProtectedRoute user={user}><Complaints /></ProtectedRoute>
          } />
          <Route path="/admin/complaints" element={
            <ProtectedRoute user={user} adminOnly={true}><AdminComplaints /></ProtectedRoute>
          } />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
