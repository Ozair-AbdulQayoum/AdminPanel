import { loginHeaderData } from "./LoginHeaderData";

export default function LoginHeader() {
  return (
    <header className="text-center">
      {/* DAFA Logo */}
      <div className="mb-6 flex justify-center">
        <img
          src="/DAFA-New-Logo.jpg"
          alt="Demining Agency for Afghanistan Logo"
          className="h-20 w-20 rounded-2xl object-contain shadow-sm ring-1 ring-slate-200"
        />
      </div>

      {/* Admin Portal Badge */}
      <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-700">
        {loginHeaderData.badge}
      </span>

      {/* Title */}
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        {loginHeaderData.title}
      </h1>

      {/* Description */}
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        {loginHeaderData.subtitle}
      </p>
    </header>
  );
}
