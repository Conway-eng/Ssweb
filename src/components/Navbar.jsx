import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white">
      <div>
        <Link to="/" className="font-bold text-lg">Complaint System</Link>
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hi, {user.username}</span>
            <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
