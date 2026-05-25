import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import "./Auth.css";

function Login(){

   const navigate = useNavigate();

   const [form,setForm] = useState({
      email:"",
      password:""
   });

   const handleChange = (e) => {

      setForm({
         ...form,
         [e.target.name]:e.target.value
      });

   };

   const handleSubmit = async (e) => {

      e.preventDefault();

      try{

         const res = await axios.post(
            "http://localhost:5000/api/auth/login",
            form
         );

         localStorage.setItem(
            "token",
            res.data.token
         );

         navigate("/");

      }catch(err){

         alert("Login failed");

      }

   };

   return(

      <div className="auth-container">

         <form
            className="auth-form"
            onSubmit={handleSubmit}
         >

            <h1>Login</h1>

            <input
               type="email"
               name="email"
               placeholder="Enter Email"
               onChange={handleChange}
            />

            <input
               type="password"
               name="password"
               placeholder="Enter Password"
               onChange={handleChange}
            />

            <button type="submit">
               Login
            </button>

            <p>
               Don't have an account?
               <Link to="/signup">
                  Signup
               </Link>
            </p>

         </form>

      </div>

   );
}

export default Login;