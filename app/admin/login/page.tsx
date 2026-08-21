"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError("Email ya password galat hai.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#F8F6EF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-[#1B5E20] text-white flex items-center justify-center text-4xl shadow-lg">
            🌿
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#1B5E20]">
            CARE WITH HERBS
          </h1>

          <p className="text-gray-500 mt-1">
            Admin Panel
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-7 sm:p-9">

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to manage your store.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter admin email"
                autoComplete="email"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none transition focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 pr-20 outline-none transition focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#1B5E20]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B5E20] hover:bg-[#154818] disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold shadow-lg transition"
            >
              {loading ? "Signing In..." : "🔐 Sign In"}
            </button>

          </form>

        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          CARE WITH HERBS™ • Admin Panel
        </p>

      </div>
    </main>
  );
}