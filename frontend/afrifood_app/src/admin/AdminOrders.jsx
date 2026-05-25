import { useMemo, useState } from "react";
import { updateOrderStatus } from "./adminApi";

const ORDER_STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];

const AdminOrders = ({ orders, onOrdersChange }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = statusFilter === "ALL" || o.orderStatus === statusFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        String(o.orderNumber).includes(q) ||
        o.customerName?.toLowerCase().includes(q) ||
        o.customerEmail?.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [orders, search, statusFilter]);

  const handleStatusChange = async (orderId, status) => {
    try {
      const updated = await updateOrderStatus(orderId, status);
      onOrdersChange(orders.map((o) => (o.id === orderId ? updated : o)));
      if (selectedOrder?.id === orderId) setSelectedOrder(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="d-flex flex-wrap gap-2 mb-3">
        <input
          className="form-control"
          style={{ maxWidth: 280 }}
          placeholder="Search order #, customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          style={{ maxWidth: 200 }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span className="align-self-center text-muted small">{filtered.length} orders</span>
      </div>

      <div className="row g-3">
        <div className={selectedOrder ? "col-lg-7" : "col-12"}>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted">No orders found</td></tr>
                ) : (
                  filtered.map((order) => (
                    <tr
                      key={order.id}
                      className={selectedOrder?.id === order.id ? "table-active" : ""}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td>{order.orderNumber}</td>
                      <td>
                        <div>{order.customerName}</div>
                        <small className="text-muted">{order.customerEmail}</small>
                      </td>
                      <td>₦{order.totalAmount?.toLocaleString()}</td>
                      <td><span className="badge bg-secondary">{order.orderStatus}</span></td>
                      <td onClick={(e) => e.stopPropagation()}>
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
        </div>

        {selectedOrder && (
          <div className="col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white d-flex justify-content-between">
                <strong>Order #{selectedOrder.orderNumber}</strong>
                <button type="button" className="btn-close" onClick={() => setSelectedOrder(null)} />
              </div>
              <div className="card-body">
                <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
                <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                <p><strong>Address:</strong> {selectedOrder.shippingAddress}</p>
                <p><strong>Date:</strong> {selectedOrder.createdAt?.replace("T", " ") || "—"}</p>
                <hr />
                <h6>Items</h6>
                <ul className="list-group list-group-flush mb-3">
                  {(selectedOrder.items || []).map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between px-0">
                      <span>{item.productName} × {item.quantity}</span>
                      <span>₦{(item.lineTotal ?? item.price * item.quantity).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <p className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>₦{selectedOrder.subtotal?.toLocaleString()}</span>
                </p>
                <p className="d-flex justify-content-between">
                  <span>Delivery</span>
                  <span>₦{selectedOrder.deliveryFee?.toLocaleString()}</span>
                </p>
                <h5 className="d-flex justify-content-between">
                  <span>Total</span>
                  <span>₦{selectedOrder.totalAmount?.toLocaleString()}</span>
                </h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
