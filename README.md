<div align="center">
  <h1>BuddyBank</h1>
  <p><strong>Your Personal Contact Manager with Style</strong></p>
</div>

## 📝 Description
BuddyBank is a modern contact management system that helps you organize and manage your contacts efficiently. Built with Node.js, Express, and MongoDB, it provides a seamless experience for storing and accessing your contacts.

## ✨ Features

- **👤 User Authentication**
  - Secure signup and signin
  - Session management
  - Password protection

- **📱 Contact Management**
  - Create, read, update, and delete contacts
  - Modern card-based UI
  - Real-time updates
  - Animated interactions

- **📁 File Management**
  - Upload profile pictures
  - Image preview
  - File storage system

- **🎨 Modern UI/UX**
  - Responsive design
  - Gradient animations
  - Clean and minimalist interface
  - Mobile-friendly layout

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: Passport.js
- **Frontend**: EJS, CSS3, JavaScript
- **File Upload**: Multer
- **Session Management**: Express-session
- **Others**: 
  - Cookie-parser
  - Connect-mongo
  - Express-flash

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/buddybank.git
cd buddybank
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
MONGOURL=your_mongodb_atlas_url
SESSION_SECRET=your_session_secret
PORT=8000
```

4. **Start the application**
```bash
# Development
npm run dev

# Production
npm start
```

## 🌐 Deployment

This application is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy!

## 📁 Project Structure



## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGOURL` | MongoDB Atlas connection string |
| `SESSION_SECRET` | Secret for session management |
| `PORT` | Application port (default: 8000) |

## 🛠️ API Endpoints

### Authentication
- `GET /signup` - Signup page
- `POST /signup` - Create new user
- `GET /signin` - Signin page
- `POST /signin` - Authenticate user
- `GET /signout` - Logout user

### Contacts
- `GET /` - List all contacts
- `POST /aboutme` - Create new contact
- `GET /delete/:id` - Delete contact
- `GET /update/:id` - Update contact form
- `POST /update/:id` - Update contact

### File Upload
- `GET /upload` - Upload form
- `POST /upload` - Upload file
- `GET /showImages` - View uploaded files

### 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Modern UI inspiration from Google Contacts
- MongoDB Atlas for database hosting
- Vercel for deployment
- Node.js community for amazing packages




---
<br>

<div align="center">
  Made with ❤️ by Rahul Mahato
</div>
