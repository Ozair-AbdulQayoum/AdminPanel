import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginFormData } from "./LoginFormData";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {loginFormData.email.label}
        </label>

        <input
          id="email"
          type="email"
          placeholder={loginFormData.email.placeholder}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {loginFormData.password.label}
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={loginFormData.password.placeholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600">
          <input type="checkbox" className="h-4 w-4 accent-emerald-700" />

          {loginFormData.rememberMe}
        </label>

        <button
          type="button"
          className="font-medium text-emerald-700 hover:text-emerald-900"
        >
          {loginFormData.forgotPassword}
        </button>
      </div>

      {/* Sign In */}
      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800"
      >
        {loginFormData.submitButton}
      </button>
    </form>
  );
}
