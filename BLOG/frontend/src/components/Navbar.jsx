import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      await axios.post("https://blog-backend-rt24.onrender.com/api/auth/logout");
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    }
  };

  return (
    <nav className="w-full bg-zinc-900 border-b border-zinc-800 px-6 md:px-12 py-4 flex items-center justify-between">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-stone-100 no-underline">
        <div className="w-6 h-6 rounded bg-amber-400" />
        <span className="font-serif text-xl font-bold tracking-tight">BlogApp</span>
      </Link>

      {/* Nav Links — sirf logged in hone par dikhao */}
      {token && (
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-zinc-400 hover:text-stone-100 transition-colors duration-200 no-underline"
          >
            Home
          </Link>

          <Link
            to="/create-post"
            className="text-sm text-zinc-400 hover:text-stone-100 transition-colors duration-200 no-underline"
          >
            Create Post
          </Link>

          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 rounded-lg bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 active:scale-[0.97] transition-all duration-200"
          >
            Logout
          </button>
        </div>
      )}

    </nav>
  );
}  

export default Navbar;
