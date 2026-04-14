# 🧪 ADMIN PANEL TESTING GUIDE

## Pre-Testing Setup

### 1. **Database Migration**
```bash
# Apply the latest schema changes
npx prisma migrate dev --name admin_panel_complete

# Generate Prisma Client (if not locked)
npx prisma generate
```

### 2. **Seed Database (Optional)**
```bash
# Add test data for testing
npx prisma db seed
```

### 3. **Start Development Server**
```bash
npm run dev
```

---

## ✅ TESTING CHECKLIST

### **Phase 1: Authentication & Access**

#### Test 1.1: Admin Access Control
- [ ] Navigate to `http://localhost:3000/admin`
- [ ] If not logged in, should redirect to `/login`
- [ ] Login with admin credentials
- [ ] Should access admin panel successfully
- [ ] Non-admin user should see "Access Denied"

#### Test 1.2: Navigation
- [ ] Sidebar displays all 18 modules
- [ ] Each menu item is clickable
- [ ] Active page is highlighted
- [ ] Sidebar collapse/expand works
- [ ] "Back to Site" link works

---

### **Phase 2: Dashboard**

#### Test 2.1: Statistics Display
- [ ] Total Users count shows (or 0)
- [ ] Total Revenue displays as ₹0.00
- [ ] Total Orders count shows
- [ ] Commissions Paid shows
- [ ] Products count shows
- [ ] Pending Withdrawals count
- [ ] Open Support Tickets count

#### Test 2.2: Quick Actions
- [ ] Click "Manage Users" → navigates to /admin/users
- [ ] Click "Add Product" → navigates to /admin/products
- [ ] Click "View Orders" → navigates to /admin/orders
- [ ] Click "Withdrawals" → navigates to /admin/withdrawals
- [ ] Click "MLM Network" → navigates to /admin/mlm
- [ ] Click "Support Tickets" → navigates to /admin/support

#### Test 2.3: Platform Health
- [ ] Database Status shows "Online"
- [ ] Payment Gateway shows "Active"
- [ ] Email Service shows "Active"
- [ ] MLM System shows "Running"

---

### **Phase 3: User Management**

#### Test 3.1: User Listing
- [ ] Navigate to `/admin/users`
- [ ] Users table loads (or shows "No users found")
- [ ] Search box is functional
- [ ] Columns display: User, Referral Code, Wallet, MLM Eligible, Joined, Actions

#### Test 3.2: User Data
- [ ] User name and email display correctly
- [ ] Wallet balance shows in ₹ format
- [ ] MLM Eligible shows Yes/No badge
- [ ] Join date is formatted correctly
- [ ] Edit and Block buttons are visible

---

### **Phase 4: Admin Management**

#### Test 4.1: Admin Listing
- [ ] Navigate to `/admin/admins`
- [ ] Admin table loads
- [ ] Shows: Admin, Role, Status, Last Login, Created, Actions

#### Test 4.2: Invite Admin
- [ ] Click "+ Invite Admin"
- [ ] Form appears with fields: Name, Email, Role
- [ ] Fill form and submit
- [ ] Success message appears
- [ ] New admin appears in list
- [ ] Role dropdown has: Admin, Super Admin, Moderator

---

### **Phase 5: Product Management**

#### Test 5.1: Product Listing
- [ ] Navigate to `/admin/products`
- [ ] Products load from database
- [ ] Shows: Product Info, Category, Price, Stock, Status, Actions
- [ ] Search functionality works

#### Test 5.2: Add Product
- [ ] Click "+ Add Product"
- [ ] Form appears
- [ ] Fill: Name, Category, Price, Stock, Description
- [ ] Submit form
- [ ] Product appears in list
- [ ] Form resets

#### Test 5.3: Delete Product
- [ ] Click "Delete" on any product
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Product removed from list

---

### **Phase 6: Inventory Management**

#### Test 6.1: Stock Display
- [ ] Navigate to `/admin/inventory`
- [ ] Product cards display
- [ ] Stock count shows
- [ ] Color-coded borders:
  - Green: Stock ≥ 10
  - Yellow: 0 < Stock < 10
  - Red: Stock = 0

#### Test 6.2: Filters
- [ ] Click "All Products" → shows all
- [ ] Click "Low Stock (<10)" → shows only low stock
- [ ] Click "Out of Stock" → shows only zero stock

---

### **Phase 7: Order Management**

#### Test 7.1: Order Listing
- [ ] Navigate to `/admin/orders`
- [ ] Orders table loads
- [ ] Shows: Order ID, Customer, Amount, Status, Update Status

#### Test 7.2: Status Update
- [ ] Change status from dropdown
- [ ] "Updating..." text appears
- [ ] Status badge updates
- [ ] All 7 statuses available:
  - Pending, Confirmed, Processing, Shipped, Delivered, Cancelled, Refunded

