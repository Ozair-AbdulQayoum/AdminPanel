import ProjectTable from "../Components/Projects/ProjectTable";
export default function Projects() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Projects
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage DAFA projects, donors, locations, and project status.
        </p>
      </div>

      <ProjectTable />
    </div>
  );
}
