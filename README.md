# Webex Contact Center Audio Files Integration

A comprehensive MERN stack (MongoDB, Express.js, React, Node.js) application that demonstrates how to integrate with the Webex Contact Center Audio Files API. This full-stack web application enables administrators to manage .wav audio files that can be played to customers in queues or during call hold scenarios in Webex Contact Center environments.

## 🎯 Features

This sample demonstrates how to use the Webex Contact Center Audio Files API to:

* **Upload audio files** (.wav format) to your Webex Contact Center organization
* **List existing audio files** with metadata and playback controls
* **Update audio file properties** such as name and description
* **Delete audio files** from your organization
* **OAuth authentication** integration with Webex Contact Center
* **Real-time file management** with modern React UI
* **Secure API integration** using proper authentication flows

## 📚 Integration Overview

This application integrates with Webex Contact Center to manage audio files that can be:
- Played to customers when calls are queued until distributed to available agents
- Integrated into Routing Strategies for hold music
- Used for various customer experience scenarios

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 14+ from [nodejs.org](https://nodejs.org/)
- **MongoDB**: Local instance or cloud service like MongoDB Atlas
- **Webex Contact Center**: Administrator role and developer sandbox access
- **Webex Integration**: Registered integration with proper scopes

### Getting Your Webex Integration

1. **Register Integration**: Go to [Webex Contact Center Developer Portal](https://developer.webex-cx.com/)
2. **Sign in** with your Webex account
3. **Navigate to**: My Webex Apps from the menu under your avatar
4. **Create Integration** with:
   - **Required Scopes**: `cjp:config_write` AND `cjp:config_read` AND `openid` AND `email` AND `profile`
   - **Redirect URI**: `http://localhost:5173/oauth` (for development)
5. **Save** your Client ID and Client Secret (shown only once!)

> **Administrator Role Required**: You need administrator privileges to manage audio files. Get a developer sandbox [here](https://developer.webex-cx.com/sandbox).

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Joezanini/audio_files_int_wxcc.git
   cd audio_files_int_wxcc
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your values:
   ```bash
   MONGO_URI=mongodb+srv://YOURCLUSTER.mongodb.net/
   PORT=5000
   CLIENT_ID=YOUR_WXCC_CLIENTID
   CLIENT_SECRET=YOUR_WXCC_CLIENTSECRET
   REDIRECT_URI=http://localhost:5173/oauth
   ```

3. **Update OAuth URL** in [`frontend/src/pages/Home.jsx`](frontend/src/pages/Home.jsx):
   ```javascript
   const oauthApi = 'https://webexapis.com/v1/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Foauth&scope=spark%3Akms%20cjp%3Aconfig_write%20cjp%3Aconfig_read%20openid%20email%20profile&state=set_state_here';
   ```

4. **Install dependencies and start backend**:
   ```bash
   npm install
   npm run dev
   ```

5. **Install frontend dependencies and start** (new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

6. **Access the application**: Open your browser to the URL shown in terminal (typically `http://localhost:5173`)

## 📁 Project Structure

```
audio_files_int_wxcc/
├── backend/                    # Express.js backend server
│   ├── config/                 # Database configuration
│   ├── controllers/            # API endpoint controllers
│   │   └── audiofile.controller.js  # Audio file CRUD operations
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   │   ├── audiofile.route.js  # Audio file endpoints
│   │   └── user.route.js       # User authentication routes
│   ├── utils/                  # Utility functions
│   └── server.js              # Main server file
├── frontend/                   # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Application pages
│   │   │   ├── Home.jsx        # Login/OAuth entry point
│   │   │   ├── OAuth.jsx       # OAuth callback handler
│   │   │   ├── Audiofiles.jsx  # Audio files management
│   │   │   ├── Upload.jsx      # File upload interface
│   │   │   └── Update.jsx      # File update interface
│   │   ├── store/              # State management
│   │   └── App.jsx            # Main React application
│   ├── vite.config.js         # Vite configuration
│   └── package.json           # Frontend dependencies
├── .env.example               # Environment variables template
├── package.json               # Backend dependencies
└── README.md                  # This file
```

## 🔧 API Integration

### Webex Contact Center Audio Files API

| Operation | Endpoint | Description | Implementation |
|-----------|----------|-------------|----------------|
| **Create** | `POST /organization/{orgid}/audio-file` | Upload new audio file | `createAudioFile()` |
| **List** | `GET /organization/{orgid}/v2/audio-file` | Retrieve all audio files | `listAudioFiles()` |
| **Update** | `PATCH /organization/{orgid}/audio-file/{id}` | Partially update file metadata | `patchAudioFile()` |
| **Delete** | `DELETE /organization/{orgid}/audio-file/{id}` | Remove audio file | `deleteAudioFile()` |

### Authentication Flow

The application uses OAuth 2.0 authorization code flow:

1. **Redirect to Webex**: User clicks "Login with Webex"
2. **User Authorization**: Webex prompts for permission
3. **Authorization Code**: Webex redirects with code
4. **Token Exchange**: Backend exchanges code for access token
5. **API Access**: Use token for Webex Contact Center API calls

## 🎨 User Interface

### Technology Stack

- **React 19**: Modern UI framework with hooks
- **Chakra UI**: Component library for consistent design
- **React Router**: Client-side routing
- **Zustand**: Lightweight state management
- **Vite**: Fast development and build tool

### Key Components

- **Home Page**: OAuth login entry point with Webex branding
- **Audio Files Manager**: List, play, and manage uploaded files
- **Upload Interface**: Drag-and-drop file upload with validation
- **Update Modal**: Edit file metadata and properties
- **Responsive Design**: Works on desktop and mobile devices

## 🔐 Authentication & Security

### OAuth 2.0 Implementation

```javascript
// OAuth redirect in Home.jsx
const oauthApi = 'https://webexapis.com/v1/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Foauth&scope=spark%3Akms%20cjp%3Aconfig_write%20cjp%3Aconfig_read%20openid%20email%20profile';

function redirectOauth() {
  location.href = oauthApi;
}
```

### Required Scopes

- `cjp:config_write`: Create and modify audio files
- `cjp:config_read`: Read audio file information
- `openid`: OpenID Connect authentication
- `email`: User email access
- `profile`: User profile information

## 📡 Backend Implementation

### Express.js Server Structure

```javascript
// server.js - Main server setup
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import audiofileRoutes from "./routes/audiofile.route.js";

const app = express();
app.use(express.json());
app.use("/api/audiofiles", audiofileRoutes);
```

### File Upload Handling

```javascript
// audiofile.route.js - Multer configuration
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single('file'), createAudioFile);
```

### Database Integration

- **MongoDB**: Document storage for user data and file metadata
- **Mongoose**: ODM for schema validation and queries
- **Models**: User authentication and audio file tracking

## 🌐 Frontend Implementation

### React Router Configuration

```javascript
// App.jsx - Route structure
<Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/audiofiles' element={<Audiofiles/>} />
  <Route path='/oauth' element={<OAuth/>} />
  <Route path='/upload' element={<Upload />} />
  <Route path='/update' element={<Update />} />
</Routes>
```

### State Management

- **Zustand**: Lightweight state management for user authentication
- **React Hooks**: Local component state for UI interactions
- **Context**: Shared authentication state across components

## 🚀 Development

### Local Development Setup

1. **Backend Development**:
   ```bash
   npm run dev  # Uses nodemon for auto-restart
   ```

2. **Frontend Development**:
   ```bash
   cd frontend
   npm run dev  # Vite dev server with HMR
   ```

3. **Production Build**:
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

### Development Tools

- **Nodemon**: Auto-restart backend on file changes
- **Vite**: Fast frontend development with Hot Module Replacement
- **ESLint**: Code linting and formatting
- **MongoDB Compass**: Database visualization and management

## 📝 Code Examples

### Audio File Upload

```javascript
// Example upload implementation
const uploadAudioFile = async (file, metadata) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', metadata.name);
  formData.append('description', metadata.description);
  
  const response = await fetch('/api/audiofiles', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  return response.json();
};
```

### Audio File Listing

```javascript
// Example list retrieval
const listAudioFiles = async () => {
  const response = await fetch('/api/audiofiles', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  const audioFiles = await response.json();
  return audioFiles;
};
```

## 🔧 Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://cluster.mongodb.net/` |
| `PORT` | Backend server port | `5000` |
| `CLIENT_ID` | Webex Contact Center client ID | `YOUR_WXCC_CLIENTID` |
| `CLIENT_SECRET` | Webex Contact Center client secret | `YOUR_WXCC_CLIENTSECRET` |
| `REDIRECT_URI` | OAuth redirect URI | `http://localhost:5173/oauth` |

### Port Configuration

> **Important**: If you change the `PORT` from 5000, update the proxy configuration in [`frontend/vite.config.js`](frontend/vite.config.js):

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000'  // Update port here
    }
  }
});
```

## 🛠️ Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **OAuth redirect fails** | Verify redirect URI matches integration settings |
| **Upload fails** | Check file format (.wav only) and size limits |
| **API authentication errors** | Confirm scopes and token validity |
| **Frontend proxy errors** | Ensure backend is running on correct port |
| **MongoDB connection fails** | Verify connection string and network access |

### Debug Steps

1. **Check browser console** for JavaScript errors
2. **Verify environment variables** are loaded correctly
3. **Test API endpoints** directly with tools like Postman
4. **Monitor network tab** for failed requests
5. **Check backend logs** for server errors

## 🔒 Security Considerations

### Production Deployment

1. **Environment Security**:
   - Never commit `.env` files to version control
   - Use secure environment variable management
   - Rotate client secrets regularly

2. **Authentication**:
   - Implement proper token refresh mechanisms
   - Add rate limiting to API endpoints
   - Validate file uploads thoroughly

3. **File Security**:
   - Scan uploaded files for malware
   - Implement file size and type restrictions
   - Use secure file storage solutions

## 📚 Learning Path

1. **Understand Webex Contact Center**: Learn about audio file use cases in contact centers
2. **Study OAuth Flow**: Understand authorization code flow implementation
3. **Explore MERN Stack**: Familiarize yourself with MongoDB, Express, React, Node.js
4. **Practice API Integration**: Work with RESTful APIs and file uploads
5. **Build Extensions**: Add features like batch upload, audio preview, or file conversion

## 🔗 Related Resources

- [Webex Contact Center Developer Portal](https://developer.webex-cx.com/)
- [Audio Files API Documentation](https://developer.webex-cx.com/documentation/integrations)
- [Webex Contact Center Sandbox](https://developer.webex-cx.com/sandbox)
- [OAuth 2.0 Authorization Code Flow](https://developer.webex.com/docs/oauth)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Chakra UI Components](https://chakra-ui.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes and test thoroughly
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature/new-feature`)
6. Submit a pull request

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🆘 Support

- **Issues**: Create an issue in this repository
- **Webex Developer Support**: Visit [Webex Developer Support](https://developer.webex.com/support)
- **Contact Center Documentation**: Check [Webex Contact Center Docs](https://developer.webex-cx.com/documentation)
- **Community**: Join the [Webex Developer Community](https://developer.webex.com/community)

---

**Repository**: https://github.com/Joezanini/audio_files_int_wxcc
