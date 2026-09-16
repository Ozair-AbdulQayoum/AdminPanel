import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function AdminNavbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Left */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-1 text-xs text-slate-500">
          DAFA Administration Portal
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-emerald-700"
          aria-label="Search"
        >
          <FaSearch />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-emerald-700"
          aria-label="Notifications"
        >
          <FaBell />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Admin */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <FaUserCircle className="text-2xl" />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">Admin</p>

            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
