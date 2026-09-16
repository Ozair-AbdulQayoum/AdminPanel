import { FaArrowRight } from "react-icons/fa";
import { recentProjectsData } from "./RecentProjectsData";

export default function RecentProjects() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recent Projects</h2>

          <p className="mt-1 text-sm text-slate-500">
            Overview of recently managed DAFA projects.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
        >
          View All
          <FaArrowRight className="text-xs" />
        </button>
      </div>

      {/* Projects */}
      <div className="divide-y divide-slate-100">
        {recentProjectsData.map((project) => (
          <div
            key={project.id}
            className="px-6 py-5 transition hover:bg-slate-50"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Project Info */}
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-800">{project.name}</h3>

                <p className="mt-1 text-sm text-slate-500">
                  {project.province} Province
                </p>
              </div>

              {/* Status */}
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  project.status === "Active"
                    ? "bg-emerald-50 text-emerald-700"
                    : project.status === "Completed"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-amber-50 text-amber-700"
                }`}
              >
                {project.status}
              </span>

              {/* Progress */}
              <div className="w-full lg:w-48">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-medium text-slate-500">Progress</span>

                  <span className="font-semibold text-slate-700">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
