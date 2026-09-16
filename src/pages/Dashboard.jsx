import DashboardWelcome from "../Components/Dashboard/DashboardWelcome";
import StatCard from "../Components/Cards/StatCard";
import RecentProjects from "../Components/Projects/RecentProjects";
import RecentActivity from "../Components/Activity/RecentActivity";
import QuickActions from "../Components/QuickActions/QuickActions";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardWelcome />

      <StatCard />

      <RecentProjects />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentActivity />

        <QuickActions />
      </div>
    </div>
  );
}
