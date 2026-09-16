# Eduzyra with Chatbot — Final Organized Project

This is a cleaned-up, order-wise version of the uploaded project. Everything has
been grouped into logical folders. `node_modules`, `.git` history, and stray
log files were removed to keep the package small — just run `npm install` in
`backend/` and `frontend/` to restore dependencies.

## Folder Structure

```
Eduzyra-Final/
├── backend/              # Node.js/Express API (eduzyra-backend)
│   ├── src/
│   │   ├── controllers/  # Route handlers (auth, courses, payments, etc.)
│   │   ├── models/       # Mongoose models (User, Course, Order, etc.)
│   │   ├── routes/       # Express route definitions
│   │   ├── middleware/   # Auth, upload, error handling
│   │   ├── services/     # Email service, etc.
│   │   ├── validators/   # Request validation
│   │   ├── utils/        # Helpers (logger, tokens, OTP, etc.)
│   │   ├── data/         # Seed data & seed runner
│   │   └── config/       # DB & Cloudinary config
│   ├── server.js         # Main server entry point
│   ├── server-mem.js     # In-memory DB variant (for testing)
│   ├── package.json
│   ├── Dockerfile
│   ├── .env / .env.example
│   └── CERTIFICATE_TESTING.md
│
├── frontend/              # React + Vite app (eduzyra-althexus)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── constants/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── docs/                   # Project documentation
│   ├── CHANGES.md
│   ├── DEPLOYMENT.md
│   ├── CERTIFICATE_DEBUGGING_GUIDE.md
│   ├── CERTIFICATE_FIX_SUMMARY.md
│   └── CERTIFICATE_QUICK_START.md
│
├── docker-compose.yml       # Combined backend+frontend docker setup
└── root-package-lock.json   # Original root-level lockfile
```

## Getting Started

1. **Backend**
   ```
   cd backend
   npm install
   cp .env.example .env   # fill in real values
   npm start               # or: node server.js
   ```

2. **Frontend**
   ```
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Docker (both together)**
   ```
   docker-compose up --build
   ```

See `docs/DEPLOYMENT.md` and `docs/CHANGES.md` for more details, and the
`CERTIFICATE_*` docs for certificate-generation-related debugging.
