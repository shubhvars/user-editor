# 📚 User Manual Content Management System

A comprehensive content management system for creating, managing, and displaying user manual documentation. This full-stack application features a modern admin portal for content editing and a beautiful public-facing user manual interface.

## 🌟 Features

### Admin Portal
- **Rich Text Editor** - Powered by TipTap with extensive formatting options
- **Content Management** - Create, read, update, and delete documentation
- **Category Organization** - Group content by categories (Getting Started, Installation, Configuration, etc.)
- **Version Control** - Publish/unpublish content with toggle functionality
- **Order Management** - Control the display order of documentation sections
- **Live Preview** - Real-time preview of content before publishing

### User Manual
- **Clean Interface** - Modern, responsive design for optimal reading experience
- **Smart Navigation** - Category-based sidebar with active section highlighting
- **Smooth Scrolling** - Seamless navigation between documentation sections
- **Search Functionality** - Quick content search (ready to implement)
- **Mobile Responsive** - Optimized for all screen sizes

## 🏗️ Project Structure

```
user-manual/
├── backend/                      # Express.js API Server
│   ├── config/
│   │   ├── db.js                # MongoDB connection configuration
│   │   └── cloudinary.js        # Cloudinary image upload config
│   ├── controllers/
│   │   └── contentController.js # Content CRUD operations
│   ├── models/
│   │   └── Content.js           # Mongoose content schema
│   ├── routes/
│   │   ├── contentRoutes.js     # Content API routes
│   │   └── uploadRoutes.js      # Image upload routes
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server entry point
│   └── package.json             # Backend dependencies
│
├── admin-portal/                 # React Admin Dashboard
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContentEditor/   # Content creation/editing component
│   │   │   │   ├── ContentEditor.jsx
│   │   │   │   └── ContentEditor.css
│   │   │   ├── ContentList/     # Content listing dashboard
│   │   │   │   ├── ContentList.jsx
│   │   │   │   └── ContentList.css
│   │   │   ├── Editor/          # TipTap rich text editor wrapper
│   │   │   │   ├── Editor.jsx
│   │   │   │   └── Editor.css
│   │   │   └── UserManual/      # Public-facing manual view
│   │   │       ├── UserManual.jsx
│   │   │       └── UserManual.css
│   │   ├── services/
│   │   │   └── api.js           # API client and service functions
│   │   ├── App.jsx              # Main app component with routing
│   │   ├── main.jsx             # React app entry point
│   │   └── index.css            # Global styles
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   └── package.json             # Frontend dependencies
│
├── .gitignore                   # Git ignore rules
├── README.md                    # Project documentation (this file)
├── user-manual.pdf              # Source PDF document
└── [Python Scripts]             # PDF extraction utilities
    ├── extract_pdf.py
    ├── deep_extract.py
    ├── extract_images.py
    └── extract_all_images.py
```

## 🛠️ Technology Stack

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime environment | - |
| **Express.js** | Web framework | ^4.18.2 |
| **MongoDB** | NoSQL database | - |
| **Mongoose** | MongoDB ODM | ^8.0.3 |
| **CORS** | Cross-origin resource sharing | ^2.8.5 |
| **Dotenv** | Environment variable management | ^16.3.1 |
| **Cloudinary** | Image hosting and management | ^1.41.3 |

### Frontend (Admin Portal)
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | ^18.2.0 |
| **React Router** | Client-side routing | ^6.21.1 |
| **Vite** | Build tool and dev server | ^5.0.8 |
| **TipTap** | Rich text editor | ^2.1.13 |
| **TipTap Extensions** | Editor features (color, highlight, image, link, etc.) | ^2.1.13 |

### Development Tools
- **Vite** - Fast frontend build tool
- **Python** - PDF extraction scripts
- **Git** - Version control

## 📋 Prerequisites

