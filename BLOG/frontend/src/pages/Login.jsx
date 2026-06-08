import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("https://blog-backend-rt24.onrender.com/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-zinc-950 text-stone-100">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 bg-zinc-900 overflow-hidden">

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 47px,#fff 47px,#fff 48px),repeating-linear-gradient(90deg,transparent,transparent 47px,#fff 47px,#fff 48px)",
          }}
        />

        {/* Glow blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -left-10 w-64 h-64 rounded-full bg-amber-600/5 blur-2xl pointer-events-none" />

        {/* Top logo / brand */}
        <div className="relative z-10">
          <div className="w-8 h-8 rounded-md bg-amber-400" />
        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <p className="text-3xl xl:text-4xl leading-snug font-serif italic text-stone-100 mb-6">
            Every great journey<br />begins with a{" "}
            <em className="not-italic text-amber-400">single sign-in.</em>
          </p>
          <div className="w-10 h-px bg-amber-400 mb-5" />
          <p className="text-xs tracking-[0.18em] uppercase text-stone-500 font-light">
            Secure · Private · Yours
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex items-center justify-center bg-zinc-950 px-6">
        <div
          className="w-full max-w-sm"
          style={shake ? { animation: "shake 0.4s ease" } : {}}
        >

          {/* Badge */}
          <p className="text-[0.6rem] tracking-[0.25em] uppercase text-amber-400 font-medium mb-6">
            Member Access
          </p>

          {/* Heading */}
          <h1 className="font-serif text-[2.8rem] font-bold leading-[1.08] text-stone-100 mb-2">
            Welcome<br />Back.
          </h1>
          <p className="text-sm text-stone-500 font-light mb-8">
            Sign in to continue
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full px-4 py-3.5 rounded-lg bg-zinc-900 border border-zinc-700 text-stone-100 placeholder-zinc-500 text-sm outline-none focus:border-amber-400 focus:bg-zinc-800 transition-all duration-200"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3.5 rounded-lg bg-zinc-900 border border-zinc-700 text-stone-100 placeholder-zinc-500 text-sm outline-none focus:border-amber-400 focus:bg-zinc-800 transition-all duration-200"
            />

            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-1 rounded-lg bg-amber-400 text-zinc-950 text-xs font-bold tracking-[0.16em] uppercase hover:bg-amber-300 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-zinc-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-amber-400 font-medium hover:text-amber-300 transition-colors"
            >
              Create account
            </Link>
          </p>

        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-5px); }
          40%      { transform: translateX(5px); }
          60%      { transform: translateX(-3px); }
          80%      { transform: translateX(3px); }
        }
      `}</style>
    </div>
  );
}
