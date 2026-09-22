import { useState } from "react";
import {
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaProjectDiagram,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaTimes,
  FaPlus,
  FaSave,
} from "react-icons/fa";

import { coverageAreaData } from "../Components/Coverage/CoverageAreaData";

export default function CoverageArea() {
  const [provinces, setProvinces] = useState(coverageAreaData);
  const [showForm, setShowForm] = useState(false);
  const [editingProvince, setEditingProvince] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const emptyForm = {
    province: "",
    clearanceArea: "",
    unit: "m²",
    projects: "",
    communities: "",
    status: "Covered",
  };

  const [formData, setFormData] = useState(emptyForm);

  // Automatically calculate total clearance area
  const totalClearanceArea = provinces.reduce(
    (total, province) => total + Number(province.clearanceArea || 0),
    0,
  );

  // Automatically calculate total projects
  const totalProjects = provinces.reduce(
    (total, province) => total + Number(province.projects || 0),
    0,
  );

  const formatNumber = (number) => {
    return Number(number || 0).toLocaleString();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    setEditingProvince(null);
    setFormData(emptyForm);
    setShowForm(true);
    setOpenMenu(null);
  };

  const handleEdit = (province) => {
    setEditingProvince(province);

    setFormData({
      province: province.province,
      clearanceArea: province.clearanceArea,
      unit: province.unit,
      projects: province.projects,
      communities: province.communities,
      status: province.status,
    });

    setShowForm(true);
    setOpenMenu(null);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this province?",
    );

    if (!confirmed) return;

    setProvinces((prev) => prev.filter((province) => province.id !== id));

    setOpenMenu(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.province.trim()) {
      alert("Please enter a province name.");
      return;
    }

    if (formData.clearanceArea === "" || Number(formData.clearanceArea) < 0) {
      alert("Please enter a valid clearance area.");
      return;
    }

    if (editingProvince) {
      // Update existing province
      setProvinces((prev) =>
        prev.map((province) =>
          province.id === editingProvince.id
            ? {
                ...province,
                province: formData.province,
                clearanceArea: Number(formData.clearanceArea),
                unit: formData.unit,
                projects: Number(formData.projects) || 0,
                communities: Number(formData.communities) || 0,
                status: formData.status,
              }
            : province,
        ),
      );
    } else {
      // Add new province
      const newProvince = {
        id: Date.now(),
        province: formData.province,
        clearanceArea: Number(formData.clearanceArea),
        unit: formData.unit,
        projects: Number(formData.projects) || 0,
        communities: Number(formData.communities) || 0,
        status: formData.status,
      };

      setProvinces((prev) => [...prev, newProvince]);
    }

    setShowForm(false);
    setEditingProvince(null);
    setFormData(emptyForm);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-emerald-600">
            <FaMapMarkedAlt />

            <span className="text-sm font-semibold">DAFA Coverage Network</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Coverage Area</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage DAFA's operational coverage and clearance activities.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <FaPlus />
          Add Province
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Covered Provinces */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <FaMapMarkedAlt />
          </div>

          <p className="text-sm text-slate-500">Covered Provinces</p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {provinces.length}
          </h2>

          <p className="mt-1 text-xs text-emerald-600">Active coverage areas</p>
        </div>

        {/* Total Clearance Area */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FaMapMarkedAlt />
          </div>

          <p className="text-sm text-slate-500">Total Clearance Area</p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {formatNumber(totalClearanceArea)}
          </h2>

          <p className="mt-1 text-xs text-blue-600">Square meters</p>
        </div>

        {/* Total Projects */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <FaProjectDiagram />
          </div>

          <p className="text-sm text-slate-500">Total Projects</p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {formatNumber(totalProjects)}
          </h2>

          <p className="mt-1 text-xs text-orange-600">
            Projects across covered areas
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h2 className="flex items-center gap-2 font-semibold text-slate-900">
            <FaMapMarkedAlt className="text-emerald-600" />
            Afghanistan Coverage Map
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Overview of DAFA operational coverage areas.
          </p>
        </div>

        <div className="flex min-h-[260px] items-center justify-center bg-slate-50 p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
              <FaMapMarkedAlt />
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              Afghanistan Coverage Map
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Interactive province mapping can be connected here later.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              {provinces.length} Provinces Covered
            </div>
          </div>
        </div>
      </div>

      {/* Provinces */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900">Covered Provinces</h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage clearance area and project information by province.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {provinces.map((province) => (
            <div
              key={province.id}
              className="relative rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:shadow-sm"
            >
              {/* Action Menu */}
              <div className="absolute right-3 top-3">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === province.id ? null : province.id)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <FaEllipsisV />
                </button>

                {openMenu === province.id && (
                  <div className="absolute right-0 top-9 z-20 w-32 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                    <button
                      onClick={() => handleEdit(province)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      <FaEdit className="text-emerald-600" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(province.id)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Province */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <FaMapMarkerAlt />
                </div>

                <div className="pr-6">
                  <h3 className="font-semibold text-slate-800">
                    {province.province}
                  </h3>

                  <span className="text-xs text-emerald-600">
                    {province.status}
                  </span>
                </div>
              </div>

              {/* Clearance Area */}
              <div className="mt-4 rounded-xl bg-emerald-50 p-3">
                <p className="text-xs font-medium text-emerald-700">
                  Clearance Area
                </p>

                <p className="mt-1 text-lg font-bold text-emerald-800">
                  {formatNumber(province.clearanceArea)}{" "}
                  <span className="text-xs font-medium">{province.unit}</span>
                </p>
              </div>

              {/* Province Projects */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <p className="text-xs text-slate-400">Projects</p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {province.projects}
                  </p>
                </div>

                <div>
                  <p className="text-right text-xs text-slate-400">
                    Communities
                  </p>

                  <p className="mt-1 text-right font-semibold text-slate-700">
                    {province.communities}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingProvince ? "Edit Province" : "Add Province"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Enter province coverage information.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingProvince(null);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <FaTimes />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Province */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Province
                  </label>

                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    placeholder="e.g. Kabul"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* Clearance Area */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Clearance Area
                  </label>

                  <input
                    type="number"
                    name="clearanceArea"
                    value={formData.clearanceArea}
                    onChange={handleChange}
                    placeholder="e.g. 125000"
                    min="0"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Unit
                  </label>

                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="m²">m²</option>
                    <option value="km²">km²</option>
                    <option value="hectares">Hectares</option>
                  </select>
                </div>

                {/* Projects */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Projects
                  </label>

                  <input
                    type="number"
                    name="projects"
                    value={formData.projects}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* Communities */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Communities
                  </label>

                  <input
                    type="number"
                    name="communities"
                    value={formData.communities}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="Covered">Covered</option>
                    <option value="Active">Active</option>
                    <option value="Planning">Planning</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProvince(null);
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <FaSave />

                  {editingProvince ? "Save Changes" : "Add Province"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
