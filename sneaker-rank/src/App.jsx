import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { searchSneakers } from "./lib/sneakersApi";
import AuthBox from "./components/AuthBox";
import SneakerCard from "./components/SneakerCard";

export default function App() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("air jordan");
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadSneakers() {
    setLoading(true);
    try {
      const data = await searchSneakers(query);
      setSneakers(data);
    } catch (err) {
      alert("No pude traer la API. Revisá la key.");
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    loadSneakers();
  }, []);

  return (
    <main className="min-h-screen px-6 py-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="text-3xl font-black">
          Sneaker<span className="text-lime-400">Rank</span>
        </h1>
        <AuthBox user={user} />
      </nav>
      <section className="mx-auto mt-14 max-w-7xl">
        <h2 className="max-w-3xl text-5xl font-black leading-tight">
          rankeá las zapas que están saliendo al mercado
        </h2>
        <p className="mt-4 max-w-xl text-zinc-400">
          buscá modelos, mirá lanzamientos y dejá tu review como en un foro sneaker.
        </p>
        <div className="mt-8 flex max-w-xl gap-3">
          <input
            className="flex-1 rounded-2xl bg-zinc-900 px-5 py-3 outline-none ring-1 ring-zinc-800 focus:ring-lime-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="nike dunk, samba, jordan..."
          />
          <button
            onClick={loadSneakers}
            className="rounded-2xl bg-lime-400 px-6 font-bold text-black"
          >
            buscar
          </button>
        </div>
      </section>
      <section className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-zinc-400">cargando zapas...</p>
        ) : (
          sneakers.map((s, i) => (
            <SneakerCard key={s.id || s.sku || i} sneaker={s} user={user} />
          ))
        )}
      </section>
    </main>
  );
}
