import StaffTable from "../Components/Staff/StaffTable";

export default function Staff() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Staff
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage DAFA staff members, departments, positions, and locations.
        </p>
      </div>

      {/* Staff Table */}
      <StaffTable />
    </div>
  );
}
