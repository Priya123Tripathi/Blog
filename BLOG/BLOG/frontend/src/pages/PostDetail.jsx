import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commenting, setCommenting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleComment = async () => {
    if (!comment.trim()) return;
    setCommenting(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/posts/${id}/comment`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(res.data);
      setComment("");
    } catch (err) {
      console.log(err);
      setError("err in comment submission");
    } finally {
      setCommenting(false);
    }
  };

  // Loading state
  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="flex items-center gap-3 text-zinc-500">
        <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
        <span className="text-sm tracking-widest uppercase">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-stone-100 px-6 py-12">
      <div className="w-full max-w-2xl mx-auto">

        {/* ── Post ── */}
        <div className="mb-12">

          {/* Badge */}
          <p className="text-[0.6rem] tracking-[0.25em] uppercase text-amber-400 font-medium mb-5">
            Blog Post
          </p>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-stone-100 mb-4">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-zinc-950 text-xs font-bold">
              {post.author?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <span className="text-sm text-zinc-400 font-light">
              {post.author?.username || "Unknown"}
            </span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-zinc-800 mb-8" />

          {/* Content */}
          <p className="text-base text-stone-300 font-light leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* ── Comments ── */}
        <div className="border-t border-zinc-800 pt-10">

          <h3 className="text-xs tracking-[0.22em] uppercase text-zinc-500 font-medium mb-6">
            Comments ({post.comments?.length || 0})
          </h3>

          {/* Comment list */}
          {post.comments?.length > 0 ? (
            <div className="flex flex-col gap-4 mb-10">
              {post.comments.map((c, index) => (
                <div
                  key={index}
                  className="px-4 py-4 rounded-lg bg-zinc-900 border border-zinc-800"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300 text-[10px] font-bold">
                      {c.user?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="text-xs font-semibold text-amber-400">
                      {c.user?.username || "User"}
                    </span>
                  </div>
                  <p className="text-sm text-stone-300 font-light leading-relaxed">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-600 font-light mb-10">
             No comments Yet. be the first One
            </p>
          )}

          {/* Add Comment */}
          <div className="flex flex-col gap-3">
            <label className="text-xs tracking-[0.15em] uppercase text-zinc-500 font-medium">
              Add a Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="write the comment..."
              rows={4}
              className="w-full px-4 py-3.5 rounded-lg bg-zinc-900 border border-zinc-700 text-stone-100 placeholder-zinc-500 text-sm outline-none focus:border-amber-400 focus:bg-zinc-800 transition-all duration-200 resize-none leading-relaxed"
            />

            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}

            <button
              onClick={handleComment}
              disabled={commenting || !comment.trim()}
              className="w-full py-3.5 rounded-lg bg-amber-400 text-zinc-950 text-xs font-bold tracking-[0.16em] uppercase hover:bg-amber-300 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {commenting ? "Submitting…" : "Submit Comment"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PostDetail;