import { useCallback, useEffect, useState } from "react";
import AdminOverview from "../admin/AdminOverview";
import AdminOrders from "../admin/AdminOrders";
import AdminUsers from "../admin/AdminUsers";
import AdminFoods from "../admin/AdminFoods";
import {
  fetchAnalytics,
  fetchFoods,
  fetchOrders,
  fetchUsers,
} from "../admin/adminApi";
import "./AdminDashboard.css";

const TABS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "orders", label: "Orders", icon: "📦" },
  { id: "users", label: "Users", icon: "👥" },
  { id: "foods", label: "Menu", icon: "🍽️" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [foods, setFoods] = useState([]);

  const loadAll = useCallback(async () => {
    setError("");
    try {
      const [analyticsData, ordersData, usersData, foodsData] = await Promise.all([
        fetchAnalytics(),
        fetchOrders(),
        fetchUsers(),
        fetchFoods(),
      ]);
      setAnalytics(analyticsData);
      setOrders(ordersData);
      setUsers(usersData);
      setFoods(foodsData);
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const refreshAnalytics = async () => {
    try {
      setAnalytics(await fetchAnalytics());
      setOrders(await fetchOrders());
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner-border text-warning" role="status" />
        <p className="mt-3 text-muted">Loading admin dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
        <button type="button" className="btn btn-warning" onClick={loadAll}>Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>🍲</span>
          <div>
            <strong>AfriFood</strong>
            <small>Admin Panel</small>
          </div>
        </div>
        <nav className="admin-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`admin-nav-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.id === "orders" && orders.length > 0 && (
                <span className="badge bg-warning text-dark ms-auto">{orders.length}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1 className="h3 mb-0">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h1>
            <p className="text-muted small mb-0">Manage your AfriFood platform</p>
          </div>
          <span className="badge bg-danger">ADMIN</span>
        </header>

        <div className="admin-content">
          {activeTab === "overview" && (
            <AdminOverview analytics={analytics} onRefresh={refreshAnalytics} />
          )}
          {activeTab === "orders" && (
            <AdminOrders orders={orders} onOrdersChange={setOrders} />
          )}
          {activeTab === "users" && (
            <AdminUsers users={users} onUsersChange={setUsers} />
          )}
          {activeTab === "foods" && (
            <AdminFoods foods={foods} onFoodsChange={setFoods} />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
