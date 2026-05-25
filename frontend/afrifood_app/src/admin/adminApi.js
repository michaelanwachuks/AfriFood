const request = async (url, options = {}) => {
  const res = await fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  if (res.status === 204) return null;
  return res.json();
};

export const fetchAnalytics = () => request("/api/admin/analytics");
export const fetchOrders = () => request("/api/admin/orders");
export const fetchOrder = (id) => request(`/api/admin/orders/${id}`);
export const updateOrderStatus = (id, status) =>
  request(`/api/admin/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
export const fetchUsers = () => request("/api/admin/users");
export const updateUserRole = (id, role) =>
  request(`/api/admin/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
export const fetchFoods = () => request("/api/admin/foods");
export const createFood = (data) =>
  request("/api/admin/foods", { method: "POST", body: JSON.stringify(data) });
export const updateFood = (id, data) =>
  request(`/api/admin/foods/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteFood = (id) =>
  request(`/api/admin/foods/${id}`, { method: "DELETE" });
export const toggleFoodAvailability = (id, available) =>
  request(`/api/admin/foods/${id}/availability`, {
    method: "PATCH",
    body: JSON.stringify({ available }),
  });
