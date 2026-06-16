import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faBox,
  faCircleCheck,
  faCircleXmark,
  faClock,
  faFire,
  faMoneyBillWave,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatMoney = (n) => `₦${(n ?? 0).toLocaleString()}`;

const formatShortDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
};

const STATUS_COLORS = {
  PENDING: "#F59E0B",
  CONFIRMED: "#3B82F6",
  PREPARING: "#8B5CF6",
  OUT_FOR_DELIVERY: "#06B6D4",
  DELIVERED: "#10B981",
  CANCELLED: "#EF4444",
  UNKNOWN: "#94A3B8",
};

const STAT_CARDS = [
  {
    key: "revenue",
    label: "Total Revenue",
    icon: faMoneyBillWave,
    gradient: "linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%)",
    getValue: (a) => formatMoney(a.totalRevenue),
    getSub: () => "All-time earnings",
  },
  {
    key: "orders",
    label: "Total Orders",
    icon: faBox,
    gradient: "linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #FBBF24 100%)",
    getValue: (a) => a.totalOrders,
    getSub: (a) => `Avg ${formatMoney(a.averageOrderValue)}`,
  },
  {
    key: "users",
    label: "Registered Users",
    icon: faUsers,
    gradient: "linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%)",
    getValue: (a) => a.totalUsers,
    getSub: (a) => `${a.totalAdmins} admin accounts`,
  },
  {
    key: "foods",
    label: "Menu Items",
    icon: faUtensils,
    gradient: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 50%, #A78BFA 100%)",
    getValue: (a) => a.totalFoods,
    getSub: () => "Active catalog",
  },
];

const PIPELINE_CARDS = [
  {
    key: "pending",
    label: "Pending",
    icon: faClock,
    gradient: "linear-gradient(135deg, #B45309, #F59E0B)",
    getValue: (a) => a.pendingOrders,
  },
  {
    key: "active",
    label: "In Progress",
    icon: faFire,
    gradient: "linear-gradient(135deg, #0E7490, #06B6D4)",
    getValue: (a) => a.activeOrders,
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: faCircleCheck,
    gradient: "linear-gradient(135deg, #047857, #10B981)",
    getValue: (a) => a.deliveredOrders,
  },
  {
    key: "cancelled",
    label: "Cancelled",
    icon: faCircleXmark,
    gradient: "linear-gradient(135deg, #B91C1C, #EF4444)",
    getValue: (a) => a.cancelledOrders,
  },
];

const StatCard = ({ label, value, sub, icon, gradient }) => (
  <div className="col-md-6 col-xl-3">
    <div className="admin-stat-card" style={{ background: gradient }}>
      <div className="admin-stat-card__glow" />
      <div className="admin-stat-card__content">
        <div className="admin-stat-card__icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div>
          <p className="admin-stat-card__label">{label}</p>
          <h3 className="admin-stat-card__value">{value}</h3>
          {sub && <p className="admin-stat-card__sub">{sub}</p>}
        </div>
      </div>
    </div>
  </div>
);

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="admin-chart-tooltip">
      <p className="admin-chart-tooltip__label">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.name === "Revenue" ? formatMoney(entry.value) : entry.value}
        </p>
      ))}
    </div>
  );
};

