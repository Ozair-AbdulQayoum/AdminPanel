import { useState } from "react";
import {
  FaUserTie,
  FaGraduationCap,
  FaBriefcase,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaTimes,
  FaPlus,
  FaCamera,
} from "react-icons/fa";

import { staffTableData } from "./StaffTableData";

const emptyForm = {
  name: "",
  photo: "",
  position: "",
  department: "",
  location: "",
  email: "",
  status: "Active",
  about: "",
  roleResponsibilities: "",
  educationTraining: "",
  careerProfile: "",
};

export default function StaffTable() {
  const [staffMembers, setStaffMembers] = useState(staffTableData);
  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      photo: "",
    }));
  };

  const handleAdd = () => {
    setEditingStaff(null);
    setFormData(emptyForm);
    setShowForm(true);
    setOpenMenu(null);
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff);

    setFormData({
      name: staff.name || "",
      photo: staff.photo || "",
      position: staff.position || "",
      department: staff.department || "",
      location: staff.location || "",
      email: staff.email || "",
      status: staff.status || "Active",
      about: staff.about || "",
      roleResponsibilities: staff.roleResponsibilities || "",
      educationTraining: staff.educationTraining || "",
      careerProfile: staff.careerProfile || "",
    });

    setShowForm(true);
    setOpenMenu(null);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this staff member?",
    );

    if (!confirmed) return;

    setStaffMembers((prev) => prev.filter((staff) => staff.id !== id));

    setOpenMenu(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingStaff) {
      setStaffMembers((prev) =>
        prev.map((staff) =>
          staff.id === editingStaff.id
            ? {
                ...staff,
                ...formData,
              }
            : staff,
        ),
      );
    } else {
      const newStaff = {
        id: Date.now(),
        ...formData,
      };

      setStaffMembers((prev) => [...prev, newStaff]);
    }

    setFormData(emptyForm);
    setEditingStaff(null);
    setShowForm(false);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingStaff(null);
    setFormData(emptyForm);
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Staff Members</h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage DAFA staff members and professional profiles.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <FaPlus size={12} />
          Add Staff
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Staff Member
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Position
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Department
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Location
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {staffMembers.map((staff) => (
                <tr key={staff.id} className="transition hover:bg-slate-50">
                  {/* Staff Member */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {staff.photo ? (
                        <img
                          src={staff.photo}
                          alt={staff.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <FaUserTie />
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-slate-800">
                          {staff.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          Staff ID #{staff.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {staff.position}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {staff.department}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {staff.location}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {staff.email}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        staff.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : staff.status === "On Leave"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {staff.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="relative px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === staff.id ? null : staff.id)
                      }
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <FaEllipsisV />
                    </button>

                    {openMenu === staff.id && (
                      <div className="absolute right-6 top-14 z-20 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-lg">
                        <button
                          onClick={() => handleEdit(staff)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                        >
                          <FaEdit className="text-blue-500" />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(staff.id)}
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
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {editingStaff ? "Edit Staff Member" : "Add Staff Member"}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {editingStaff
                    ? "Update staff member information and professional profile."
                    : "Add a new staff member and professional profile."}
                </p>
              </div>

              <button
                onClick={handleClose}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Photo */}
              <div className="mb-8 rounded-2xl border border-slate-200 p-5">
                <h4 className="mb-4 font-bold text-slate-800">Staff Photo</h4>

                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <div className="relative">
                    {formData.photo ? (
                      <img
                        src={formData.photo}
                        alt="Staff preview"
                        className="h-24 w-24 rounded-full border-4 border-slate-100 object-cover"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <FaUserTie size={32} />
                      </div>
                    )}

                    {formData.photo && (
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                      >
                        <FaTimes size={11} />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      <FaCamera className="text-emerald-600" />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>

                    <p className="mt-2 text-xs text-slate-400">
                      JPG, PNG or WEBP. Recommended square image.
                    </p>
                  </div>
                </div>
              </div>

              {/* Staff Information */}
              <div className="mb-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <FaUserTie />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800">
                      Staff Information
                    </h4>

                    <p className="text-xs text-slate-500">
                      Basic staff member information
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Position
                    </label>

                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="e.g. Project Manager"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Department
                    </label>

                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="e.g. Programs"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Kabul"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="staff@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* About */}
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    About
                  </label>

                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Write a short professional introduction..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="mb-8 rounded-2xl border border-slate-200 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <FaBriefcase />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800">
                      Role & Responsibilities
                    </h4>

                    <p className="text-xs text-slate-500">
                      Describe the staff member's responsibilities
                    </p>
                  </div>
                </div>

                <textarea
                  name="roleResponsibilities"
                  value={formData.roleResponsibilities}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Describe role and responsibilities..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Education */}
              <div className="mb-8 rounded-2xl border border-slate-200 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <FaGraduationCap />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800">
                      Education & Training
                    </h4>

                    <p className="text-xs text-slate-500">
                      Add educational background and professional training
                    </p>
                  </div>
                </div>

                <textarea
                  name="educationTraining"
                  value={formData.educationTraining}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Add education, certifications, and training..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Career */}
              <div className="mb-8 rounded-2xl border border-slate-200 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                    <FaBriefcase />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800">
                      Career Professional Profile
                    </h4>

                    <p className="text-xs text-slate-500">
                      Add professional experience and career background
                    </p>
                  </div>
                </div>

                <textarea
                  name="careerProfile"
                  value={formData.careerProfile}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Describe professional experience and career background..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
                  className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {editingStaff ? "Update Staff" : "Add Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
