import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ReviewBox({ sneaker, user }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const sneakerId = sneaker.id || sneaker.sku;
  const sneakerName = sneaker.name || sneaker.title || "Sneaker";

  useEffect(() => {
    fetchReviews();
  }, [sneakerId]);

  async function fetchReviews() {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("sneaker_id", sneakerId)
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
  }

  async function submitReview() {
    if (!user) return alert("Iniciá sesión para dejar una review");
    if (!comment.trim()) return;
    setLoading(true);
    await supabase.from("reviews").insert({
      user_id: user.id,
      sneaker_id: sneakerId,
      sneaker_name: sneakerName,
      rating,
      comment,
    });
    setComment("");
    await fetchReviews();
    setLoading(false);
  }

  async function deleteReview(id) {
    await supabase.from("reviews").delete().eq("id", id);
    await fetchReviews();
  }

  return (
    <div className="mt-4">
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => setRating(s)}
            className={`text-xl ${s <= rating ? "text-lime-400" : "text-zinc-600"}`}
          >
            ★
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-xl bg-zinc-900 px-3 py-2 text-sm outline-none ring-1 ring-zinc-800 focus:ring-lime-400"
          placeholder={user ? "tu review..." : "iniciá sesión para opinar"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!user}
        />
        <button
          onClick={submitReview}
          disabled={loading || !user}
          className="rounded-xl bg-lime-400 px-3 py-2 text-sm font-bold text-black disabled:opacity-50"
        >
          +
        </button>
      </div>
      <div className="mt-3 space-y-2">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl bg-zinc-900 px-3 py-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-lime-400">{"★".repeat(r.rating)}</span>
              {user?.id === r.user_id && (
                <button
                  onClick={() => deleteReview(r.id)}
                  className="text-zinc-500 hover:text-red-400 text-xs"
                >
                  borrar
                </button>
              )}
            </div>
            <p className="text-zinc-300 mt-1">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
