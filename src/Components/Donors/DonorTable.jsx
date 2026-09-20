import { useState } from "react";
import {
  FaEllipsisV,
  FaHandHoldingHeart,
  FaEdit,
  FaTrash,
  FaTimes,
  FaPlus,
  FaImage,
} from "react-icons/fa";

import { donorTableData } from "./DonorTableData";

const emptyForm = {
  name: "",
  shortName: "",
  logo: "",
  type: "UN Agency",
  projects: 0,
  contact: "",
  status: "Active",
  about: "",
  partnership: "",
};

export default function DonorTable() {
  const [donors, setDonors] = useState(donorTableData);
  const [showForm, setShowForm] = useState(false);
  const [editingDonor, setEditingDonor] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        logo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setFormData((prev) => ({
      ...prev,
      logo: "",
    }));
  };

  const handleAdd = () => {
    setEditingDonor(null);
    setFormData(emptyForm);
    setShowForm(true);
    setOpenMenu(null);
  };

  const handleEdit = (donor) => {
    setEditingDonor(donor);

    setFormData({
      name: donor.name || "",
      shortName: donor.shortName || "",
      logo: donor.logo || "",
      type: donor.type || "UN Agency",
      projects: donor.projects || 0,
      contact: donor.contact || "",
      status: donor.status || "Active",
      about: donor.about || "",
      partnership: donor.partnership || "",
    });

    setShowForm(true);
    setOpenMenu(null);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this donor?",
    );

    if (!confirmed) return;

    setDonors((prev) => prev.filter((donor) => donor.id !== id));

    setOpenMenu(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const donorData = {
      ...formData,
      projects: Number(formData.projects),
    };

    if (editingDonor) {
      setDonors((prev) =>
        prev.map((donor) =>
          donor.id === editingDonor.id
            ? {
                ...donor,
                ...donorData,
              }
            : donor,
        ),
      );
    } else {
      const newDonor = {
        id: Date.now(),
        ...donorData,
      };

      setDonors((prev) => [...prev, newDonor]);
    }

    setFormData(emptyForm);
    setEditingDonor(null);
    setShowForm(false);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingDonor(null);
    setFormData(emptyForm);
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Donors & Partners
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage DAFA donors, partners, and supported projects.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <FaPlus size={12} />
            Add Donor
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Donor / Partner
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Type
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Projects
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Contact
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {donors.map((donor) => (
                <tr key={donor.id} className="transition hover:bg-slate-50">
                  {/* Donor */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {donor.logo ? (
                        <img
                          src={donor.logo}
                          alt={donor.name}
                          className="h-10 w-10 rounded-xl border border-slate-100 bg-white object-contain p-1"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                          <FaHandHoldingHeart />
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {donor.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {donor.shortName}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {donor.type}
                  </td>

                  {/* Projects */}
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {donor.projects}
                    </span>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {donor.contact}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        donor.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {donor.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="relative px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(openMenu === donor.id ? null : donor.id)
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={`Actions for ${donor.name}`}
                    >
                      <FaEllipsisV />
                    </button>

                    {openMenu === donor.id && (
                      <div className="absolute right-6 top-14 z-20 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-lg">
                        <button
                          type="button"
                          onClick={() => handleEdit(donor)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                        >
                          <FaEdit className="text-blue-500" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(donor.id)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {editingDonor
                    ? "Edit Donor / Partner"
                    : "Add Donor / Partner"}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {editingDonor
                    ? "Update donor and partnership information."
                    : "Add a new donor or implementation partner."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <FaTimes />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Logo */}
              <div className="mb-7 rounded-2xl border border-slate-200 p-5">
                <h4 className="mb-4 font-bold text-slate-800">
                  Donor / Partner Logo
                </h4>

                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <div className="relative">
                    {formData.logo ? (
                      <img
                        src={formData.logo}
                        alt="Donor logo preview"
                        className="h-24 w-24 rounded-2xl border border-slate-200 bg-white object-contain p-2"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <FaImage size={30} />
                      </div>
                    )}

                    {formData.logo && (
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600"
                      >
                        <FaTimes size={11} />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      <FaImage className="text-emerald-600" />
                      Upload Logo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>

                    <p className="mt-2 text-xs text-slate-400">
                      JPG, PNG or WEBP. Transparent PNG recommended.
                    </p>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="mb-7">
                <h4 className="mb-4 font-bold text-slate-800">
                  Donor Information
                </h4>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Donor / Partner Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter organization name"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {/* Short Name */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Short Name
                    </label>

                    <input
                      type="text"
                      name="shortName"
                      value={formData.shortName}
                      onChange={handleChange}
                      placeholder="e.g. UNMAS"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Organization Type
                    </label>

                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="UN Agency">UN Agency</option>
                      <option value="Government Organization">
                        Government Organization
                      </option>
                      <option value="International Organization">
                        International Organization
                      </option>
                      <option value="NGO">NGO</option>
                      <option value="Private Organization">
                        Private Organization
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Projects */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Supported Projects
                    </label>

                    <input
                      type="number"
                      name="projects"
                      value={formData.projects}
                      onChange={handleChange}
                      min="0"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Contact Email
                    </label>

                    <input
                      type="email"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="organization@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Status
                    </label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="mb-7">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  About Donor / Partner
                </label>

                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write a short description about the organization..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Partnership */}
              <div className="mb-7">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Partnership / Support
                </label>

                <textarea
                  name="partnership"
                  value={formData.partnership}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe the partnership or support provided..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  {editingDonor ? "Update Donor" : "Add Donor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
