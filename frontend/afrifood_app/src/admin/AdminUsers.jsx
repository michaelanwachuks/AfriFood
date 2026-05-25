import { useState } from "react";
import { updateUserRole } from "./adminApi";

const AdminUsers = ({ users, onUsersChange }) => {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
  });

  const handleRoleChange = async (userId, role) => {
    try {
      const updated = await updateUserRole(userId, role);
      onUsersChange(users.map((u) => (u.id === userId ? updated : u)));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <input
        className="form-control mb-3"
        style={{ maxWidth: 320 }}
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone || "—"}</td>
                <td>
                  <span className={`badge ${u.role === "ADMIN" ? "bg-danger" : "bg-primary"}`}>
                    {u.role}
                  </span>
                </td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    style={{ maxWidth: 140 }}
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
