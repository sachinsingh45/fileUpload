# 📁 File Upload Backend API

## 🚀 Overview
The **File Upload API** is a backend service built with **Express.js** that allows users to upload and manage files, including images and videos, using **Cloudinary**. It supports:

- ✅ **Local file uploads**
- ✅ **Image uploads to Cloudinary**
- ✅ **Video uploads to Cloudinary**
- ✅ **Image size reduction**

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **Multer** (for handling file uploads)
- **Cloudinary** (for cloud storage)

## 📌 Features
- 📂 **Local file storage**
- ☁️ **Cloudinary integration for image/video uploads**
- 🔄 **Image compression for optimized storage**
- 📜 **Detailed API response handling**

## 🔧 Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/sachinsingh45/fileUpload.git
cd fileUpload
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Set up environment variables
Create a **.env** file and add the following:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

### 4️⃣ Start the server
```sh
npm start
```

## 📡 API Endpoints

### 1️⃣ **Upload File Locally**
```http
POST /api/v1/fileUpload/localFileUpload
```
**Request:**
- `multipart/form-data` with a file

**Response:**
```json
{
  "success": true,
  "message": "Local File Uploaded Successfully"
}
```

---
### 2️⃣ **Upload Image to Cloudinary**
```http
POST /api/v1/fileUpload/imageUpload
```
**Request:**
- `multipart/form-data` with an image file

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://res.cloudinary.com/..."
}
```

---
### 3️⃣ **Upload Video to Cloudinary**
```http
POST /api/v1/fileUpload/videoUpload
```
**Request:**
- `multipart/form-data` with a video file

**Response:**
```json
{
  "success": true,
  "videoUrl": "https://res.cloudinary.com/..."
}
```

---
### 4️⃣ **Reduce Image Size**
```http
POST /api/v1/fileUpload/imageSizeReducer
```
**Request:**
- `multipart/form-data` with an image file

**Response:**
```json
{
  "success": true,
  "compressedImageUrl": "https://res.cloudinary.com/..."
}
```

## 🔥 Contributing
Feel free to contribute by opening an issue or submitting a pull request!
