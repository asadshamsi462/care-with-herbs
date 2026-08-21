"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">

      <div>
        <h1 className="text-2xl font-bold text-[#1B5E20]">
          Admin Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Welcome to CARE WITH HERBS™
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="text-right hidden sm:block">
          <p className="font-semibold text-[#1B5E20]">
            Administrator
          </p>

          <p className="text-sm text-gray-500">
            CARE WITH HERBS™
          </p>
        </div>

        <div className="w-11 h-11 rounded-full bg-[#1B5E20] text-white flex items-center justify-center font-bold text-lg">
          A
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-xl text-sm font-semibold transition"
        >
          Logout
        </button>

      </div>

    </header>
  );
}