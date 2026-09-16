import { FaEllipsisV, FaTrophy } from "react-icons/fa";
import { achievementTableData } from "./AchievementTableData";

export default function AchievementTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Achievements</h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage DAFA achievements and impact statistics.
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          + Add Achievement
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Achievement
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Value
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Category
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Year
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {achievementTableData.map((achievement) => (
              <tr key={achievement.id} className="transition hover:bg-slate-50">
                {/* Achievement */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      <FaTrophy />
                    </div>

                    <p className="text-sm font-semibold text-slate-800">
                      {achievement.title}
                    </p>
                  </div>
                </td>

                {/* Value */}
                <td className="px-6 py-4 text-sm font-bold text-slate-800">
                  {achievement.value}
                </td>

                {/* Category */}
                <td className="px-6 py-4 text-sm text-slate-600">
                  {achievement.category}
                </td>

                {/* Year */}
                <td className="px-6 py-4 text-sm text-slate-600">
                  {achievement.year}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {achievement.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={`Actions for ${achievement.title}`}
                  >
                    <FaEllipsisV />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
