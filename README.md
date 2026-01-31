# ManageX – Employee Management System

A secure, role-based **Employee Management System** built using **Node.js, Express, MongoDB, and React**.  
This application enables administrators to manage employee accounts while providing employees secure access to their personal dashboards.

The project follows **industry-standard architecture, authentication, and security best practices**.

---

## 📌 Project Overview

The Employee Management System is a web-based application where:

- Admin creates and manages employee accounts
- System auto-generates login credentials
- Credentials are sent to the employee’s registered email
- Employees log in using system-generated credentials
- First login enforces mandatory password change
- Employees access a secure personal dashboard

---

## 👥 User Roles

### 🔐 Admin
- Secure admin login
- Create and manage employees
- Auto-generate employee credentials
- Send credentials via email
- Activate / Deactivate employee accounts
- Reset employee passwords
- View employee list and status

### 👨‍💼 Employee
- Login using email and temporary password
- Mandatory password change on first login
- Access personal dashboard
- View & update profile
- Secure logout

---

## 🚀 Core Features

### 🧑‍💻 Admin Features
- Secure admin authentication
- Create single or multiple employees
- Auto-generate:
  - Employee ID
  - Temporary password
- Email credentials to employees
- Activate / Deactivate employee accounts
- Reset employee passwords
- View employee list with active/inactive status

### 👤 Employee Features
- Login with system-generated credentials
- Forced password reset on first login
- View dashboard:
  - Profile information
  - Account status
  - Login activity
- Update profile details
- Secure logout

---

## 🔐 Authentication & Security

- JWT-based authentication
- Password hashing using bcrypt
- Role-Based Access Control (RBAC)
- First-login password change enforcement
- Account lock after multiple failed login attempts
- Protected API routes using middleware
- Secure token handling (Authorization headers)

---

## ✉️ Email System

- Automated email service using Nodemailer
- Professional email templates including:
  - Login URL
  - Employee email ID
  - Temporary password
- Password reset email support

---

## 🗄️ Database Design (MongoDB)

### 📄 Admin Collection
```js
{
  name: String,
  email: String,
  password: String,
  role: "admin",
  createdAt: Date
}
```

### 📄 Employee Collection
```js
{
  employeeId: String,
  name: String,
  email: String,
  password: String,
  role: "employee",
  isActive: Boolean,
  isFirstLogin: Boolean,
  lastLogin: Date,
  createdAt: Date
}
```

---

## 🔌 API Modules

### 🔐 Authentication Module

| Method | Endpoint | Description |
|------|--------|-------------|
| POST | /admin/login | Admin login |
| POST | /employee/login | Employee login |
| POST | /employee/change-password | Change password |

### 👨‍💼 Admin Module

| Method | Endpoint | Description |
|------|--------|-------------|
| POST | /admin/create-employee | Create employee |
| GET | /admin/employees | Get employee list |
| PATCH | /admin/employee/:id/status | Activate / Deactivate |
| POST | /admin/reset-password/:id | Reset password |

### 👤 Employee Module

| Method | Endpoint | Description |
|------|--------|-------------|
| GET | /employee/dashboard | Dashboard |
| GET | /employee/profile | Get profile |
| PUT | /employee/profile | Update profile |

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT
- Bcrypt
- Nodemailer

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS

---

## 📂 Project Structure

```bash
Employee-Management-System/
├── backend/
├── frontend/
└── README.md
```
---

## 🧑‍💻 Author

Ayush Bagchi  
Full Stack Developer (MERN)

---

## 📄 License

Educational & learning purposes only.
