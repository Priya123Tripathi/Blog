# BlogApp

A full-stack blog application where users can create, read, and comment on posts.

Built as part of **Webthism Summer Internship – Week 5**.

---

##  Features

- User Signup & Login with JWT authentication
- Create and view blog posts
- Comment on posts
- Protected routes (only logged-in users can create posts & comment)
- Clean dark UI built with Tailwind CSS

---

##  Tech Stack

**Frontend**
- React.js
- React Router DOM
- Axios
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs

---

##  Project Structure

```
BlogApp/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   └── PostDetail.jsx
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   └── App.jsx
│   └── package.json
│
└── backend/
    ├── model/
    │   ├── User.js
    │   └── Post.js
    ├── routes/
    │   ├── auth.js
    │   └── posts.js
    ├── middleware/
    │   └── verifyToken.js
    ├── server.js
    └── package.json
```

---

##  Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/blogapp.git
cd blogapp
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
node server.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

##  API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create post (auth required) |
| PUT | `/api/posts/:id` | Update post (auth required) |
| DELETE | `/api/posts/:id` | Delete post (auth required) |
| POST | `/api/posts/:id/comment` | Add comment (auth required) |

---

## Author

Made with during Webthism Summer Internship
