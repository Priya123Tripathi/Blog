import { useState } from "react";
import axios from "axios";
import "./Auth.css";
function Signup() {

   const [form, setForm] = useState({
      username: "",
      email: "",
      password: ""
   });

   const handleSubmit = async (e) => {

      e.preventDefault();

      await axios.post(
         "http://localhost:5000/api/auth/signup",
         form
      );

      alert("Signup successful");
   };

   return (

      <form onSubmit={handleSubmit}>

         <input
            placeholder="Username"
            onChange={(e) =>
               setForm({
                  ...form,
                  username: e.target.value
               })
            }
         />

         <input
            placeholder="Email"
            onChange={(e) =>
               setForm({
                  ...form,
                  email: e.target.value
               })
            }
         />

         <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
               setForm({
                  ...form,
                  password: e.target.value
               })
            }
         />

         <button>Signup</button>

      </form>
   );
}

export default Signup;