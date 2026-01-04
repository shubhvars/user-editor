# 📚 User Manual Content Management System

A complete MERN stack solution for managing and displaying user manual content with a rich text editor.

## 🏗️ Architecture

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│   Admin Portal      │     │   Express API       │     │   MongoDB           │
│   (React + TipTap)  │────▶│   (Port 5000)       │────▶│   (Atlas/Local)     │
│   Port 3000         │     │                     │     │                     │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
                                      │
                                      ▼
                            ┌─────────────────────┐
                            │  User Manual Page   │
                            │  (Static HTML/JS)   │
                            └─────────────────────┘
```

## 📁 Project Structure

```
user-manual/
├── backend/                 # Express API Server
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   └── contentController.js
│   ├── models/
│   │   └── Content.js      # Mongoose schema
│   ├── routes/
│   │   └── contentRoutes.js
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env                # Environment variables
├── admin-portal/           # React Admin Dashboard
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor/     # TipTap rich text editor
│   │   │   ├── ContentList/# Dashboard view
│   │   │   └── ContentEditor/
│   │   ├── services/
│   │   │   └── api.js      # API service
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── user-manual-page/       # Public-facing manual page
    ├── index.html
    ├── styles.css
    └── script.js
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Setup MongoDB

**Option A: MongoDB Atlas (Recommended - Free)**
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Get your connection string

**Option B: Local MongoDB**
```bash
# Windows with Chocolatey
choco install mongodb

# Or download from mongodb.com
```

### 2. Configure Backend

```bash
# Navigate to backend
cd backend

# Update .env file with your MongoDB connection string
# Edit backend/.env:
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/user-manual?retryWrites=true&w=majority
PORT=5000

# Install dependencies
npm install

# Start the server
npm run dev
```

Server will start at `http://localhost:5000`

### 3. Setup Admin Portal

```bash
# Open new terminal
cd admin-portal

# Install dependencies
npm install

# Start development server
npm run dev
```

Admin portal will open at `http://localhost:3000`

### 4. View User Manual Page

```bash
# Option 1: Use Live Server extension in VS Code
# Right-click on user-manual-page/index.html → "Open with Live Server"

# Option 2: Use npx serve
cd user-manual-page
npx serve .
```

## 📖 Features

### Admin Portal
- ✏️ **Rich Text Editor** (TipTap) with:
  - Bold, Italic, Underline, Strikethrough
  - Headings (H1, H2, H3)
  - Bullet & Numbered lists
  - Text alignment
  - Blockquotes & Code blocks
  - Links & Images
  - Highlight text
  - Undo/Redo

- 📋 **Content Management**
  - Create, Edit, Delete content
  - Organize by categories
  - Set display order
  - Toggle publish status
  - Live preview mode

### User Manual Page
- 📚 Auto-loading from API
- 🧭 Sidebar navigation with categories
- 🎯 Scroll spy for active sections
- 🌙 Dark mode UI
- 📱 Responsive design

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/content` | Get all content |
| GET | `/api/content?published=true` | Get published content only |
| GET | `/api/content/:id` | Get single content |
| GET | `/api/content/slug/:slug` | Get content by slug |
| POST | `/api/content` | Create content |
| PUT | `/api/content/:id` | Update content |
| DELETE | `/api/content/:id` | Delete content |
| PATCH | `/api/content/:id/toggle-publish` | Toggle publish status |
| GET | `/api/health` | Health check |

## 💾 Data Model

```javascript
{
  title: String,        // "Getting Started"
  slug: String,         // "getting-started" (auto-generated)
  content: String,      // HTML content from TipTap
  category: String,     // "Introduction", "Setup", etc.
  order: Number,        // Display order (1, 2, 3...)
  isPublished: Boolean, // true = visible on main site
  createdAt: Date,
  updatedAt: Date
}
```

## 💰 Cost (All Free!)

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| MongoDB Atlas | Free Tier (512MB) | $0 |
| TipTap Editor | Open Source | $0 |
| React + Vite | Open Source | $0 |
| Express.js | Open Source | $0 |
| **Total** | | **$0** |

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TipTap Editor
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Vanilla CSS with CSS Variables

## 📝 License

MIT License - Free to use and modify
