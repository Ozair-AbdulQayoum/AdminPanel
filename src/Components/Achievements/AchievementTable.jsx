import { useState } from "react";
import {
  FaEllipsisV,
  FaTrophy,
  FaTimes,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { achievementTableData } from "./AchievementTableData";

export default function AchievementTable() {
  const [achievements, setAchievements] = useState(achievementTableData);

  const [showForm, setShowForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    value: "",
    category: "",
    year: "",
    status: "Published",
  });

  // Open Add Form
  const handleAdd = () => {
    setEditingAchievement(null);

    setFormData({
      title: "",
      value: "",
      category: "",
      year: "",
      status: "Published",
    });

    setShowForm(true);
    setOpenMenu(null);
  };

  // Open Edit Form
  const handleEdit = (achievement) => {
    setEditingAchievement(achievement);

    setFormData({
      title: achievement.title,
      value: achievement.value,
      category: achievement.category,
      year: achievement.year,
      status: achievement.status,
    });

    setShowForm(true);
    setOpenMenu(null);
  };

  // Form change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add / Update
  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingAchievement) {
      setAchievements((prev) =>
        prev.map((achievement) =>
          achievement.id === editingAchievement.id
            ? {
                ...achievement,
                ...formData,
              }
            : achievement,
        ),
      );
    } else {
      const newAchievement = {
        id: Date.now(),
        ...formData,
      };

      setAchievements((prev) => [newAchievement, ...prev]);
    }

    setShowForm(false);
    setEditingAchievement(null);
  };

  // Delete
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this achievement?",
    );

    if (!confirmed) return;

    setAchievements((prev) =>
      prev.filter((achievement) => achievement.id !== id),
    );

    setOpenMenu(null);
  };

  return (
    <>
      {/* Main Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Achievements</h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage DAFA achievements and impact statistics.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            + Add Achievement
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Achievement
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Value
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Year
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {achievements.map((achievement) => (
                <tr
                  key={achievement.id}
                  className="transition hover:bg-slate-50"
                >
                  {/* Achievement */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                        <FaTrophy />
                      </div>

                      <p className="text-sm font-semibold text-slate-800">
                        {achievement.title}
                      </p>
                    </div>
                  </td>

                  {/* Value */}
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">
                    {achievement.value}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {achievement.category}
                  </td>

                  {/* Year */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {achievement.year}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        achievement.status === "Published"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {achievement.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="relative px-6 py-4">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === achievement.id ? null : achievement.id,
                        )
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={`Actions for ${achievement.title}`}
                    >
                      <FaEllipsisV />
                    </button>

                    {/* Action Menu */}
                    {openMenu === achievement.id && (
                      <div className="absolute right-6 top-14 z-20 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                        <button
                          type="button"
                          onClick={() => handleEdit(achievement)}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                        >
                          <FaEdit className="text-emerald-600" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(achievement.id)}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {achievements.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No achievements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingAchievement ? "Edit Achievement" : "Add Achievement"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingAchievement
                    ? "Update achievement information."
                    : "Add a new DAFA achievement."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <FaTimes />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Achievement
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Land Cleared of Explosive Hazards"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Value */}
              <div>
                <label
                  htmlFor="value"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Value
                </label>

                <input
                  id="value"
                  name="value"
                  type="text"
                  value={formData.value}
                  onChange={handleChange}
                  placeholder="e.g. 1.98M"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Category + Year */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Category
                  </label>

                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Mine Action"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="year"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Year
                  </label>

                  <input
                    id="year"
                    name="year"
                    type="number"
                    min="2000"
                    max="2100"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2026"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  {editingAchievement
                    ? "Update Achievement"
                    : "Add Achievement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
