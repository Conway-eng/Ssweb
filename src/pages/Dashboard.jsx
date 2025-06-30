import { Link } from "react-router-dom";

export default function Dashboard({ user }) {
  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user?.username}!</h1>
      <p className="mb-4">Your email: {user?.email}</p>
      <p className="mb-4">Coins: {user?.coins}</p>
      <Link to="/complaints" className="bg-blue-600 text-white px-4 py-2 rounded">
        View My Complaints
      </Link>
      {user?.isAdmin && (
        <Link to="/admin/complaints" className="ml-4 bg-green-600 text-white px-4 py-2 rounded">
          Admin Panel
        </Link>
      )}
    </div>
  );
}