Before setting up this project, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Python 3** (for PDF extraction scripts) - [Download](https://www.python.org/)
- **Cloudinary Account** (optional, for image uploads) - [Sign up](https://cloudinary.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd user-manual
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/user-manual
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user-manual?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# Cloudinary Configuration (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Admin Portal Setup

Navigate to the admin-portal directory and install dependencies:

```bash
cd ../admin-portal
npm install
```

## 🎯 Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The backend API will be available at: **http://localhost:5000**

**Available Endpoints:**
- `GET /api/health` - Health check
- `GET /api/content` - Get all content
- `GET /api/content/:id` - Get content by ID
- `GET /api/content/slug/:slug` - Get content by slug
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content
- `PATCH /api/content/:id/toggle-publish` - Toggle publish status

### Start the Admin Portal

```bash
cd admin-portal
npm run dev
```

The admin portal will be available at: **http://localhost:5173**

**Available Routes:**
- `/` - Dashboard with content list
- `/create` - Create new content
- `/edit/:id` - Edit existing content
- `/manual` - Public user manual view

## 📊 Database Schema

### Content Model

```javascript
{
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    // Auto-generated from title
  },
  content: {
    type: String,
    required: true,
    // Rich HTML content from TipTap editor
  },
  category: {
    type: String,
    default: 'General'
    // Options: General, Getting Started, Installation, 
    // Configuration, Features, API, FAQ, Troubleshooting
  },
  order: {
    type: Number,
    default: 0
    // Controls display order in the manual
  },
  isPublished: {
    type: Boolean,
    default: false
    // Only published content is visible in the public manual
  },
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
}
```

**Key Features:**
- Automatic slug generation from title
- Slug updates when title changes
- Content sorted by category, order, and creation date
- Publish/unpublish functionality

## 🎨 Features Deep Dive

### Rich Text Editor (TipTap)

The content editor includes the following formatting options:

**Text Formatting:**
- Bold, Italic, Underline, Strike-through
- Code inline and code blocks
- Headings (H1-H6)
- Paragraph text alignment (left, center, right, justify)

**Lists & Structure:**
- Bullet lists
- Ordered lists
- Blockquotes
- Horizontal rules

**Advanced Features:**
- Text color customization
- Text highlighting
- Hyperlinks
- Image embedding
- Placeholder text

**Editor Actions:**
- Undo/Redo
- Clear formatting
- Live preview

### Content Organization

**Categories Available:**
1. General
2. Getting Started
3. Installation
4. Configuration
5. Features
6. API
7. FAQ
8. Troubleshooting

**Custom Categories:**
You can add more categories by modifying the `categories` array in [`ContentEditor.jsx`](file:///c:/Users/Shubh%20Varshney/Downloads/user-manual/admin-portal/src/components/ContentEditor/ContentEditor.jsx) (line 97).

### API Integration

The API client is located at [`admin-portal/src/services/api.js`](file:///c:/Users/Shubh%20Varshney/Downloads/user-manual/admin-portal/src/services/api.js) and provides:

```javascript
// Content operations
getAllContent(published)    // Get all content, optionally filter by published status
getContentById(id)          // Get single content by ID
createContent(data)         // Create new content
updateContent(id, data)     // Update existing content
deleteContent(id)           // Delete content
togglePublish(id)           // Toggle publish status
```

## 🔧 Configuration

### Backend Configuration

**Environment Variables** (`.env`):
```env
MONGODB_URI=<your-mongodb-uri>
PORT=5000
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=<optional>
CLOUDINARY_API_KEY=<optional>
CLOUDINARY_API_SECRET=<optional>
```

**CORS Settings** ([`server.js`](file:///c:/Users/Shubh%20Varshney/Downloads/user-manual/backend/server.js)):
- Currently set to allow all origins (`*`) for development
- For production, update to specific domains

**Body Parser Limits:**
- Max payload: 50MB (supports base64 images)

### Frontend Configuration

**API Endpoint** ([`services/api.js`](file:///c:/Users/Shubh%20Varshney/Downloads/user-manual/admin-portal/src/services/api.js)):
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**Vite Configuration** ([`vite.config.js`](file:///c:/Users/Shubh%20Varshney/Downloads/user-manual/admin-portal/vite.config.js)):
- React plugin for JSX support
- Default dev server port: 5173

## 📝 Usage Guide

### Creating Content

1. Navigate to **Admin Portal** (`http://localhost:5173`)
2. Click **"➕ New Content"** in the header
3. Fill in the form:
   - **Title**: Enter a descriptive title
   - **Content**: Use the rich text editor to format your content
   - **Category**: Select appropriate category
   - **Order**: Set display order (lower numbers appear first)
   - **Publish**: Check to make content visible immediately
4. Click **"✅ Create Content"**

### Editing Content

1. From the dashboard, click **"✏️"** icon on any content card
2. Modify the content as needed
3. Click **"💾 Update Content"**

### Publishing/Unpublishing

- Use the **toggle switch** on content cards in the dashboard
- Or check/uncheck **"Publish immediately"** in the editor

### Viewing the User Manual

1. Click **"🌐 View Manual"** in the header
2. Or navigate directly to `/manual` route
3. Use the sidebar to navigate between sections
4. Scroll naturally - active section highlights automatically

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if MongoDB is running
- Verify `.env` file exists with correct `MONGODB_URI`
- Check if port 5000 is already in use

**Frontend can't connect to backend:**
- Ensure backend server is running on port 5000
- Check API_BASE_URL in `services/api.js`
- Verify CORS settings in `server.js`

**Content not appearing in manual:**
- Ensure content is published (toggle switch enabled)
- Check browser console for API errors
- Verify MongoDB connection and data

**Editor not loading:**
- Clear browser cache
- Check TipTap dependencies are installed
- Review browser console for errors

### Database Connection Issues

**MongoDB Local:**
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service (Windows)
net start MongoDB

# Start MongoDB service (Mac/Linux)
sudo systemctl start mongod
```

**MongoDB Atlas:**
- Verify your IP is whitelisted
- Check username/password are correct
- Ensure database user has proper permissions

## 📦 Production Deployment

### Backend Deployment

1. **Set environment variables**:
   ```env
   NODE_ENV=production
   MONGODB_URI=<production-mongodb-uri>
   PORT=5000
   ```

2. **Update CORS settings** in [`server.js`](file:///c:/Users/Shubh%20Varshney/Downloads/user-manual/backend/server.js):
   ```javascript
   app.use(cors({
       origin: 'https://yourdomain.com',
       methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
       allowedHeaders: ['Content-Type', 'Authorization']
   }));
   ```

3. **Start server**:
   ```bash
   npm start
   ```

### Frontend Deployment

1. **Update API endpoint** in [`services/api.js`](file:///c:/Users/Shubh%20Varshney/Downloads/user-manual/admin-portal/src/services/api.js):
   ```javascript
   const API_BASE_URL = 'https://your-backend-domain.com/api';
   ```

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Deploy the `dist` folder** to your hosting service:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - GitHub Pages
   - Any static hosting service

## 🔐 Security Considerations

> **⚠️ IMPORTANT:** This application currently has **NO AUTHENTICATION**. All admin routes are publicly accessible.

### Recommended Security Enhancements

1. **Add Authentication:**
   - Implement JWT-based authentication
   - Add login/logout functionality
   - Protect admin routes with middleware

2. **Input Validation:**
   - Add request validation (e.g., using `joi` or `express-validator`)
   - Sanitize HTML content to prevent XSS attacks

3. **Rate Limiting:**
   - Implement rate limiting on API endpoints
   - Use packages like `express-rate-limit`

4. **HTTPS:**
   - Always use HTTPS in production
   - Enforce secure connections

5. **Environment Security:**
   - Never commit `.env` files
   - Use secure secrets management in production

## 📚 Additional Scripts

### PDF Extraction Scripts

The project includes Python scripts for extracting content from PDF files:

- `extract_pdf.py` - Basic PDF text extraction
- `deep_extract.py` - Advanced extraction with better formatting
- `extract_images.py` - Extract images from PDF
- `extract_all_images.py` - Batch image extraction

**Note:** These scripts are currently gitignored. Contact the project maintainer for access.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Support

For issues, questions, or contributions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section above

## 🎉 Acknowledgments

- **TipTap** - Excellent rich text editor
- **React** - UI library
- **Express.js** - Backend framework
- **MongoDB** - Database
- **Vite** - Lightning-fast build tool

---

**Made with ❤️ for ERPICA**

*Last Updated: January 2026*
