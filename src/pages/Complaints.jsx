import { useState, useEffect } from "react";
import api from "../api/api";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [statusUpdate, setStatusUpdate] = useState({});

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints");
      setComplaints(res.data);
    } catch (err) {
      setError("Failed to fetch complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/complaints/${id}`, { status });
      setStatusUpdate({ ...statusUpdate, [id]: "" });
      fetchComplaints();
    } catch (err) {
      setError("Failed to update status");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">All Complaints</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-2">{error}</div>}
      <ul>
        {complaints.map(c => (
          <li key={c._id} className="mb-4 p-4 border rounded">
            <div><span className="font-semibold">{c.subject}</span> by <span className="text-blue-800">{c.user?.username}</span></div>
            <div>{c.message}</div>
            <div className="text-sm text-gray-600">
              Status: <span className={
                c.status === "open" ? "text-blue-600" :
                c.status === "resolved" ? "text-green-600" : "text-gray-600"
              }>{c.status}</span>
              <span> | Submitted: {new Date(c.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center mt-2">
              <select
                className="border rounded px-2 py-1 mr-2"
                value={statusUpdate[c._id] || c.status}
                onChange={e => setStatusUpdate({ ...statusUpdate, [c._id]: e.target.value })}
              >
                <option value="open">Open</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                disabled={statusUpdate[c._id] === c.status}
                onClick={() => handleStatusChange(c._id, statusUpdate[c._id] || c.status)}
              >
                Update
              </button>
            </div>
            {c.status === "resolved" && c.resolvedAt &&
              <div className="text-sm text-green-700">Resolved at: {new Date(c.resolvedAt).toLocaleString()}</div>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
