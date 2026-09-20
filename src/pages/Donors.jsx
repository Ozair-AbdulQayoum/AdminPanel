import DonorTable from "../Components/Donors/DonorTable";

export default function Donors() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Donors
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage DAFA donors, partners, and project support.
        </p>
      </div>

      {/* Donor Table */}
      <DonorTable />
    </div>
  );
}