---

### **Phase 8: Transactions**

#### Test 8.1: Transaction Listing
- [ ] Navigate to `/admin/transactions`
- [ ] Transactions load (or shows empty)
- [ ] Shows: User, Type, Amount, Status, Description, Date

#### Test 8.2: Filters
- [ ] Click "All Types" → shows all
- [ ] Click "PURCHASE" → filters purchases
- [ ] Click "COMMISSION" → filters commissions
- [ ] Click "WITHDRAWAL" → filters withdrawals
- [ ] Click "REFUND" → filters refunds

#### Test 8.3: Amount Display
- [ ] PURCHASE shows with "-" (red)
- [ ] COMMISSION shows with "+" (green)
- [ ] WITHDRAWAL shows with "-" (red)
- [ ] REFUND shows with "+" (green)

---

### **Phase 9: Withdrawals**

#### Test 9.1: Withdrawal Listing
- [ ] Navigate to `/admin/withdrawals`
- [ ] Withdrawals load
- [ ] Shows: User, Amount, Bank Details, Status, Requested, Actions

#### Test 9.2: Approve Withdrawal
- [ ] Filter by "Pending"
- [ ] Click "Approve" button
- [ ] Status changes to "APPROVED"
- [ ] User wallet is deducted
- [ ] Transaction record created

#### Test 9.3: Reject Withdrawal
- [ ] Click "Reject" button
- [ ] Status changes to "REJECTED"
- [ ] Wallet NOT deducted

---

### **Phase 10: MLM System**

#### Test 10.1: Statistics
- [ ] Navigate to `/admin/mlm`
- [ ] Total Users in Network shows
- [ ] MLM Eligible Users shows
- [ ] Total Commissions Paid shows
- [ ] Network Connections shows

#### Test 10.2: Tabs
- [ ] Click "Network Tree" → shows placeholder
- [ ] Click "Commission Logs" → shows placeholder
- [ ] Click "Eligible Users" → shows placeholder
- [ ] Click "Top Earners" → shows placeholder
- [ ] "Go to Settings" button links to /admin/mlm-settings

---

### **Phase 11: Coupons**

#### Test 11.1: Coupon Listing
- [ ] Navigate to `/admin/coupons`
- [ ] Coupons display as cards
- [ ] Shows: Code, Discount, Min Order, Uses, Expiry, Status

#### Test 11.2: Create Coupon
- [ ] Click "+ Create Coupon"
- [ ] Fill form:
  - Code: TEST20
  - Type: Percentage
  - Value: 20
  - Min Order: 500
  - Max Uses: 100
- [ ] Submit
- [ ] Coupon appears in grid
- [ ] Form resets

#### Test 11.3: Deactivate/Activate
- [ ] Click "Deactivate" on active coupon
- [ ] Badge changes to "Inactive"
- [ ] Click "Activate" on inactive coupon
- [ ] Badge changes to "Active"

#### Test 11.4: Delete Coupon
- [ ] Click "Delete" button
- [ ] Coupon removed from list

---

### **Phase 12: Notifications**

#### Test 12.1: Email Templates
- [ ] Navigate to `/admin/notifications`
- [ ] Email Templates section shows
- [ ] Lists: Welcome, Commission, Order, Withdrawal, Password Reset
- [ ] Edit buttons visible

#### Test 12.2: SMS/WhatsApp Templates
- [ ] SMS Templates section shows
- [ ] Lists: Order Update, OTP, Payment, Withdrawal
- [ ] Edit buttons visible

#### Test 12.3: Broadcast Form
- [ ] Fill Title and Message
- [ ] Select Send Via channel
- [ ] Select Target Audience
- [ ] "Send Broadcast" button clickable

---

### **Phase 13: Media Library**

#### Test 13.1: Upload Interface
- [ ] Navigate to `/admin/media`
- [ ] Upload button visible
- [ ] Drag & drop area shows
- [ ] Supported formats listed
- [ ] "Select Files" button works

---

### **Phase 14: Content/CMS**

#### Test 14.1: Content Sections
- [ ] Navigate to `/admin/content`
- [ ] Blog Posts card shows
- [ ] Static Pages card shows
- [ ] Homepage Banners card shows
- [ ] Click links navigate correctly

#### Test 14.2: SEO Settings
- [ ] SEO Settings form visible
- [ ] Fields: Site Title, Meta Description, Keywords
- [ ] "Save SEO Settings" button works

---

### **Phase 15: Support**

#### Test 15.1: Ticket Listing
- [ ] Navigate to `/admin/support`
- [ ] Tickets table loads
- [ ] Shows: Ticket ID, User, Subject, Priority, Status, Created, Actions

