import { useEffect, useState } from "react";
import "./AdminDashboard.css";

const ORDER_STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("orders");

  const loadData = async () => {
    setError("");
    try {
      const [ordersRes, usersRes] = await Promise.all([
        fetch("/api/admin/orders", { credentials: "include" }),
        fetch("/api/admin/users", { credentials: "include" }),
      ]);

      if (!ordersRes.ok || !usersRes.ok) {
        throw new Error("Failed to load admin data");
      }

      setOrders(await ordersRes.json());
      setUsers(await usersRes.json());
    } catch (err) {
      setError(err.message || "Could not load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to update status");
      }

      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading admin dashboard...</div>;
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4 admin-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">Admin Dashboard</h1>
          <p className="text-muted mb-0">Manage orders and users</p>
        </div>
        <span className="badge bg-danger fs-6">ADMIN</span>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders ({orders.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users ({users.length})
          </button>
        </li>
      </ul>

      {activeTab === "orders" && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No orders yet</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.orderNumber}</td>
                    <td>
                      <div>{order.customerName}</div>
                      <small className="text-muted">{order.customerEmail}</small>
                    </td>
                    <td className="small">{order.shippingAddress}</td>
                    <td>₦{order.totalAmount?.toLocaleString()}</td>
                    <td>
                      <span className="badge bg-secondary">{order.orderStatus}</span>
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "users" && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <span className={`badge ${u.role === "ADMIN" ? "bg-danger" : "bg-primary"}`}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
