# Expense Tracker API

A RESTful API for managing personal expenses, built with Node.js, Express.js, Prisma ORM, and PostgreSQL.

This API provides CRUD operations for expenses, filtering, and expense summary information. It is designed to serve as the backend for an Expense Tracker mobile application.

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JavaScript
- REST API
- CORS

## Features

- Create expenses
- Retrieve all expenses
- Retrieve an expense by ID
- Update expenses
- Delete expenses
- Filter expenses by category
- Filter expenses by minimum and maximum amount
- Combine multiple filters
- Retrieve total expense summary
- JSON request and response handling
- Centralized error handling
- CORS support
- Environment variable configuration

## API Endpoints

### Expenses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/:id` | Get an expense by ID |
| POST | `/api/expenses` | Create a new expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| GET | `/api/expenses/summary` | Get expense summary |

### Filtering

Expenses can be filtered using query parameters.

Examples:

```text
GET /api/expenses?category=Food

GET /api/expenses?minAmount=500&maxAmount=2000

GET /api/expenses?category=Food&minAmount=500

```

### Expense Data

An expense contains the following fields:

id
amount
category
description
date
createdAt
updatedAt

Example request:

{
  "amount": 1500,
  "category": "Food",
  "description": "Dinner",
  "date": "2026-09-14"
}


### Configure environment variables

Create a .env file in the project root.

Example:

PORT=3000
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/expense_tracker"

Use your own PostgreSQL username, password, and database configuration.

## Run Prisma migrations
npx prisma migrate dev

## Start the development server
npm run dev

The API will run on:

http://localhost:3000

### API Example

## Create an Expense

POST

/api/expenses

Request body:

{
  "amount": 2000,
  "category": "Food",
  "description": "Dinner",
  "date": "2026-09-14"
}
## Get All Expenses

GET

/api/expenses
Update an Expense

PUT

/api/expenses/1

Request body:

{
  "amount": 2500,
  "category": "Food",
  "description": "Updated dinner",
  "date": "2026-09-14"
}
## Delete an Expense

DELETE

/api/expenses/1
Get Expense Summary

GET

/api/expenses/summary

Example response:

{
  "totalExpenses": 3,
  "totalAmount": "4500"
}
### Architecture

The API follows a simple layered structure:

Client
   ↓
Express Routes
   ↓
Controllers
   ↓
Prisma ORM
   ↓
PostgreSQL

The Flutter mobile application communicates with this API using HTTP requests.

Flutter Mobile App
        ↓
    HTTP / JSON
        ↓
Expense Tracker API
        ↓
      Prisma
        ↓
   PostgreSQL
Error Handling

The API provides HTTP status codes and JSON error responses for failed requests.

Example:

{
  "error": "Route not found"
}
### Development

Start the API in development mode with:

npm run dev

The development server uses Node.js watch mode so changes to the source code automatically restart the server.

### Related Project

This API is the backend component of the Expense Tracker application.

Mobile application: expense-tracker-mobile

## Author

Upeka Gamage