const AdminOverview = ({ analytics, onRefresh }) => {
  if (!analytics) return null;

  const chartData = (analytics.last7Days || []).map((d) => ({
    ...d,
    day: formatShortDate(d.date),
  }));

  const statusData = (analytics.ordersByStatus || []).map((s) => ({
    name: s.status,
    value: s.count,
    fill: STATUS_COLORS[s.status] || STATUS_COLORS.UNKNOWN,
  }));

  const topProductsData = (analytics.topProducts || []).map((p) => ({
    name: p.productName?.length > 18 ? `${p.productName.slice(0, 18)}…` : p.productName,
    fullName: p.productName,
    sold: p.quantitySold,
    revenue: p.revenue,
  }));

  const getStatusBadgeClass = (status) => {
    const map = {
      PENDING: "status-pending",
      CONFIRMED: "status-confirmed",
      PREPARING: "status-preparing",
      OUT_FOR_DELIVERY: "status-delivery",
      DELIVERED: "status-delivered",
      CANCELLED: "status-cancelled",
    };
    return `admin-status-badge ${map[status] || ""}`;
  };

  return (
    <div className="admin-overview">
      <div className="admin-overview-header">
        <div>
          <h4 className="mb-1">Analytics Overview</h4>
          <p className="text-muted small mb-0">Real-time insights for your AfriFood business</p>
        </div>
        <button type="button" className="btn admin-btn-refresh" onClick={onRefresh}>
          <FontAwesomeIcon icon={faArrowRotateRight} className="me-2" />
          Refresh data
        </button>
      </div>

      <div className="row g-3 mb-4">
        {STAT_CARDS.map((card) => (
          <StatCard
            key={card.key}
            label={card.label}
            icon={card.icon}
            gradient={card.gradient}
            value={card.getValue(analytics)}
            sub={card.getSub(analytics)}
          />
        ))}
      </div>

      <div className="row g-3 mb-4">
        {PIPELINE_CARDS.map((card) => (
          <StatCard
            key={card.key}
            label={card.label}
            icon={card.icon}
            gradient={card.gradient}
            value={card.getValue(analytics)}
          />
        ))}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="admin-chart-card">
            <div className="admin-chart-card__header">
              <div>
                <h5 className="mb-0">Orders &amp; Revenue</h5>
                <span className="text-muted small">Last 7 days performance</span>
              </div>
              <span className="admin-chart-legend-dot orders" /> Orders
              <span className="admin-chart-legend-dot revenue ms-3" /> Revenue
            </div>
            <div className="admin-chart-card__body">
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#64748B" }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "#64748B" }} allowDecimals={false} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12, fill: "#64748B" }}
                    tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="count"
                    name="Orders"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    fill="url(#colorOrders)"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#10B981"
                    strokeWidth={3}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="admin-chart-card h-100">
            <div className="admin-chart-card__header">
              <h5 className="mb-0">Orders by Status</h5>
            </div>
            <div className="admin-chart-card__body">
              {statusData.length === 0 ? (
                <p className="text-muted text-center py-5">No order data yet</p>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="admin-pie-legend">
                    {statusData.map((s) => (
                      <div key={s.name} className="admin-pie-legend__item">
                        <span className="admin-pie-legend__dot" style={{ background: s.fill }} />
                        <span className="admin-pie-legend__label">{s.name}</span>
                        <span className="admin-pie-legend__value">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="admin-chart-card">
            <div className="admin-chart-card__header">
              <h5 className="mb-0">Top Selling Items</h5>
              <span className="text-muted small">By quantity sold</span>
            </div>
            <div className="admin-chart-card__body">
              {topProductsData.length === 0 ? (
                <p className="text-muted text-center py-5">No sales data yet</p>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={topProductsData} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 12, fill: "#64748B" }} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tick={{ fontSize: 11, fill: "#64748B" }}
                    />
                    <Tooltip
                      formatter={(value, name) =>
                        name === "revenue" ? formatMoney(value) : value
                      }
                      labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName}
                    />
                    <Bar dataKey="sold" name="Sold" radius={[0, 8, 8, 0]} fill="#8B5CF6" barSize={18} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="admin-chart-card">
            <div className="admin-chart-card__header">
              <h5 className="mb-0">Revenue by Item</h5>
              <span className="text-muted small">Top performers</span>
            </div>
            <div className="admin-chart-card__body">
              {topProductsData.length === 0 ? (
                <p className="text-muted text-center py-5">No sales data yet</p>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={topProductsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748B" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748B" }} tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      formatter={(value) => formatMoney(value)}
                      labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName}
                    />
                    <Bar dataKey="revenue" name="Revenue" radius={[8, 8, 0, 0]} fill="#10B981" barSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="admin-chart-card">
        <div className="admin-chart-card__header">
          <h5 className="mb-0">Recent Orders</h5>
        </div>
        <div className="table-responsive">
          <table className="table admin-table mb-0">
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
                  <td><strong>#{o.orderNumber}</strong></td>
                  <td>{o.customerName}</td>
                  <td className="text-success fw-semibold">{formatMoney(o.totalAmount)}</td>
                  <td>
                    <span className={getStatusBadgeClass(o.orderStatus)}>{o.orderStatus}</span>
                  </td>
                  <td className="text-muted small">{o.createdAt?.replace("T", " ") || "—"}</td>
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
