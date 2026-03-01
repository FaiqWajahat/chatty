# Chatty - Real-Time Chat Application

![Chatty Preview](https://via.placeholder.com/1200x600?text=Chatty+-+Real-Time+MERN+Chat+App)

Chatty is a full-stack, real-time messaging application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io. It features instant messaging, online status indicators, image sharing, and a modern, responsive UI powered by TailwindCSS and DaisyUI.

## 🚀 Features

- **Real-Time Messaging:** Instant message delivery using Socket.io.
- **Authentication & Authorization:** Secure JWT-based authentication.
- **Online User Status:** See who is currently online in real-time.
- **Media Sharing:** Support for image uploads via Cloudinary.
- **Global State Management:** Efficient state handling with Zustand.
- **Modern UI/UX:** Fully responsive design built with Tailwind CSS & DaisyUI.
- **Serverless Ready:** Configured for easy deployment on Vercel.

## 💻 Tech Stack

- **Frontend:** React, Vite, TailwindCSS, DaisyUI, Zustand, Socket.io-client, Axios, React-Router-DOM
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io, JSONWebToken, Cloudinary, Bcrypt

## 🛠️ Local Development Setup

To run this project locally, follow these steps:

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB account (for database)
- Cloudinary account (for image uploads)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd chatty
```

### 2. Install dependencies
Install dependencies for both frontend and backend from the root directory:
```bash
npm run build
```
*(Alternatively, you can run `npm install` inside both `/frontend` and `/backend` directories.)*

### 3. Environment Variables
Create a `.env` file in **both** the `/frontend` and `/backend` directories.

**Backend (`/backend/.env`):**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Frontend (`/frontend/.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Run the Application
You can run both servers concurrently or individually.

To run the backend server:
```bash
cd backend
npm run dev
```

To run the frontend server:
```bash
cd frontend
npm run dev
```
Your app should now be running on `http://localhost:5173`.

---

## ☁️ Deployment (Vercel)

This project has been perfectly configured to be deployed on **Vercel** as two separate optimized projects (one for frontend, one for backend) from a single monorepo.

### Step 1: Deploy the Backend
1. Log in to [Vercel](https://vercel.com/) and click **Add New...** > **Project**.
2. Import your GitHub repository.
3. In the project configuration:
   - **Framework Preset:** `Other` (or `Node.js`)
   - **Root Directory:** Edit and select `backend`.
4. Add all the backend Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, etc.).
5. Check that `NODE_ENV` is automatically set or explicitly set it to `production`.
6. Click **Deploy**.
*(Note: Vercel's serverless functions do not natively support persistent WebSockets, but Socket.io is configured to automatically fall back to HTTP long-polling, meaning your chat will still work perfectly).*

### Step 2: Deploy the Frontend
1. Go back to the Vercel dashboard and click **Add New Project**.
2. Import the **same** GitHub repository again.
3. In the project configuration:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Edit and select `frontend`.
4. Add the frontend Environment Variable:
   - `VITE_API_BASE_URL`: Set this to your **deployed Vercel backend URL** (e.g., `https://chatty-backend.vercel.app/api`)
5. Click **Deploy**.

🎉 **Your full-stack chat application is now live on Vercel!**

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
