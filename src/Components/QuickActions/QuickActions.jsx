import {
  FaFolderPlus,
  FaUserPlus,
  FaFileUpload,
  FaNewspaper,
} from "react-icons/fa";

import { quickActionsData } from "./QuickActionsData";

const icons = {
  project: FaFolderPlus,
  staff: FaUserPlus,
  report: FaFileUpload,
  news: FaNewspaper,
};

export default function QuickActions() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>

        <p className="mt-1 text-sm text-slate-500">
          Common administration tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {quickActionsData.map((action) => {
          const Icon = icons[action.icon];

          return (
            <button
              key={action.title}
              type="button"
              className="group rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-200 hover:bg-emerald-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-emerald-100 group-hover:text-emerald-700">
                <Icon />
              </div>

              <h3 className="mt-3 text-sm font-semibold text-slate-800">
                {action.title}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
