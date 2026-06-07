import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import "./Auth.css";

function Signup(){

   const navigate = useNavigate();

   const [form,setForm] = useState({
      username:"",
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

         await axios.post(
            "http://localhost:5000/api/auth/signup",
            form
         );

         navigate("/");

      }catch(err){

         alert("Signup failed");

      }

   };

   return(

      <div className="auth-container">

         <form
            className="auth-form"
            onSubmit={handleSubmit}
         >

            <h1>Create Account</h1>

            <input
               type="text"
               name="username"
               placeholder="Enter Username"
               onChange={handleChange}
            />

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
               Signup
            </button>

            <p>
               Already have an account?
               {" "}
               <Link to="/login">
                  Login
               </Link>
            </p>

         </form>

      </div>

   );
}

export default Signup;