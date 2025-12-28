import React, { useEffect, useState } from "react";
import { getAdminStats, getAllUsers, deleteUser, getAllProfiles, deleteAnyProfile } from "../api/adminApi";
import { toast } from "react-toastify";
import { Table, Button } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes, profilesRes] = await Promise.all([
          getAdminStats(),
          getAllUsers(),
          getAllProfiles(),
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setProfiles(profilesRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    await deleteUser(id);
    setUsers(users.filter(u => u._id !== id));
    toast.success("User deleted");
  };

  const handleDeleteProfile = async (id) => {
    if (!window.confirm("Are you sure to delete this profile?")) return;
    await deleteAnyProfile(id);
    setProfiles(profiles.filter(p => p._id !== id));
    toast.success("Profile deleted");
  };

  if (loading) return <p className="text-center mt-5">Loading dashboard...</p>;

  const chartData = [
    { name: "Users", value: stats.users },
    { name: "Profiles", value: stats.profiles },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">📊 Admin Dashboard</h2>

      {/* 🔢 Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h5>Total Users</h5>
            <h2 className="text-success">{stats.users}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h5>Total Profiles</h5>
            <h2 className="text-primary">{stats.profiles}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h5>Average Age</h5>
            <h2 className="text-warning">{Math.round(stats.avgAge)}</h2>
          </div>
        </div>
      </div>

      {/* 📈 Chart */}
      <div className="card shadow p-3 mb-4">
        <h5 className="text-center mb-3">System Overview</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🧑‍💻 Users Table */}
      <h5>All Users</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteUser(u._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 📋 Profiles Table */}
      <h5 className="mt-4">All Profiles</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.job}</td>
              <td>{p.age}</td>
              <td>{p.salary}</td>
              <td>{p.location}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteProfile(p._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminDashboard;
