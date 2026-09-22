import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

import { loginFormData } from "./LoginFormData";

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend only for now
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Sign in to your account
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your credentials to access the DAFA administration portal.
        </p>
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {loginFormData.email.label}
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={loginFormData.email.placeholder}
          required
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {loginFormData.password.label}
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={loginFormData.password.placeholder}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-emerald-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />

          {loginFormData.remember.label}
        </label>

        <button
          type="button"
          className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
        >
          {loginFormData.forgot.label}
        </button>
      </div>

      {/* Sign In */}
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.99]"
      >
        <FaLock className="text-xs" />

        {loginFormData.button.label}
      </button>

      {/* Security Notice */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
        <p className="text-center text-xs leading-5 text-emerald-700">
          {loginFormData.security.text}
        </p>
      </div>
    </form>
  );
}
