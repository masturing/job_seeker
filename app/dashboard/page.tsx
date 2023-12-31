import AuthButton from "@/components/AuthButton";
import Check from "@/components/Check";
import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import { GetServerSideProps } from "next";

import { cookies } from "next/headers";
import Link from "next/link";

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };
  const isSupabaseConnected = canInitSupabaseClient();
  return user ? (
    <div className="flex flex-col items-center flex-1 w-full gap-20">
      <nav className="flex justify-center w-full h-16 border-b border-b-foreground/10">
        <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
          <Link
            href="/"
            className="flex px-3 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
          >
            Home
          </Link>
        </div>
      </nav>

      <div className="flex flex-col flex-1 max-w-4xl gap-20 px-3 opacity-0 animate-in">
        <Header />
        <Check user={false} />
      </div>
      <div className="flex flex-row gap-10">
        <div className="w-40 h-20 p-4 transition-transform transform bg-gray-800 border rounded-lg shadow-md hover:scale-105">
          <Link href="/dashboard/liked"> Liked Pekerjaan </Link>
        </div>
        <div className="w-40 h-20 p-4 transition-transform transform bg-gray-800 border rounded-lg shadow-md hover:scale-105">
          <Link href="/dashboard/history"> History Apply Pekerjaan </Link>
        </div>
      </div>
      <footer className="flex justify-center w-full p-8 text-xs text-center border-t border-t-foreground/10">
        <p>Built For Web Project PBP</p>
      </footer>
    </div>
  ) : (
    <div>Please Login</div>
  );
}
