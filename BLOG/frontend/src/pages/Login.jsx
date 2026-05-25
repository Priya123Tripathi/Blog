import { useState } from "react";
import axios from "axios";
import "./Auth.css";
function Login() {

   const [form, setForm] = useState({
      email: "",
      password: ""
   });

   const handleChange = (e) => {

      setForm({
         ...form,
         [e.target.name]: e.target.value
      });

   };

   const handleSubmit = async (e) => {

      e.preventDefault();

      try {

         const res = await axios.post(
            "http://localhost:5000/api/auth/login",
            form
         );

         localStorage.setItem(
            "token",
            res.data.token
         );

         alert("Login successful");

         console.log(res.data);

      } catch (err) {

         console.log(err);

         alert("Login failed");

      }

   };

   return (

      <div>

         <h1>Login</h1>

         <form onSubmit={handleSubmit}>

            <input
               type="email"
               name="email"
               placeholder="Enter email"
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="password"
               name="password"
               placeholder="Enter password"
               onChange={handleChange}
            />

            <br /><br />

            <button type="submit">
               Login
            </button>

         </form>

      </div>

   );
}

export default Login;