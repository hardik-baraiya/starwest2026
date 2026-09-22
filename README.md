# E-commerce Checkout API

## Description
A REST API for an e-commerce checkout flow, built with Node.js and Express. Consumers can register, log in to receive a JWT token, and perform a checkout using cash or credit card. All data (users, products) is stored in memory — no database is used.

## Installation
```bash
npm install
```

## How to Run
```bash
npm start
```
The API will start on `http://localhost:3000` (or the port set in the `PORT` environment variable).

Interactive Swagger documentation is available at:
```
http://localhost:3000/api-docs
```

## Rules
- Checkout accepts only `cash` or `credit card` as payment methods.
- Paying with `cash` gives a 10% discount on the order subtotal.
- Only authenticated users (valid JWT) can perform a checkout.

## Existent Data

### Users (seeded)
| username | password  |
|----------|-----------|
| alice    | alice123  |
| bob      | bob123    |
| carol    | carol123  |

### Products (seeded)
| id | name                | price  |
|----|---------------------|--------|
| 1  | Wireless Mouse      | 25.99  |
| 2  | Mechanical Keyboard | 89.99  |
| 3  | USB-C Hub           | 39.50  |

## How to Use the REST API

### 1. Register (optional, users are pre-seeded)
```
POST /api/register
Content-Type: application/json

{ "username": "dave", "password": "dave123" }
```

### 2. Login to get a JWT token
```
POST /api/login
Content-Type: application/json

{ "username": "alice", "password": "alice123" }
```
Response:
```json
{ "token": "<jwt-token>" }
```

### 3. Checkout (requires Authorization header)
```
POST /api/checkout
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "paymentMethod": "cash",
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 3, "quantity": 1 }
  ]
}
```
Response:
```json
{
  "items": [...],
  "paymentMethod": "cash",
  "subtotal": 91.48,
  "discount": 9.15,
  "total": 82.33
}
```

### 4. Healthcheck
```
GET /api/health
```

## Endpoints
| Method | Path            | Auth required |
|--------|-----------------|---------------|
| POST   | `/api/register` | No            |
| POST   | `/api/login`    | No            |
| POST   | `/api/checkout` | Yes           |
| GET    | `/api/health`   | No            |
