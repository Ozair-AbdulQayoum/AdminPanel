import { useEffect, useState } from "react";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaBullseye,
  FaTasks,
  FaPlus,
  FaTrash,
  FaImage,
  FaUpload,
} from "react-icons/fa";

import { addProjectFormData } from "./AddProjectFormData";

export default function AddProjectForm({ onClose }) {
  const { header, sections, fields, buttons, defaultValues } =
    addProjectFormData;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    province: "",
    country: defaultValues.country,
    startDate: "",
    endDate: "",
    status: defaultValues.status,

    donor: "",
    implementationPartner: "",

    donorLogo: defaultValues.donorLogo,
    implementationPartnerLogo: defaultValues.implementationPartnerLogo,
    projectImages: defaultValues.projectImages,

    team: { ...defaultValues.team },

    objectives: [...defaultValues.objectives],

    activities: defaultValues.activities.map((activity) => ({
      ...activity,
    })),
  });

  const [donorLogoPreview, setDonorLogoPreview] = useState(null);
  const [partnerLogoPreview, setPartnerLogoPreview] = useState(null);
  const [projectImagePreviews, setProjectImagePreviews] = useState([]);

  // Clean preview URLs
  useEffect(() => {
    return () => {
      if (donorLogoPreview) URL.revokeObjectURL(donorLogoPreview);
      if (partnerLogoPreview) URL.revokeObjectURL(partnerLogoPreview);

      projectImagePreviews.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [donorLogoPreview, partnerLogoPreview, projectImagePreviews]);

  // Main fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Donor Logo
  const handleDonorLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (donorLogoPreview) {
      URL.revokeObjectURL(donorLogoPreview);
    }

    const preview = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      donorLogo: file,
    }));

    setDonorLogoPreview(preview);
  };

  const removeDonorLogo = () => {
    if (donorLogoPreview) {
      URL.revokeObjectURL(donorLogoPreview);
    }

    setFormData((prev) => ({
      ...prev,
      donorLogo: null,
    }));

    setDonorLogoPreview(null);
  };

  // Implementation Partner Logo
  const handlePartnerLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (partnerLogoPreview) {
      URL.revokeObjectURL(partnerLogoPreview);
    }

    const preview = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      implementationPartnerLogo: file,
    }));

    setPartnerLogoPreview(preview);
  };

  const removePartnerLogo = () => {
    if (partnerLogoPreview) {
      URL.revokeObjectURL(partnerLogoPreview);
    }

    setFormData((prev) => ({
      ...prev,
      implementationPartnerLogo: null,
    }));

    setPartnerLogoPreview(null);
  };

  // Project Images
  const handleProjectImagesChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const previews = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      projectImages: [...prev.projectImages, ...files],
    }));

    setProjectImagePreviews((prev) => [...prev, ...previews]);

    event.target.value = "";
  };

  const removeProjectImage = (index) => {
    const imageUrl = projectImagePreviews[index];

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    setFormData((prev) => ({
      ...prev,
      projectImages: prev.projectImages.filter((_, i) => i !== index),
    }));

    setProjectImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Team
  const handleTeamChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        [name]: value,
      },
    }));
  };

  // Objectives
  const handleObjectiveChange = (index, value) => {
    const updatedObjectives = [...formData.objectives];

    updatedObjectives[index] = value;

    setFormData((prev) => ({
      ...prev,
      objectives: updatedObjectives,
    }));
  };

  const addObjective = () => {
    setFormData((prev) => ({
      ...prev,
      objectives: [...prev.objectives, ""],
    }));
  };

  const removeObjective = (index) => {
    if (formData.objectives.length === 1) return;

    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }));
  };

  // Activities
  const handleActivityChange = (index, field, value) => {
    const updatedActivities = [...formData.activities];

    updatedActivities[index] = {
      ...updatedActivities[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      activities: updatedActivities,
    }));
  };

  const addActivity = () => {
    setFormData((prev) => ({
      ...prev,
      activities: [
        ...prev.activities,
        {
          title: "",
          description: "",
        },
      ],
    }));
  };

  const removeActivity = (index) => {
    if (formData.activities.length === 1) return;

    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

  // Submit
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("New Project:", formData);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 px-4 py-6">
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{header.title}</h2>

            <p className="mt-1 text-sm text-slate-500">{header.description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label={buttons.close}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 p-6">
          {/* ========================================= */}
          {/* PROJECT OVERVIEW */}
          {/* ========================================= */}

          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <FaBullseye />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {sections.overview.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {sections.overview.description}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Project Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {fields.name.label}
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={fields.name.placeholder}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {fields.description.label}
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={fields.description.placeholder}
                  required
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Donor + Partner */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Donor */}
                <div>
                  <label
                    htmlFor="donor"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    {fields.donor.label}
                  </label>

                  <input
                    id="donor"
                    name="donor"
                    type="text"
                    value={formData.donor}
                    onChange={handleChange}
                    placeholder={fields.donor.placeholder}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* Implementation Partner */}
                <div>
                  <label
                    htmlFor="implementationPartner"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    {fields.implementationPartner.label}
                  </label>

                  <input
                    id="implementationPartner"
                    name="implementationPartner"
                    type="text"
                    value={formData.implementationPartner}
                    onChange={handleChange}
                    placeholder={fields.implementationPartner.placeholder}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-slate-200" />

          {/* ========================================= */}
          {/* PROJECT MEDIA */}
          {/* ========================================= */}

          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                <FaImage />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {sections.media.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {sections.media.description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Donor Logo + Partner Logo */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Donor Logo */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    {fields.donorLogo.label}
                  </label>

                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                    {donorLogoPreview ? (
                      <div className="flex items-center gap-4">
                        <img
                          src={donorLogoPreview}
                          alt="Donor logo preview"
                          className="h-20 w-20 rounded-xl border border-slate-200 bg-white object-contain p-2"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {formData.donorLogo?.name}
                          </p>

                          <div className="mt-3 flex gap-2">
                            <label
                              htmlFor="donorLogo"
                              className="cursor-pointer rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
                            >
                              {buttons.changeImage}

                              <input
                                id="donorLogo"
                                type="file"
                                accept={fields.donorLogo.accept}
                                onChange={handleDonorLogoChange}
                                className="hidden"
                              />
                            </label>

                            <button
                              type="button"
                              onClick={removeDonorLogo}
                              className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600"
                            >
                              {buttons.remove}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="donorLogo"
                        className="flex cursor-pointer flex-col items-center justify-center py-6 text-center"
                      >
                        <FaImage className="text-2xl text-slate-400" />

                        <p className="mt-2 text-sm font-semibold text-slate-700">
                          {buttons.chooseImage}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {fields.donorLogo.description}
                        </p>

                        <input
                          id="donorLogo"
                          type="file"
                          accept={fields.donorLogo.accept}
                          onChange={handleDonorLogoChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Implementation Partner Logo */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    {fields.implementationPartnerLogo.label}
                  </label>

                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                    {partnerLogoPreview ? (
                      <div className="flex items-center gap-4">
                        <img
                          src={partnerLogoPreview}
                          alt="Implementation partner logo preview"
                          className="h-20 w-20 rounded-xl border border-slate-200 bg-white object-contain p-2"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {formData.implementationPartnerLogo?.name}
                          </p>

                          <div className="mt-3 flex gap-2">
                            <label
                              htmlFor="implementationPartnerLogo"
                              className="cursor-pointer rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
                            >
                              {buttons.changeImage}

                              <input
                                id="implementationPartnerLogo"
                                type="file"
                                accept={fields.implementationPartnerLogo.accept}
                                onChange={handlePartnerLogoChange}
                                className="hidden"
                              />
                            </label>

                            <button
                              type="button"
                              onClick={removePartnerLogo}
                              className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600"
                            >
                              {buttons.remove}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="implementationPartnerLogo"
                        className="flex cursor-pointer flex-col items-center justify-center py-6 text-center"
                      >
                        <FaImage className="text-2xl text-slate-400" />

                        <p className="mt-2 text-sm font-semibold text-slate-700">
                          {buttons.chooseImage}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {fields.implementationPartnerLogo.description}
                        </p>

                        <input
                          id="implementationPartnerLogo"
                          type="file"
                          accept={fields.implementationPartnerLogo.accept}
                          onChange={handlePartnerLogoChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Images */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {fields.projectImages.label}
                </label>

                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                  <label
                    htmlFor="projectImages"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl py-6 text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <FaUpload />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      {buttons.uploadImages}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {fields.projectImages.description}
                    </p>

                    <input
                      id="projectImages"
                      type="file"
                      accept={fields.projectImages.accept}
                      multiple
                      onChange={handleProjectImagesChange}
                      className="hidden"
                    />
                  </label>

                  {/* Image Preview Grid */}
                  {projectImagePreviews.length > 0 && (
                    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {projectImagePreviews.map((preview, index) => (
                        <div
                          key={preview}
                          className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white"
                        >
                          <img
                            src={preview}
                            alt={`Project image ${index + 1}`}
                            className="h-32 w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => removeProjectImage(index)}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-500 shadow-sm transition hover:bg-red-50 hover:text-red-600"
                            aria-label={`Remove project image ${index + 1}`}
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-slate-200" />

          {/* ========================================= */}
          {/* LOCATION & TIMELINE */}
          {/* ========================================= */}

          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {sections.location.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {sections.location.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Province */}
              <div>
                <label
                  htmlFor="province"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {fields.province.label}
                </label>

                <input
                  id="province"
                  name="province"
                  type="text"
                  value={formData.province}
                  onChange={handleChange}
                  placeholder={fields.province.placeholder}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {fields.location.label}
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={fields.location.placeholder}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Start Date */}
              <div>
                <label
                  htmlFor="startDate"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {fields.startDate.label}
                </label>

                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label
                  htmlFor="endDate"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {fields.endDate.label}
                </label>

                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {fields.status.label}
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                >
                  {fields.status.options.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {fields.country.label}
                </label>

                <input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none"
                />
              </div>
            </div>
          </section>

          <div className="border-t border-slate-200" />

          {/* ========================================= */}
          {/* PROJECT TEAM */}
          {/* ========================================= */}

          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                <FaUsers />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {sections.team.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {sections.team.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(fields.team).map(([key, field]) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    {field.label}
                  </label>

                  <input
                    id={key}
                    name={key}
                    type="number"
                    min="0"
                    value={formData.team[key]}
                    onChange={handleTeamChange}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-slate-200" />

          {/* ========================================= */}
          {/* OBJECTIVES */}
          {/* ========================================= */}

          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <FaBullseye />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {sections.objectives.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {sections.objectives.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {formData.objectives.map((objective, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                    {index + 1}
                  </div>

                  <input
                    type="text"
                    value={objective}
                    onChange={(event) =>
                      handleObjectiveChange(index, event.target.value)
                    }
                    placeholder={fields.objective.placeholder}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />

                  {formData.objectives.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeObjective(index)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addObjective}
                className="flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
              >
                <FaPlus className="text-xs" />
                {buttons.addObjective}
              </button>
            </div>
          </section>

          <div className="border-t border-slate-200" />

          {/* ========================================= */}
          {/* ACTIVITIES */}
          {/* ========================================= */}

          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                <FaTasks />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {sections.activities.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {sections.activities.description}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {formData.activities.map((activity, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-800">
                      Activity {index + 1}
                    </h4>

                    {formData.activities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeActivity(index)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      value={activity.title}
                      onChange={(event) =>
                        handleActivityChange(index, "title", event.target.value)
                      }
                      placeholder={fields.activity.titlePlaceholder}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />

                    <textarea
                      rows="3"
                      value={activity.description}
                      onChange={(event) =>
                        handleActivityChange(
                          index,
                          "description",
                          event.target.value,
                        )
                      }
                      placeholder={fields.activity.descriptionPlaceholder}
                      required
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addActivity}
                className="flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
              >
                <FaPlus className="text-xs" />
                {buttons.addActivity}
              </button>
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {buttons.cancel}
            </button>

            <button
              type="submit"
              className="rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              {buttons.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
