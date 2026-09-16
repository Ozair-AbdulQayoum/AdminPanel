import {
  FaFolderOpen,
  FaFileAlt,
  FaUserPlus,
  FaHandHoldingHeart,
} from "react-icons/fa";

import { recentActivityData } from "./RecentActivityData";

const icons = [FaFolderOpen, FaFileAlt, FaUserPlus, FaHandHoldingHeart];

export default function RecentActivity() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest administrative activities.
        </p>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-slate-100">
        {recentActivityData.map((activity, index) => {
          const Icon = icons[index % icons.length];

          return (
            <div
              key={activity.id}
              className="flex gap-4 px-6 py-4 transition hover:bg-slate-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">{activity.user}</span>{" "}
                  {activity.action}{" "}
                  <span className="font-medium text-slate-900">
                    {activity.target}
                  </span>
                </p>

                <p className="mt-1 text-xs text-slate-400">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
