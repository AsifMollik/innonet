# Connection Requests System - Real Implementation

## Overview
The connection request system is now fully functional with real database operations. No demo or dummy data is used in production.

## Database Schema

### ConnectionRequest Model
```prisma
model ConnectionRequest {
  id          String        @id @default(cuid())
  senderId    String
  sender      User          @relation("ConnectionRequestSent")
  receiverId  String
  receiver    User          @relation("ConnectionRequestReceived")
  status      RequestStatus @default(PENDING)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

enum RequestStatus {
  PENDING
  ACCEPTED
  DECLINED
}
```

## API Endpoints

### 1. GET /api/connections/requests
Fetches all pending connection requests for the logged-in user.

**Authentication:** Required (cookie-based)

**Response:**
```json
{
  "requests": [
    {
      "id": "clx123...",
      "senderId": "user123",
      "name": "John Doe",
      "username": "johndoe",
      "role": "ENTREPRENEUR",
      "avatar": null,
      "mutual": 5,
      "createdAt": "2026-03-10T..."
    }
  ]
}
```

### 2. POST /api/connections/accept
Accepts a connection request and creates a follow relationship.

**Authentication:** Required (cookie-based)

**Request Body:**
```json
{
  "requestId": "clx123..."
}
```

**What it does:**
1. Validates the request belongs to the current user
2. Updates request status to ACCEPTED
3. Creates a Follow relationship in the database
4. Returns success response

**Response:**
```json
{
  "success": true,
  "request": { ... },
  "follow": { ... }
}
```

### 3. POST /api/connections/decline
Declines a connection request.

**Authentication:** Required (cookie-based)

**Request Body:**
```json
{
  "requestId": "clx123..."
}
```

**What it does:**
1. Validates the request belongs to the current user
2. Updates request status to DECLINED
3. Returns success response

**Response:**
```json
{
  "success": true,
  "request": { ... }
}
```

### 4. POST /api/connections/send
Sends a new connection request to another user.

**Authentication:** Required (cookie-based)

**Request Body:**
```json
{
  "receiverId": "user456"
}
```

**Validations:**
- Checks if request already exists
- Checks if users are already connected
- Prevents duplicate requests

**Response:**
```json
{
  "success": true,
  "request": { ... }
}
```

## Frontend Implementation

### RightSidebar Component
The RightSidebar component (`src/components/RightSidebar.tsx`) handles:

1. **Fetching Requests:** Automatically loads pending requests on mount
2. **Accept Button:** Calls accept API and removes request from UI
3. **Decline Button:** Calls decline API and removes request from UI
4. **Follow Button:** Sends connection request to suggested users
5. **Loading States:** Shows "Processing..." or "Sending..." during API calls
6. **Error Handling:** Displays alerts if operations fail

### Key Features
- Real-time UI updates after accept/decline
- Disabled buttons during processing
- Badge count showing number of pending requests
- Color-coded user avatars
- Mutual connections count

## Testing

### Seed Data
The seed script creates 3 connection requests for testing:
- Rafiq Ahmed → Karim Hassan (PENDING)
- Sarah Khan → Karim Hassan (PENDING)
- Nadia Rahman → Karim Hassan (PENDING)

### To Test:
1. Login as Karim Hassan (karim@example.com / password123)
2. Go to /feed page
3. Check right sidebar for connection requests
4. Click "Accept" or "Decline" to test functionality
5. Requests will be removed from the list after action
6. Check database to verify status changes

### Database Verification
```bash
# Check connection requests
npx prisma studio

# Or use SQL
SELECT * FROM "ConnectionRequest" WHERE status = 'PENDING';
SELECT * FROM "Follow";
```

## Security Features
- Cookie-based authentication required for all endpoints
- User ID validation (can only accept/decline own requests)
- Duplicate request prevention
- Already connected check
- SQL injection protection via Prisma ORM

## Future Enhancements
- Real mutual connections calculation
- Notification system for new requests
- Request expiration after X days
- Bulk accept/decline
- Connection suggestions based on interests
- Request message/note feature
