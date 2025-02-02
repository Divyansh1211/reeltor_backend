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
  "role": "admin" //default user
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

**Endpoint:** `POST /api/v1/user/update`
**Headers:** `{ Authorization: Bearer your_jwt_token }`

```json
// All fiels are optional
{
  "name": "John Updated",
  "mobileNumber": "9876543210",
  "bio": "Senior Developer",
  "availabilityTime": "10:00-19:00"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User updated successfully"
}
```

---

### **3. Notification System**

#### **Send Notification (User)**

**Endpoint:** `POST /api/v1/notification/send`
**Headers:** `{ Authorization: Bearer your_jwt_token(user) }`

```json
{
  "recipientIds": ["679e7d2ec6a39e4cbfdd26f5"],
  "message": "Hello, this is a test notification"
}
```

**Response:**

```json
{
  "message": "Notifications processed",
  "data": [
    {
      "sender": "679e8a0cd74afe2a81c48aa9",
      "recipients": ["679e7d2ec6a39e4cbfdd26f5"],
      "message": "Hello, this is a test notification",
      "type": "non-critical",
      "status": "delivered",
      "deliveredAt": "2025-02-02T10:38:33.450Z",
      "_id": "679f4b29aa2c02ac843af153",
      "sentAt": "2025-02-02T10:38:33.450Z",
      "__v": 0
    }
  ]
}
```

#### **Send Notification (Admin)**

**Endpoint:** `POST /api/v1/notification/send`
**Headers:** `{ Authorization: Bearer your_jwt_token (admin)}`

<!-- Default Type is Non-critical -->

```json
{
  "recipientIds": ["679e7d2ec6a39e4cbfdd26f5"],
  "message": "Hello, this is a test notification",
  "type": "critical"
}
```

**Response:**

```json
{
  "message": "Notifications processed",
  "data": [
    {
      "sender": "679e8a0cd74afe2a81c48aa9",
      "recipients": ["679e7d2ec6a39e4cbfdd26f5"],
      "message": "Hello, this is a test notification",
      "type": "non-critical",
      "status": "delivered",
      "deliveredAt": "2025-02-02T10:38:33.450Z",
      "_id": "679f4b29aa2c02ac843af153",
      "sentAt": "2025-02-02T10:38:33.450Z",
      "__v": 0
    }
  ]
}
```

#### **Fetch User Notifications**

**Endpoint:** `GET /api/v1/notification/:usedId`
**Headers:** `{ Authorization: Bearer your_jwt_token }`
**Response:**

```json
[
  {
    "_id": "679f51b16b063caa081da1f0",
    "sender": "679e8a0cd74afe2a81c48aa9",
    "recipients": ["679e7d2ec6a39e4cbfdd26f5"],
    "message": "alo singh",
    "type": "non-critical",
    "status": "queued",
    "deliveredAt": null,
    "sentAt": "2025-02-02T11:06:25.869Z",
    "__v": 0
  }
]
```

---

## **Automated Notification Queue Processing**

The server runs a **cron job every 10 minutes** to check for queued notifications and deliver them when recipients are available.

---
