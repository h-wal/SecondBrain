# 🧠 Second Brain – Personal Knowledge Management App

A full-stack **personal knowledge management platform** that lets users capture and organize tweets, documents, and videos with titles, tags, and links — all accessible from a clean, responsive dashboard.
Built with **React + TypeScript + Vite** on the frontend and **Express + MongoDB (Mongoose)** on the backend, featuring **JWT-based authentication** and dynamic tag creation.


## 🚀 Features

* 🔐 **User Authentication**

  * Secure signup/signin using JWT tokens
  * Password hashing via bcrypt
* 🗂️ **Content Management**

  * Add multiple types of content: `tweets`, `videos`, or `documents`
  * Store title, content, link(s), tags, and date
* 🏷️ **Dynamic Tagging**

  * Automatically creates new tag entries when adding content
  * Tags are linked to user and content for easy retrieval
* 📋 **Dashboard Interface**

  * Displays all user content as categorized cards with icons and tags
  * Add new entries via modal without page reload
* 🎨 **Modern Frontend**

  * Clean, responsive UI built with Tailwind CSS and React components
  * Organized structure with reusable UI elements (Card, Button, Sidebar, Modal)
* ⚙️ **Full TypeScript Support**

  * Strict type checking across backend and frontend
* 🔁 **RESTful API Integration**

  * Seamless communication via Axios and Express routes

---

## 🧩 Tech Stack

| Layer        | Technologies                                                          |
| ------------ | --------------------------------------------------------------------- |
| **Frontend** | React 19, Vite 6, TypeScript 5, React Router 7, Axios, Tailwind CSS 4 |
| **Backend**  | Node.js, Express 5, TypeScript, Mongoose, JWT, bcrypt, dotenv         |
| **Database** | MongoDB Atlas (Cloud-hosted NoSQL)                                    |

---

## 📁 Folder Structure

```
secondBrain/
│
├── secondBrainBackEnd/       # Express + TypeScript backend
│   ├── src/
│   │   ├── db.ts             # MongoDB connection and schema definitions
│   │   ├── Middleware.ts     # JWT authentication middleware
│   │   ├── routers/
│   │   │   └── users.ts      # Auth + content routes
│   │   └── server.ts         # Main Express app entry
│   ├── package.json
│   └── tsconfig.json
│
├── secondBrainFrontEnd/      # React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── pages/            # Signin, Signup, Dashboard, AddContent
│   │   ├── contents/         # Content rendering components
│   │   ├── components/       # Reusable UI elements
│   │   ├── icons/            # SVG React icons
│   │   ├── config.tsx        # Backend URL config
│   │   ├── App.tsx           # Route configuration
│   │   └── main.tsx          # Entry point
│   ├── vite.config.ts
│   └── package.json
│
└── README.md
```

---

## ⚙️ API Endpoints

### 🔑 Authentication

#### `POST /user/signup`

Create a new user account.

**Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "mypassword"
}
```

#### `POST /user/signin`

Login and receive JWT token.

**Body:**

```json
{
  "username": "john_doe",
  "password": "mypassword"
}
```

**Response:**

```json
{
  "message": "You are signed up",
  "token": "JWT_TOKEN"
}
```

---

### 📦 Content Management

#### `POST /user/content` (Protected)

Add new content entry.

**Headers:**

```
Authorization: JWT_TOKEN
```

**Body:**

```json
{
  "type": "video",
  "title": "Solana Intro",
  "content": "Exploring Solana Architecture",
  "links": "https://youtube.com/example",
  "tags": ["blockchain", "solana"],
  "date": "2025-11-06"
}
```

**Response:**

```json
{ "message": "Content added successfully!" }
```

#### `GET /user/content` (Protected)

Fetch all user’s content.

**Headers:**

```
Authorization: JWT_TOKEN
```

**Response:**

```json
[
  {
    "type": "document",
    "title": "AI Research Notes",
    "tags": ["machine-learning", "ai"],
    "date": "2025-11-06"
  }
]
```

---

## 💻 Getting Started

### Prerequisites

* Node.js (v18+)
* npm or yarn
* MongoDB Atlas (or local MongoDB instance)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/second-brain.git
cd second-brain
```

---

### 2️⃣ Setup Environment Variables

Create a `.env` file inside `secondBrainBackEnd/`:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/secondbrain
JWT_SECRET=your_jwt_secret
PORT=3030
```

---

### 3️⃣ Install Dependencies

#### Backend

```bash
cd secondBrainBackEnd
npm install
npm run build
npm start
```

#### Frontend

```bash
cd ../secondBrainFrontEnd
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.
Backend runs on `http://localhost:3030`.

