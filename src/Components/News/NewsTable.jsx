import { useState } from "react";
import {
  FaEllipsisV,
  FaNewspaper,
  FaEdit,
  FaTrash,
  FaTimes,
  FaPlus,
  FaImage,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

import { newsTableData } from "./NewsTableData";

const emptyForm = {
  title: "",
  type: "Story",
  category: "Operations",
  author: "",
  description: "",
  location: "",
  date: "",
  keyHighlights: [""],
  images: [],
  status: "Draft",
};

export default function NewsTable() {
  const [newsItems, setNewsItems] = useState(newsTableData);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Multiple Images + SVG
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          resolve({
            name: file.name,
            type: file.type,
            url: reader.result,
          });
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newImages) => {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    });

    e.target.value = "";
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  // Highlights
  const handleHighlightChange = (index, value) => {
    setFormData((prev) => {
      const updatedHighlights = [...prev.keyHighlights];

      updatedHighlights[index] = value;

      return {
        ...prev,
        keyHighlights: updatedHighlights,
      };
    });
  };

  const addHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      keyHighlights: [...prev.keyHighlights, ""],
    }));
  };

  const removeHighlight = (index) => {
    setFormData((prev) => ({
      ...prev,
      keyHighlights: prev.keyHighlights.filter(
        (_, highlightIndex) => highlightIndex !== index,
      ),
    }));
  };

  // Add
  const handleAdd = () => {
    setEditingNews(null);
    setFormData(emptyForm);
    setShowForm(true);
    setOpenMenu(null);
  };

  // Edit
  const handleEdit = (news) => {
    setEditingNews(news);

    setFormData({
      title: news.title || "",
      type: news.type || "Story",
      category: news.category || "Operations",
      author: news.author || "",
      description: news.description || "",
      location: news.location || "",
      date: news.date || "",
      keyHighlights: news.keyHighlights?.length > 0 ? news.keyHighlights : [""],
      images: news.images || [],
      status: news.status || "Draft",
    });

    setShowForm(true);
    setOpenMenu(null);
  };

  // Delete
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this story?",
    );

    if (!confirmed) return;

    setNewsItems((prev) => prev.filter((news) => news.id !== id));

    setOpenMenu(null);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      keyHighlights: formData.keyHighlights.filter(
        (item) => item.trim() !== "",
      ),
    };

    if (editingNews) {
      setNewsItems((prev) =>
        prev.map((news) =>
          news.id === editingNews.id
            ? {
                ...news,
                ...cleanedData,
              }
            : news,
        ),
      );
    } else {
      const newNews = {
        id: Date.now(),
        ...cleanedData,
      };

      setNewsItems((prev) => [...prev, newNews]);
    }

    setFormData(emptyForm);
    setEditingNews(null);
    setShowForm(false);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingNews(null);
    setFormData(emptyForm);
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Stories & News</h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage DAFA stories, news updates, meetings, and publications.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <FaPlus size={12} />
            Add Story
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Story / News
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Type
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Author
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
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
              {newsItems.map((news) => (
                <tr key={news.id} className="transition hover:bg-slate-50">
                  {/* Story */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <FaNewspaper />
                      </div>

                      <p className="max-w-md text-sm font-semibold text-slate-800">
                        {news.title}
                      </p>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        news.type === "Meeting"
                          ? "bg-purple-50 text-purple-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {news.type}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {news.category}
                    </span>
                  </td>

                  {/* Author */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {news.author}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {news.date}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        news.status === "Published"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {news.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="relative px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(openMenu === news.id ? null : news.id)
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={`Actions for ${news.title}`}
                    >
                      <FaEllipsisV />
                    </button>

                    {openMenu === news.id && (
                      <div className="absolute right-6 top-14 z-20 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-lg">
                        <button
                          type="button"
                          onClick={() => handleEdit(news)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                        >
                          <FaEdit className="text-blue-500" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(news.id)}
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
          <div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {editingNews ? "Edit Story / News" : "Add Story / News"}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Create or update DAFA stories, meetings, and news content.
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

            <form onSubmit={handleSubmit} className="p-6">
              {/* Basic Information */}
              <div className="mb-8">
                <h4 className="mb-5 text-base font-bold text-slate-800">
                  Content Information
                </h4>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter story or meeting title"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Content Type
                    </label>

                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="Story">Story</option>
                      <option value="Meeting">Meeting</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Category
                    </label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="Operations">Operations</option>
                      <option value="Community">Community</option>
                      <option value="Projects">Projects</option>
                      <option value="Partnerships">Partnerships</option>
                      <option value="Awareness">Awareness</option>
                      <option value="Events">Events</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Author */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Author
                    </label>

                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="e.g. DAFA Communications"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FaCalendarAlt className="text-emerald-600" />
                      Date
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {/* Location */}
                  <div className="md:col-span-2">
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FaMapMarkerAlt className="text-emerald-600" />
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. DAFA Headquarters, Kabul"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="7"
                      placeholder="Write the full story or meeting description..."
                      required
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="mb-8 rounded-2xl border border-slate-200 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800">Key Highlights</h4>

                    <p className="mt-1 text-xs text-slate-500">
                      Add the important points from this story or meeting.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addHighlight}
                    className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                  >
                    <FaPlus size={10} />
                    Add Highlight
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.keyHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-3 text-emerald-600">
                        <FaCheckCircle size={14} />
                      </div>

                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) =>
                          handleHighlightChange(index, e.target.value)
                        }
                        placeholder={`Key highlight ${index + 1}`}
                        className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />

                      {formData.keyHighlights.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHighlight(index)}
                          className="mt-2 rounded-lg p-2 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <FaTimes size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Multiple Images */}
              <div className="mb-8 rounded-2xl border border-slate-200 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800">
                      Story / Meeting Images
                    </h4>

                    <p className="mt-1 text-xs text-slate-500">
                      Upload multiple JPG, PNG, WEBP, or SVG images.
                    </p>
                  </div>

                  <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100">
                    <FaImage />
                    Add Images
                    <input
                      type="file"
                      accept="image/*,.svg"
                      multiple
                      onChange={handleImagesChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {formData.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {formData.images.map((image, index) => (
                      <div
                        key={`${image.name}-${index}`}
                        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                      >
                        <img
                          src={image.url}
                          alt={image.name}
                          className="h-32 w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow transition group-hover:opacity-100"
                        >
                          <FaTimes size={11} />
                        </button>

                        <div className="truncate px-3 py-2 text-xs text-slate-500">
                          {image.name}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-dashed border-slate-200 px-6 py-10 text-center">
                    <FaImage className="mx-auto mb-3 text-3xl text-slate-300" />

                    <p className="text-sm font-medium text-slate-500">
                      No images added yet
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      You can upload multiple images, including SVG files.
                    </p>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="mb-8 rounded-2xl border border-slate-200 p-5">
                <h4 className="mb-4 font-bold text-slate-800">
                  Publication Status
                </h4>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      formData.status === "Published"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Published"
                      checked={formData.status === "Published"}
                      onChange={handleChange}
                      className="mr-2"
                    />

                    <span className="text-sm font-semibold text-slate-700">
                      Published
                    </span>
                  </label>

                  <label
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      formData.status === "Draft"
                        ? "border-amber-500 bg-amber-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Draft"
                      checked={formData.status === "Draft"}
                      onChange={handleChange}
                      className="mr-2"
                    />

                    <span className="text-sm font-semibold text-slate-700">
                      Draft
                    </span>
                  </label>
                </div>
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
                  {editingNews ? "Update Story" : "Add Story"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
