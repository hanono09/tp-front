import ReviewBox from "./ReviewBox";

export default function SneakerCard({ sneaker, user }) {
  const name = sneaker.name || sneaker.title || "Sneaker";
  const brand = sneaker.brand || sneaker.brand_name || "brand";
  const image = sneaker.image || sneaker.imageUrl || sneaker.thumbnail;

  return (
    <div data-testid="sneaker-card" className="group rounded-3xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl transition hover:-translate-y-1 hover:border-lime-400">
      <div className="flex h-52 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-900 to-black">
        {image ? (
          <img src={image} alt={name} className="max-h-44 object-contain transition group-hover:scale-105" />
        ) : (
          <span className="text-zinc-500">sin imagen</span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-widest text-lime-400">{brand}</p>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="mt-1 text-sm text-zinc-400">
          {sneaker.releaseDate || sneaker.release_date || "fecha no disponible"}
        </p>
      </div>
      <ReviewBox sneaker={sneaker} user={user} />
    </div>
  );
}
