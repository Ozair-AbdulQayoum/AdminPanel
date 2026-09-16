import { FaCalendarAlt } from "react-icons/fa";
import { dashboardWelcomeData } from "./DashboardWelcomeData";

export default function DashboardWelcome() {
  return (
    <section className="mb-6 rounded-2xl bg-emerald-700 p-6 text-white shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-emerald-100">
            DAFA Administration Portal
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            {dashboardWelcomeData.greeting}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-100">
            {dashboardWelcomeData.description}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium">
          <FaCalendarAlt />

          <span>{dashboardWelcomeData.dateLabel}</span>
        </div>
      </div>
    </section>
  );
}
