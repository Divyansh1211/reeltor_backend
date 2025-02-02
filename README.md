# User Management System with Notifications

## Overview
This project is a **User Management System with an Admin Panel**, allowing users to **register, update profiles, and send notifications** based on availability. Admins can send **critical and non-critical notifications** to users.

## Features
- **User Authentication** (Sign-up/Login with JWT)
- **Profile Management** (Name, Mobile, Bio, Availability Time)
- **Notification System** (Instant & Queued Notifications)
- **Admin Panel** (Send Critical/Non-Critical Notifications)
- **Automatic Notification Queue Processing** (via Cron Job)

---

## Installation & Setup
### 1. Clone the Repository
```bash
git clone https://github.com/Divyansh1211/reeltor_backend.git
cd reeltor_backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file and add the following:
```
MONGO_URI=mongodb+srv://your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the Project
```bash
npm start
```

---

## API Documentation

### **1. User Authentication**
#### **Sign Up**
**Endpoint:** `POST /api/v1/user/signup`
```json
{
  "email": "john@example.com",
  "password": "securepassword",
  "role": "admin" //default User
}
```
**Response:**
```json
{
  "success": true,
  "message": "user created successfully"
}
```

#### **Login**
**Endpoint:** `POST /api/v1/user/signin`
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "success": true,
  "token": "your_jwt_token"
}
```

---

### **2. Profile Management**
#### **Update Profile**
**Endpoint:** `PUT /api/v1/user/update`
**Headers:** `{ Authorization: Bearer your_jwt_token }`
```json
{
  "name": "John Updated",
  "mobile": "9876543210",
  "bio": "Senior Developer",
  "availabilityTime": "10:00-19:00"
}
```
**Response:**
```json
{
  "message": "Profile updated successfully"
}
```

---

### **3. Notification System**
#### **Send Notification**
**Endpoint:** `POST /api/notifications/send`
**Headers:** `{ Authorization: Bearer your_jwt_token }`
```json
{
  "senderId": "64a9fbb2c3b8e64a5e8b4f91",
  "recipientIds": ["64a9fbb2c3b8e64a5e8b4f92"],
  "message": "Hello, this is a test notification",
  "type": "non-critical"
}
```
**Response:**
```json
{
  "message": "Notifications processed",
  "data": [
    {
      "_id": "notif123",
      "status": "queued",
      "sentAt": "2024-02-02T12:15:00Z"
    }
  ]
}
```

#### **Fetch User Notifications**
**Endpoint:** `GET /api/notifications/{userId}`
**Headers:** `{ Authorization: Bearer your_jwt_token }`
**Response:**
```json
[
  {
    "message": "Reminder!",
    "status": "delivered",
    "sentAt": "2024-02-02T12:15:00Z"
  }
]
```

---

## **Automated Notification Queue Processing**
The server runs a **cron job every 10 minutes** to check for queued notifications and deliver them when recipients are available.

---

## Deployment
To deploy, you can use:
- **Render** (recommended)
- **Heroku**
- **AWS Free Tier**

Example deployment on Render:
1. Push your code to GitHub.
2. Connect your repository to **Render**.
3. Set up environment variables.
4. Deploy the service.

---

## **Testing**
- Use **Postman** to test the API endpoints.
- Ensure **MongoDB is running** locally or using **MongoDB Atlas**.
- Use **JWT tokens** for authentication.

---

## **Future Improvements**
- Implement WebSockets for real-time notifications.
- Add email/SMS notification options.
- Build a frontend (React/Next.js) to manage users and notifications.

🚀 **Project Complete! Let me know if you need any modifications.**

