import {
  FaFolderOpen,
  FaFileAlt,
  FaUsers,
  FaHandHoldingHeart,
} from "react-icons/fa";

import { statCardData } from "./StatCardData";

const icons = {
  projects: FaFolderOpen,
  reports: FaFileAlt,
  staff: FaUsers,
  donors: FaHandHoldingHeart,
};

export default function StatCard() {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {statCardData.map((card) => {
        const Icon = icons[card.icon];

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            {/* Top */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {card.value}
                </h3>
              </div>

              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon />
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-5 flex items-center gap-2 text-xs">
              <span className="font-semibold text-emerald-600">
                {card.change}
              </span>

              <span className="text-slate-400">{card.description}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
