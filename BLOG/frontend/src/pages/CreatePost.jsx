import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://blog-backend-rt24.onrender.com/api/posts",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Post create karne mein error aaya. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-stone-100 px-6 py-12 flex items-start justify-center">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <p className="text-[0.6rem] tracking-[0.25em] uppercase text-amber-400 font-medium mb-6">
          New Post
        </p>
        <h1 className="font-serif text-[2.8rem] font-bold leading-[1.08] text-stone-100 mb-2">
          Create<br />Post.
        </h1>
        <p className="text-sm text-stone-500 font-light mb-10">
          Share your thoughts with the world
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-[0.15em] uppercase text-zinc-500 font-medium">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3.5 rounded-lg bg-zinc-900 border border-zinc-700 text-stone-100 placeholder-zinc-500 text-sm outline-none focus:border-amber-400 focus:bg-zinc-800 transition-all duration-200"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-[0.15em] uppercase text-zinc-500 font-medium">
              Content
            </label>
            <textarea
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              required
              className="w-full px-4 py-3.5 rounded-lg bg-zinc-900 border border-zinc-700 text-stone-100 placeholder-zinc-500 text-sm outline-none focus:border-amber-400 focus:bg-zinc-800 transition-all duration-200 resize-none leading-relaxed"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 rounded-lg bg-amber-400 text-zinc-950 text-xs font-bold tracking-[0.16em] uppercase hover:bg-amber-300 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Publishing…" : "Publish Post"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3.5 rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium tracking-[0.1em] uppercase hover:border-zinc-500 hover:text-stone-100 transition-all duration-200"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreatePost;
