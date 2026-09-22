import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaBell,
  FaPalette,
  FaSave,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { settingsData } from "../Components/Settings/SettingsData";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);

  const [settings, setSettings] = useState({
    name: "DAFA Administrator",
    email: "admin@dafa.org.af",
    phone: "",
    position: "System Administrator",

    currentPassword: "",
    newPassword: "",
    confirmPassword: "",

    emailNotifications: true,
    projectNotifications: true,
    newsNotifications: true,
    staffNotifications: false,

    compactSidebar: false,
    reducedMotion: false,
  });

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: FaUser,
    },
    {
      id: "security",
      label: "Security",
      icon: FaLock,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: FaBell,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: FaPalette,
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (activeTab === "security") {
      if (
        settings.newPassword &&
        settings.newPassword !== settings.confirmPassword
      ) {
        alert("New password and confirmation password do not match.");
        return;
      }
    }

    alert("Settings saved successfully.");
  };

  const currentSection = settingsData[activeTab];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your DAFA administration portal preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        {/* Settings Navigation */}
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon
                  className={isActive ? "text-emerald-600" : "text-slate-400"}
                />

                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Section Header */}
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              {currentSection.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {currentSection.description}
            </p>
          </div>

          <form onSubmit={handleSave}>
            {/* Profile */}
            {activeTab === "profile" && (
              <div className="space-y-6 p-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={settings.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Position
                    </label>

                    <input
                      type="text"
                      name="position"
                      value={settings.position}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={settings.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={settings.phone}
                      onChange={handleChange}
                      placeholder="+93 ..."
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <div className="space-y-6 p-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Current Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      value={settings.currentPassword}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      New Password
                    </label>

                    <input
                      type="password"
                      name="newPassword"
                      value={settings.newPassword}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      name="confirmPassword"
                      value={settings.confirmPassword}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
                  For security, use a strong password with letters, numbers, and
                  special characters.
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="divide-y divide-slate-100">
                <NotificationOption
                  name="emailNotifications"
                  title="Email Notifications"
                  description="Receive important administration updates by email."
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                />

                <NotificationOption
                  name="projectNotifications"
                  title="Project Notifications"
                  description="Receive notifications when project information changes."
                  checked={settings.projectNotifications}
                  onChange={handleChange}
                />

                <NotificationOption
                  name="newsNotifications"
                  title="News Notifications"
                  description="Receive updates when news or stories are published."
                  checked={settings.newsNotifications}
                  onChange={handleChange}
                />

                <NotificationOption
                  name="staffNotifications"
                  title="Staff Notifications"
                  description="Receive notifications about staff changes."
                  checked={settings.staffNotifications}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Appearance */}
            {activeTab === "appearance" && (
              <div className="divide-y divide-slate-100">
                <NotificationOption
                  name="compactSidebar"
                  title="Compact Sidebar"
                  description="Use a smaller sidebar to create more workspace."
                  checked={settings.compactSidebar}
                  onChange={handleChange}
                />

                <NotificationOption
                  name="reducedMotion"
                  title="Reduced Motion"
                  description="Reduce interface animations and transitions."
                  checked={settings.reducedMotion}
                  onChange={handleChange}
                />

                <div className="p-6">
                  <p className="text-sm font-medium text-slate-700">
                    Current Theme
                  </p>

                  <div className="mt-3 rounded-xl border-2 border-emerald-500 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-white shadow-sm" />

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Light
                        </p>

                        <p className="text-xs text-slate-500">
                          Default admin appearance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end border-t border-slate-200 p-6">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <FaSave />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function NotificationOption({ name, title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-5 p-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />

        <div className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-emerald-600 after:absolute after:left-[3px] after:top-[3px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:after:translate-x-5" />
      </label>
    </div>
  );
}
