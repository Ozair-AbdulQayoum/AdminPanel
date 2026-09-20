import NewsTable from "../Components/News/NewsTable";

export default function News() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Stories & News
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage DAFA stories, news updates, and publications.
        </p>
      </div>

      {/* News Table */}
      <NewsTable />
    </div>
  );
}
