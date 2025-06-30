import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.post("/auth/register", { username, email, password, referral });
      setSuccess("Registration successful! Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-2">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 mb-2">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 border rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Referral (User ID, optional)"
          className="w-full px-3 py-2 border rounded"
          value={referral}
          onChange={e => setReferral(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">Register</button>
      </form>
      <div className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
      </div>
    </div>
  );
}
