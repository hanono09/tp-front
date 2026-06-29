import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AuthBox({ user }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleLogin() {
    setLoading(true);
    await supabase.auth.signInWithOtp({ email });
    setSent(true);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-zinc-400">{user.email}</span>
        <button
          onClick={handleLogout}
          className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-bold hover:bg-zinc-700"
        >
          salir
        </button>
      </div>
    );
  }

  if (sent) {
    return <p className="text-sm text-lime-400">revisá tu mail 📬</p>;
  }

  return (
    <div className="flex items-center gap-2">
      <input
        className="rounded-xl bg-zinc-900 px-4 py-2 text-sm outline-none ring-1 ring-zinc-800 focus:ring-lime-400"
        placeholder="tu mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="rounded-xl bg-lime-400 px-4 py-2 text-sm font-bold text-black"
      >
        entrar
      </button>
    </div>
  );
}
