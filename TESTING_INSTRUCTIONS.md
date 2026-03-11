# Testing the Real Connection Request System

## Quick Start

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Login as Karim Hassan
- Go to: http://localhost:3000/auth/login
- Email: `karim@example.com`
- Password: `password123`

### 3. View Connection Requests
- After login, you'll be redirected to `/feed`
- Look at the **right sidebar**
- You should see **3 pending connection requests**:
  - Rafiq Ahmed (Investor)
  - Sarah Khan (Mentor)
  - Nadia Rahman (Entrepreneur)

### 4. Test Accept Functionality
1. Click the **"Accept"** button on any request
2. The button will show **"Processing..."**
3. The request will disappear from the list
4. A Follow relationship is created in the database
5. The badge count updates automatically

### 5. Test Decline Functionality
1. Click the **"Decline"** button on any request
2. The button will show **"Processing..."**
3. The request will disappear from the list
4. The request status is updated to DECLINED in the database
5. The badge count updates automatically

### 6. Test Send Connection Request
1. Scroll down to **"Suggested for you"** section
2. Click **"Follow"** button on Nadia Rahman or Ahmed Ali
3. Button will show **"Sending..."**
4. After success, button changes to **"Requested"**
5. Button becomes disabled (can't send duplicate requests)

## Verify in Database

### Using Prisma Studio
```bash
npx prisma studio
```

Then check:
- **ConnectionRequest** table - see all requests and their status
- **Follow** table - see accepted connections

### Using SQL
```bash
# Connect to PostgreSQL
psql -U postgres -d innonet

# Check pending requests
SELECT * FROM "ConnectionRequest" WHERE status = 'PENDING';

# Check accepted requests
SELECT * FROM "ConnectionRequest" WHERE status = 'ACCEPTED';

# Check follow relationships
SELECT * FROM "Follow";
```

## Test Different Users

### Login as Different Users
All users have password: `password123`

1. **Rafiq Ahmed** (Investor)
   - Email: `rafiq@example.com`
   - Has sent request to Karim

2. **Sarah Khan** (Mentor)
   - Email: `sarah@example.com`
   - Has sent request to Karim

3. **Nadia Rahman** (Entrepreneur)
   - Email: `nadia@example.com`
   - Has sent request to Karim

## Expected Behavior

### When Accepting a Request:
✅ Request disappears from list immediately
✅ Follow relationship created in database
✅ Badge count decreases
✅ No errors in console
✅ Can't accept the same request twice

### When Declining a Request:
✅ Request disappears from list immediately
✅ Request status updated to DECLINED
✅ Badge count decreases
✅ No errors in console
✅ No follow relationship created

### When Sending a Request:
✅ Button shows loading state
✅ Button changes to "Requested" after success
✅ Button becomes disabled
✅ Can't send duplicate requests
✅ Error shown if already connected

## Error Scenarios

### Not Authenticated
- If you try to access APIs without login, you'll get 401 error
- Solution: Login first

### Duplicate Request
- If you try to send a request to someone you already requested
- Error: "Connection request already sent"

### Already Connected
- If you try to send a request to someone you're already following
- Error: "Already connected"

### Invalid Request ID
- If you try to accept/decline a non-existent request
- Error: "Connection request not found"

## Reset Test Data

To reset and recreate test data:
```bash
# Reset database
npx prisma migrate reset

# Run seed again
npx tsx prisma/seed.ts
```

## Production Checklist

✅ Real database operations (no dummy data)
✅ Authentication required for all endpoints
✅ User validation (can only manage own requests)
✅ Duplicate prevention
✅ Error handling with user feedback
✅ Loading states during API calls
✅ Optimistic UI updates
✅ Database transactions for consistency
✅ Proper TypeScript types
✅ Security validations

## Next Steps

After testing, you can:
1. Add notification system for new requests
2. Add mutual connections calculation
3. Add request expiration
4. Add bulk operations
5. Add connection suggestions algorithm
6. Add request messages/notes
