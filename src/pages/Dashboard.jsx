import DashboardWelcome from "../components/Dashboard/DashboardWelcome";
import StatCard from "../components/Cards/StatCard";
import RecentProjects from "../components/Projects/RecentProjects";
import RecentActivity from "../components/Activity/RecentActivity";
import QuickActions from "../components/QuickActions/QuickActions";

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
