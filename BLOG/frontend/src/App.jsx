import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
          import PostDetail from "./pages/PostDetail";
function App(){

  return (

  
      <BrowserRouter>

         <Navbar />

         <Routes>

        <Route
      path="/"
     element={
     localStorage.getItem("token")
      ? <Home />
      : <Login />
  }
/>

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/create-post" element={<CreatePost />} />
           
            <Route path="/post/:id" element={<PostDetail />} />
          
          </Routes>

      </BrowserRouter>
  )
}

export default App;