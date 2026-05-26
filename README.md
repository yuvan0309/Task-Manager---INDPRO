# Task Manager

> A full-stack Kanban-style task manager with drag-and-drop, JWT auth, and Supabase backend.

## Live Links
- Frontend: [Vercel URL]
- Backend: [Render URL]

## Tech Stack

| Layer | Stack |
| --- | --- |
| Frontend | React 18, Vite, Tailwind CSS v3, @dnd-kit/core, @dnd-kit/sortable, axios, react-hot-toast, react-router-dom v6 |
| Backend | Node.js, Express, jsonwebtoken, bcryptjs, @supabase/supabase-js, cors, dotenv |
| Database | Supabase PostgreSQL |
| Hosting | Vercel (frontend), Render (backend), Supabase (database) |

## Features
- JWT-based register and login
- Kanban board with Todo / In Progress / Done columns
- Drag and drop tasks between stages
- Create, edit, and delete tasks
- Priority levels: Low / Medium / High
- Skeleton loaders and toast notifications
- Fully responsive mobile-first layout

## AI Usage Disclosure
This project was built with AI assistance (GitHub Copilot + Gemini 2.5 Pro).
AI was used for: component scaffolding, middleware boilerplate, Tailwind styling, SQL schema.

Architecture decisions, integration, debugging, and deployment were done manually.

## Assumptions
- Single-user task board
- JWT expiry is 7 days
- No email verification
- Tasks are private per user

## Tradeoffs
- JWT over sessions: stateless and simpler on free-tier Render
- Supabase over MongoDB Atlas: relational structure fits users and tasks well
- Re-fetch after mutations instead of optimistic updates: simpler and keeps client state aligned with the database
- No real-time sync: would require Supabase Realtime subscriptions

## Local Setup

### 1. Clone
```bash
git clone <repo-url>
cd task-manager
```

### 2. Backend
```bash
cd server
cp .env.example .env
npm install
node index.js
```

### 3. Frontend
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

### 4. Database
Run `server/db/schema.sql` in your Supabase SQL editor.

## Deployment

### Frontend
- Deploy `client/` to Vercel
- Set `VITE_API_URL` to your backend URL

### Backend
- Deploy `server/` to Render as a Node web service
- Set `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `JWT_SECRET`, and `FRONTEND_URL`
- Use `PORT` from the host environment

### Database
- Use Supabase free tier
- Run the schema SQL once to create the `users` and `tasks` tables

## Project Structure
```txt
task-manager/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── TaskCard.jsx
│   │   │   ├── KanbanColumn.jsx
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── TaskModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SkeletonCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── hooks/
│   │   │   └── useTasks.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.example
├── server/
│   ├── db/
│   │   ├── supabase.js
│   │   └── schema.sql
│   ├── middleware/
│   │   └── verifyToken.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── index.js
│   ├── .env.example
│   └── package.json
├── README.md
└── .gitignore
