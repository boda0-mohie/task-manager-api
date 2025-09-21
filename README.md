# 📌 Task Manager API  

A simple RESTful API for managing tasks with **user authentication** (JWT) built using **Node.js, Express, and MongoDB**.  

---

## 🚀 Features
- User authentication (Register & Login)  
- JWT-based authentication & authorization  
- CRUD operations for tasks (Create, Read, Update, Delete)  
- Input validation & error handling  
- Password hashing using bcrypt  
- Organized code structure with controllers, routes & middlewares  

---

## 🛠️ Installation  

1. Clone the repository:
```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Start the server:
```bash
npm run dev
```

---

## 📌 API Endpoints  

### 🔑 Authentication
#### Register  
`POST /api/auth/register`  

**Request body**  
```json
{
  "name": "Abdelrahman",
  "email": "abdelrahman@example.com",
  "password": "123456"
}
```

**Response (201)**  
```json
{
  "success": true,
  "data": {
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
}
```

---

#### Login  
`POST /api/auth/login`  

**Request body**  
```json
{
  "email": "abdelrahman@example.com",
  "password": "123456"
}
```

**Response (200)**  
```json
{
  "success": true,
  "data": {
    "message": "Logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
}
```

---

### 📋 Tasks  
⚠️ All tasks routes require authentication.  
Add this header:  
```
Authorization: Bearer <token>
```

#### Create Task  
`POST /api/tasks`  
```json
{
  "title": "Finish Node.js project",
  "description": "Complete the task manager API",
  "status": "pending"
}
```

#### Get All Tasks  
`GET /api/tasks`

#### Update Task  
`PUT /api/tasks/:id`  
```json
{
  "status": "done"
}
```

#### Delete Task  
`DELETE /api/tasks/:id`

---

## 🧪 Testing
You can test the API using:
- [Postman](https://www.postman.com/)  
- [Insomnia](https://insomnia.rest/)  
- Or with `curl` in your terminal  

---

## 📌 Example Flow
1. Register a new user  
2. Login to get a JWT token  
3. Use the token to create, update, delete, or fetch tasks  

---

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss.  

---

## 📜 License
This project is licensed under the MIT License.  
