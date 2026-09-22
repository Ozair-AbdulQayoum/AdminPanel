import LoginHeader from "../Components/Login/LoginHeader";
import LoginForm from "../Components/Login/LoginForm";
import LoginFooter from "../Components/Login/LoginFooter";

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
        {/* Left Image Section */}
        <div className="relative hidden w-1/2 overflow-hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=85"
            alt="DAFA Administration"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-emerald-950/75" />

          {/* Image Content */}
          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            <LoginHeader />

            <div className="max-w-lg">
              <div className="mb-5 h-1 w-14 rounded-full bg-emerald-400" />

              <h2 className="text-3xl font-bold leading-tight text-white xl:text-4xl">
                Managing operations.
                <br />
                Supporting safer communities.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-emerald-50/80 xl:text-base">
                Access the DAFA administration portal to manage projects,
                coverage areas, staff, donors, achievements, and news.
              </p>
            </div>

            <p className="text-xs text-white/60">DAFA Administration Portal</p>
          </div>
        </div>

        {/* Right Login Section */}
        <div className="flex w-full items-center justify-center px-6 py-10 sm:px-10 lg:w-1/2 lg:px-14 xl:px-20">
          <div className="w-full max-w-md">
            {/* Mobile Logo/Header */}
            <div className="mb-8 lg:hidden">
              <LoginHeader />
            </div>

            {/* Form */}
            <LoginForm />

            {/* Footer */}
            <div className="mt-8">
              <LoginFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
