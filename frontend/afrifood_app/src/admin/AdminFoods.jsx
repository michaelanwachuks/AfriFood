import { useState } from "react";
import { createFood, deleteFood, toggleFoodAvailability, updateFood } from "./adminApi";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  category: "",
  countryOfOrigin: "",
  available: true,
};

const AdminFoods = ({ foods, onFoodsChange }) => {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = foods.filter((f) => {
    const q = search.toLowerCase();
    return !q || f.name?.toLowerCase().includes(q) || f.countryOfOrigin?.toLowerCase().includes(q);
  });

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (food) => {
    setEditingId(food.id);
    setForm({
      name: food.name || "",
      description: food.description || "",
      price: String(food.price ?? ""),
      imageUrl: food.imageUrl || "",
      category: food.category || "",
      countryOfOrigin: food.countryOfOrigin || "",
      available: food.available !== false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: parseFloat(form.price),
      available: form.available,
    };

    try {
      if (editingId) {
        const updated = await updateFood(editingId, payload);
        onFoodsChange(foods.map((f) => (f.id === editingId ? updated : f)));
      } else {
        const created = await createFood(payload);
        onFoodsChange([...foods, created]);
      }
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;
    try {
      await deleteFood(id);
      onFoodsChange(foods.filter((f) => f.id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggle = async (id, available) => {
    try {
      const updated = await toggleFoodAvailability(id, available);
      onFoodsChange(foods.map((f) => (f.id === id ? updated : f)));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="row g-4">
      <div className="col-lg-5">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white">
            <strong>{editingId ? "Edit Menu Item" : "Add Menu Item"}</strong>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">Name *</label>
                <input className="form-control" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="mb-2">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={2} value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="row g-2">
                <div className="col-6">
                  <label className="form-label">Price (₦) *</label>
                  <input type="number" min="0" step="1" className="form-control" required
                    value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="col-6">
                  <label className="form-label">Country</label>
                  <input className="form-control" value={form.countryOfOrigin}
                    onChange={(e) => setForm({ ...form, countryOfOrigin: e.target.value })} />
                </div>
              </div>
              <div className="mb-2 mt-2">
                <label className="form-label">Category</label>
                <input className="form-control" placeholder="Rice Dishes, Grills..."
                  value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </div>
              <div className="mb-2">
                <label className="form-label">Image filename</label>
                <input className="form-control" placeholder="jollof.jpg"
                  value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
              </div>
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="avail"
                  checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} />
                <label className="form-check-label" htmlFor="avail">Available on menu</label>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-warning">
                  {editingId ? "Update" : "Add Item"}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-lg-7">
        <input
          className="form-control mb-3"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.id}>
                  <td>
                    <div>{f.name}</div>
                    <small className="text-muted">{f.category}</small>
                  </td>
                  <td>{f.countryOfOrigin}</td>
                  <td>₦{f.price?.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${f.available ? "bg-success" : "bg-secondary"}`}>
                      {f.available ? "Available" : "Hidden"}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button type="button" className="btn btn-outline-primary" onClick={() => handleEdit(f)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => handleToggle(f.id, !f.available)}
                      >
                        {f.available ? "Hide" : "Show"}
                      </button>
                      <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(f.id)}>
                        Del
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFoods;
