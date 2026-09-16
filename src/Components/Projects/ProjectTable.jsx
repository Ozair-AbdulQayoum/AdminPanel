import { FaEllipsisV } from "react-icons/fa";
import { projectTableData } from "./ProjectTableData";

export default function ProjectTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Table Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">All Projects</h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage and monitor DAFA projects.
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          + Add Project
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Project
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Province
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Donor
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Start Date
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
            {projectTableData.map((project) => (
              <tr key={project.id} className="transition hover:bg-slate-50">
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-slate-800">
                    {project.name}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {project.province}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {project.donor}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {project.startDate}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      project.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : project.status === "Completed"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={`Actions for ${project.name}`}
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
