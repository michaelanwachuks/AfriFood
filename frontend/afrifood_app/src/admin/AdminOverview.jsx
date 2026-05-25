const formatMoney = (n) => `₦${(n ?? 0).toLocaleString()}`;

const StatCard = ({ label, value, sub, color = "primary" }) => (
  <div className={`col-md-6 col-xl-3`}>
    <div className={`card border-0 shadow-sm stat-card stat-${color}`}>
      <div className="card-body">
        <p className="text-muted small mb-1">{label}</p>
        <h3 className="mb-0">{value}</h3>
        {sub && <small className="text-muted">{sub}</small>}
      </div>
    </div>
  </div>
);

const BarChart = ({ data, valueKey, labelKey = "date", formatValue }) => {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  return (
    <div className="bar-chart">
      {data.map((d) => (
        <div key={d[labelKey]} className="bar-chart-item">
          <div
            className="bar-chart-bar"
            style={{ height: `${(d[valueKey] / max) * 100}%` }}
            title={`${d[labelKey]}: ${formatValue ? formatValue(d[valueKey]) : d[valueKey]}`}
          />
          <small className="bar-chart-label">{d[labelKey]?.slice(5)}</small>
        </div>
      ))}
    </div>
  );
};

const AdminOverview = ({ analytics, onRefresh }) => {
  if (!analytics) return null;

  const maxStatus = Math.max(...(analytics.ordersByStatus?.map((s) => s.count) || [1]));

  return (
    <div className="admin-overview">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Analytics Overview</h4>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onRefresh}>
          Refresh
        </button>
      </div>

      <div className="row g-3 mb-4">
        <StatCard label="Total Revenue" value={formatMoney(analytics.totalRevenue)} color="success" />
        <StatCard label="Total Orders" value={analytics.totalOrders} sub={`Avg ${formatMoney(analytics.averageOrderValue)}`} color="primary" />
        <StatCard label="Registered Users" value={analytics.totalUsers} sub={`${analytics.totalAdmins} admins`} color="info" />
        <StatCard label="Menu Items" value={analytics.totalFoods} color="warning" />
      </div>

      <div className="row g-3 mb-4">
        <StatCard label="Pending" value={analytics.pendingOrders} color="warning" />
        <StatCard label="In Progress" value={analytics.activeOrders} color="info" />
        <StatCard label="Delivered" value={analytics.deliveredOrders} color="success" />
        <StatCard label="Cancelled" value={analytics.cancelledOrders} color="danger" />
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white">
              <strong>Orders &amp; Revenue (Last 7 Days)</strong>
            </div>
            <div className="card-body">
              <p className="small text-muted mb-2">Orders (bars)</p>
              <BarChart data={analytics.last7Days || []} valueKey="count" />
              <hr />
              <p className="small text-muted mb-2">Revenue (bars)</p>
              <BarChart
                data={analytics.last7Days || []}
                valueKey="revenue"
                formatValue={formatMoney}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white">
              <strong>Orders by Status</strong>
            </div>
            <div className="card-body">
              {(analytics.ordersByStatus || []).map((s) => (
                <div key={s.status} className="mb-3">
                  <div className="d-flex justify-content-between small mb-1">
                    <span>{s.status}</span>
                    <span>{s.count}</span>
                  </div>
                  <div className="progress" style={{ height: 8 }}>
                    <div
                      className="progress-bar bg-warning"
                      style={{ width: `${(s.count / maxStatus) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-header bg-white">
              <strong>Top Selling Items</strong>
            </div>
            <ul className="list-group list-group-flush">
              {(analytics.topProducts || []).length === 0 ? (
                <li className="list-group-item text-muted">No sales data yet</li>
              ) : (
                analytics.topProducts.map((p, i) => (
                  <li key={p.productName} className="list-group-item d-flex justify-content-between">
                    <span>
                      <span className="badge bg-secondary me-2">{i + 1}</span>
                      {p.productName}
                    </span>
                    <span className="text-muted small">
                      {p.quantitySold} sold · {formatMoney(p.revenue)}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 mt-4">
        <div className="card-header bg-white">
          <strong>Recent Orders</strong>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {(analytics.recentOrders || []).map((o) => (
                <tr key={o.id}>
                  <td>{o.orderNumber}</td>
                  <td>{o.customerName}</td>
                  <td>{formatMoney(o.totalAmount)}</td>
                  <td><span className="badge bg-secondary">{o.orderStatus}</span></td>
                  <td className="small text-muted">{o.createdAt?.replace("T", " ") || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
