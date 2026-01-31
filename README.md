# Webhook Receiver Service

Improved webhook receiver service with authentication, validation, and better error handling.

## Setup

Install dependencies:
```bash
npm install
```

Create `.env` file:
```env
PORT=3000
WEBHOOK_SECRET=your-secret-key
```

**Note:** `WEBHOOK_SECRET` is required. The application will not start without it.

## Running

Development:
```bash
npm run dev
```

Production:
```bash
npm run build
npm start
```

## API Usage

### Receive Webhook
```bash
POST /webhooks
Headers: x-webhook-secret: your-secret-key
Content-Type: application/json

Body:
{
  "source": "payment-gateway",
  "event": "payment.completed",
  "payload": { "orderId": "123" }
}
```

### List All Webhooks
```bash
GET /webhooks
Headers: x-webhook-secret: your-secret-key
```

### Get Webhook by ID
```bash
GET /webhooks/:id
Headers: x-webhook-secret: your-secret-key
```

## What I Fixed

### Critical Issues
- **Authentication**: Added webhook secret verification middleware for all endpoints
- **Input Validation**: Implemented Zod schema validation for request bodies
- **ID Generation**: Replaced Math.random() with UUID v4
- **Error Responses**: Added structured error responses (400, 401, 404, 500)

### Other Improvements
- Separated concerns with middleware and validators
- Protected all endpoints (including GET) with authentication
- Validated environment variables on startup
- Better error handling for invalid payloads
- Replaced `any` types with `unknown` for better type safety

## What's Still In-Memory

- Webhooks are stored in memory (lost on restart)
- In production, would use PostgreSQL or MongoDB

## Analysis

See [ANALYSIS.md](./ANALYSIS.md) for detailed issue breakdown and severity ratings.