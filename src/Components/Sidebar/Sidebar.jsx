import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaFolderOpen,
  FaTrophy,
  FaUsers,
  FaHandHoldingHeart,
  FaNewspaper,
  FaCog,
  FaMapMarkedAlt,
} from "react-icons/fa";

import { sidebarData } from "./SidebarData";

const icons = {
  dashboard: FaChartPie,
  projects: FaFolderOpen,
  achievements: FaTrophy,
  staff: FaUsers,
  donors: FaHandHoldingHeart,
  news: FaNewspaper,
  coverage: FaMapMarkedAlt,
  settings: FaCog,
};

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Brand */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
        <img
          src="/DAFA-New-Logo.jpg"
          alt="DAFA Logo"
          className="h-11 w-11 rounded-xl object-contain"
        />

        <div>
          <h1 className="text-lg font-bold text-slate-900">
            {sidebarData.brand.name}
          </h1>

          <p className="text-xs font-medium text-slate-500">
            {sidebarData.brand.subtitle}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        <div className="space-y-1">
          {sidebarData.menu.map((item) => {
            const Icon = icons[item.icon];

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
                  }`
                }
              >
                <Icon className="text-base" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Management */}
        <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Management
        </p>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
            }`
          }
        >
          <FaCog />
          <span>{sidebarData.management[0].label}</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <p className="text-center text-xs text-slate-400">© 2026 DAFA Admin</p>
      </div>
    </aside>
  );
}
