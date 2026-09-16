import LoginHeader from "../components/Login/LoginHeader";
import LoginForm from "../components/Login/LoginForm";
import LoginFooter from "../components/Login/LoginFooter";

export default function Login() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-10">
      {/* Background Decoration */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <LoginHeader />

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-8">
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
              🔒
            </div>

            <div>
              <p className="text-sm font-semibold text-emerald-900">
                Secure Administration
              </p>

              <p className="text-xs text-emerald-700">
                Authorized personnel only
              </p>
            </div>
          </div>

          <LoginForm />
        </div>

        <LoginFooter />
      </div>
    </main>
  );
}
