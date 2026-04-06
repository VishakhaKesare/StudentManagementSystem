# Student Management System API

A RESTful API built with ASP.NET Core for managing students.

## Tech Stack
- ASP.NET Core Web API (.NET 10)
- Entity Framework Core + SQL Server
- JWT Authentication
- Serilog Logging
- Swagger UI
- Layered Architecture (Controller → Service → Repository)

## Features
- CRUD operations for Students
- JWT secured endpoints
- Global exception handling middleware
- Swagger documentation

## Setup Steps

### 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/StudentManagementSystem.git
cd StudentManagementSystem

### 2. Configure appsettings.json
Copy the example config and fill in your values:
cp appsettings.example.json appsettings.json

Edit appsettings.json:
- Set your SQL Server connection string
- Set a JWT key (minimum 32 characters)

### 3. Apply Database Migrations
dotnet ef database update

### 4. Run the project
dotnet run

### 5. Open Swagger UI
Navigate to: https://localhost:{PORT}/swagger

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login |  | Get JWT token |
| GET | /api/students |  | Get all students |
| GET | /api/students/{id} |  | Get student by ID |
| POST | /api/students |  | Add new student |
| PUT | /api/students/{id} | | Update student |
| DELETE | /api/students/{id} |  | Delete student |

## Authentication
1. Call `POST /api/auth/login` with valid credentials
2. Copy the token from the response
3. In Swagger, click **Authorize** and enter: `Bearer YOUR_TOKEN`

## Project Structure
StudentManagementSystem/
├── Controllers/
├── Services/
├── Repositories/
├── Models/
├── Data/
├── Middleware/
├── appsettings.example.json
└── README.md