import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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

        {/* Header */}
        <p className="text-[0.6rem] tracking-[0.25em] uppercase text-amber-400 font-medium mb-5">
          Latest
        </p>
        <h1 className="font-serif text-[2.8rem] font-bold leading-[1.08] text-stone-100 mb-2">
          All Blogs.
        </h1>
        <p className="text-sm text-stone-500 font-light mb-10">
          {posts.length} {posts.length === 1 ? "post" : "posts"} published
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-800 mb-10" />

        {/* Posts */}
        {posts.length === 0 ? (
          <p className="text-sm text-zinc-600 font-light">
            Abhi koi post nahi hai. Pehla post create karo!
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-zinc-800">
            {posts.map((post) => (
              <div
                key={post._id}
                onClick={() => navigate(`/post/${post._id}`)}
                className="py-8 group cursor-pointer"
              >
                {/* Author */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-zinc-950 text-[10px] font-bold">
                    {post.author?.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="text-xs text-zinc-500 font-light">
                    {post.author?.username || "Unknown"}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl font-bold text-stone-100 mb-3 group-hover:text-amber-400 transition-colors duration-200 leading-snug">
                  {post.title}
                </h2>

                {/* Content preview */}
                <p className="text-sm text-zinc-500 font-light leading-relaxed line-clamp-2 mb-4">
                  {post.content}
                </p>

                {/* Read more */}
                <span className="text-xs tracking-[0.15em] uppercase text-amber-400 font-medium group-hover:gap-2 transition-all">
                  Read more →
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;
