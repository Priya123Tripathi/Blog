import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar(){

   return(

      <div className="navbar">

         <h2 className="logo">
            BlogApp
         </h2>

         <div className="nav-links">

            <Link to="/">Home</Link>

            <Link to="/login">Login</Link>

            <Link to="/signup">Signup</Link>

         </div>

      </div>

   );
}

export default Navbar;