import AchievementTable from "../Components/Achievements/AchievementTable";
export default function Achievements() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Achievements
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage DAFA achievements, impact statistics, and milestones.
        </p>
      </div>

      <AchievementTable />
    </div>
  );
}