#### Test 15.2: Filters
- [ ] Click "Open" → shows open tickets
- [ ] Click "In Progress" → shows in-progress
- [ ] Click "Resolved" → shows resolved
- [ ] Click "Closed" → shows closed
- [ ] Click "All" → shows all

#### Test 15.3: Priority Badges
- [ ] CRITICAL shows red badge
- [ ] HIGH shows orange badge
- [ ] MEDIUM shows yellow badge
- [ ] LOW shows green badge

---

### **Phase 16: Security**

#### Test 16.1: KYC Queue
- [ ] Navigate to `/admin/security`
- [ ] KYC Verification Queue section shows

#### Test 16.2: Access Control
- [ ] Two-Factor Authentication toggle works
- [ ] IP Whitelisting toggle works
- [ ] Session Timeout dropdown has options:
  - 30 minutes, 1 hour, 2 hours, 4 hours

---

### **Phase 17: Settings**

#### Test 17.1: General Settings
- [ ] Navigate to `/admin/settings`
- [ ] Fields show: Site Name, URL, Email, Phone
- [ ] "Save General Settings" button works

#### Test 17.2: Payment Gateway
- [ ] Razorpay Key ID field shows
- [ ] Razorpay Key Secret field shows (password type)
- [ ] "Save Payment Settings" button works

#### Test 17.3: Email/SMTP
- [ ] SMTP Host, Port, Username, Password fields show
- [ ] "Save Email Settings" button works

#### Test 17.4: Tax/GST
- [ ] GST Rate field shows (default 18)
- [ ] GSTIN Number field shows
- [ ] "Save Tax Settings" button works

---

### **Phase 18: Audit Logs**

#### Test 18.1: Log Tabs
- [ ] Navigate to `/admin/audit-logs`
- [ ] Tabs show: Admin Activity, System Logs, Error Logs, API Logs
- [ ] Click each tab switches view

---

## 🐛 COMMON ISSUES & FIXES

### Issue 1: "No data found" on all pages
**Fix**: Database is empty. Run seed script or create test data manually.

### Issue 2: API returns 500 error
**Fix**: Check terminal for error logs. Likely Prisma schema mismatch.
```bash
npx prisma generate
npx prisma migrate dev
```

### Issue 3: Page not loading
**Fix**: Check browser console for errors. Ensure component imports are correct.

### Issue 4: Styles not applying
**Fix**: Ensure Tailwind CSS is configured. Check `globals.css` imports.

### Issue 5: Cannot access /admin
**Fix**: Ensure you're logged in with ADMIN role. Check AuthContext.

---

## 📊 API TESTING (Using Postman/Thunder Client)

### Test Dashboard API
```
GET http://localhost:3000/api/admin/dashboard
Expected: { success: true, data: { totalUsers, totalProducts, ... } }
```

### Test Users API
```
GET http://localhost:3000/api/admin/users
Expected: { success: true, data: [user1, user2, ...] }
```

### Test Create Coupon
```
POST http://localhost:3000/api/admin/coupons
Body: {
  "code": "TEST50",
  "discountType": "PERCENTAGE",
  "discountValue": 50,
  "minOrderValue": 1000,
  "maxUses": 50
}
Expected: { success: true, data: { id, code, ... } }
```

### Test Withdrawals
```
GET http://localhost:3000/api/admin/withdrawals?status=PENDING
Expected: { success: true, data: [withdrawals] }

PUT http://localhost:3000/api/admin/withdrawals/[id]
Body: { "status": "APPROVED" }
Expected: { success: true, data: { updated withdrawal } }
```

---

## ✅ FINAL VERIFICATION

### Checklist Summary:
- [ ] All 18 pages load without errors
- [ ] All API routes return correct data
- [ ] Navigation works smoothly
- [ ] Forms submit correctly
- [ ] Filters work as expected
- [ ] CRUD operations functional
- [ ] Loading states display
- [ ] Empty states show when needed
- [ ] Error handling works
- [ ] Responsive on mobile/tablet

### Performance Checks:
- [ ] Page load time < 2 seconds
- [ ] API response time < 500ms
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth animations

---

## 🎉 SUCCESS CRITERIA

Your admin panel is working correctly if:
1. ✅ All 18 pages load without errors
2. ✅ Dashboard shows real statistics
3. ✅ Can create/edit/delete resources
4. ✅ Filters and search work
5. ✅ Forms validate and submit
6. ✅ API routes return proper responses
7. ✅ Navigation is smooth
8. ✅ No TypeScript errors in console
9. ✅ Responsive design works
10. ✅ Role-based access control functions

---

## 📝 REPORTING ISSUES

If you encounter any bugs:
1. Note the page/route
2. Screenshot the error
3. Check browser console for errors
4. Check terminal for backend errors
5. Note steps to reproduce
6. Report with this information

---

**Happy Testing! 🚀**
