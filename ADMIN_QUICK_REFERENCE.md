# 🚀 ADMIN PANEL QUICK REFERENCE

## 📍 ACCESS
- **URL**: `http://localhost:3000/admin`
- **Requirement**: Must be logged in with ADMIN role
- **Login**: `http://localhost:3000/login`

---

## 🗂️ ALL 18 MODULES

| # | Module | Route | Icon | Key Features |
|---|--------|-------|------|--------------|
| 1 | **Dashboard** | `/admin` | 📊 | Real-time stats, quick actions, platform health |
| 2 | **User Management** | `/admin/users` | 👥 | User list, search, KYC status, wallet, edit/block |
| 3 | **Admin Management** | `/admin/admins` | 🛂 | Admin list, invite, RBAC, roles, deactivate |
| 4 | **Product Management** | `/admin/products` | 🛒 | CRUD, categories, images, stock, price |
| 5 | **Inventory** | `/admin/inventory` | 📦 | Stock levels, alerts, filters (All/Low/Out) |
| 6 | **Orders** | `/admin/orders` | 📑 | Order list, status updates (7 states), customer info |
| 7 | **Transactions** | `/admin/transactions` | 💰 | All transactions, filter by type, +/- amounts |
| 8 | **Withdrawals** | `/admin/withdrawals` | 💸 | Approve/reject, bank details, auto wallet deduction |
| 9 | **MLM System** | `/admin/mlm` | 🌐 | Network stats, commissions, eligible users, top earners |
| 10 | **Coupons** | `/admin/coupons` | 🎟️ | Create/manage coupons, % or fixed, usage tracking |
| 11 | **Notifications** | `/admin/notifications` | 📢 | Email/SMS/WhatsApp templates, broadcast |
| 12 | **Media Library** | `/admin/media` | 🖼️ | Upload files, Cloudinary integration, organize |
| 13 | **Content/CMS** | `/admin/content` | 🧾 | Blogs, pages, banners, SEO settings |
| 14 | **Support** | `/admin/support` | 🎫 | Tickets, priority levels, status tracking |
| 15 | **Reports** | `/admin/reports` | 📈 | Analytics, charts, export (PDF/Excel/CSV) |
| 16 | **Security** | `/admin/security` | 🔐 | KYC queue, fraud detection, 2FA, IP whitelist |
| 17 | **Settings** | `/admin/settings` | ⚙️ | General, payment, email, tax/GST config |
| 18 | **Audit Logs** | `/admin/audit-logs` | 🧪 | Admin activity, system logs, error logs, API logs |

---

## 🔌 API ENDPOINTS

### Dashboard
```
GET /api/admin/dashboard
```

### Users
```
GET    /api/admin/users          # List all users
GET    /api/admin/users/[id]     # Get user details
PUT    /api/admin/users/[id]     # Update user
```

### Admins
```
GET    /api/admin/admins         # List all admins
POST   /api/admin/admins         # Create new admin
```

### Transactions
```
GET    /api/admin/transactions?type=COMMISSION  # Filter by type
```

### Withdrawals
```
GET    /api/admin/withdrawals?status=PENDING    # Filter by status
PUT    /api/admin/withdrawals/[id]              # Approve/Reject
```

### MLM
```
GET    /api/admin/mlm/stats      # Network statistics
```

### Coupons
```
GET    /api/admin/coupons        # List all coupons
POST   /api/admin/coupons        # Create coupon
PUT    /api/admin/coupons/[id]   # Update coupon
DELETE /api/admin/coupons/[id]   # Delete coupon
```

### Support
```
GET    /api/admin/support?status=OPEN  # Filter tickets
PUT    /api/admin/support/[id]         # Update ticket
```

### Audit Logs
```
GET    /api/admin/audit-logs?type=admin  # admin or user logs
```

### Settings
```
GET    /api/admin/settings       # Get settings
PUT    /api/admin/settings       # Update settings
```

---

## 🎨 UI COMPONENTS USED

### Cards
- **Stat Cards**: Gradient backgrounds (blue, green, purple, orange)
- **Feature Cards**: White with shadow, border-left accent
- **Action Cards**: Hover effects, icons

### Tables
- **Headers**: Uppercase, gray background
- **Rows**: Hover highlight, divide lines
- **Cells**: Proper padding, alignment

### Badges
- **Success**: `bg-green-100 text-green-800`
- **Warning**: `bg-yellow-100 text-yellow-800`
- **Danger**: `bg-red-100 text-red-800`
- **Info**: `bg-blue-100 text-blue-800`
- **Neutral**: `bg-gray-100 text-gray-800`

### Buttons
- **Primary**: Blue background, white text
- **Danger**: Red background, white text
- **Secondary**: Gray background, dark text
- **Sizes**: sm, md, lg

### Forms
- **Inputs**: Border, focus ring, rounded corners
- **Labels**: Small, medium weight, gray-700
- **Validation**: Required fields marked

---

## 📊 DATABASE MODELS

### Core Models (14 total)
1. **User** - Platform users with KYC fields
2. **Product** - E-commerce products
3. **Order** - Customer orders
4. **OrderItem** - Order line items
5. **Transaction** - Financial transactions
6. **Commission** - MLM commissions
7. **ReferralNetwork** - User relationships
8. **Coupon** - Discount codes
9. **Wishlist** - User wishlists
10. **WithdrawRequest** - Withdrawal requests
11. **Notification** - User notifications
12. **AdminUser** - Admin accounts
13. **Blog** - Blog posts
14. **Settings** - System configuration

### New Models (6 added)
15. **SupportTicket** - Support system
16. **Media** - File management
17. **AdminActivityLog** - Admin tracking
18. **AuditLog** - User tracking
19. **EmailTemplate** - Email templates
20. **NotificationLog** - Notification delivery

---

## 🔐 ROLES & PERMISSIONS

### User Roles
- **USER** - Regular platform user
- **ADMIN** - Admin panel access

### Admin Roles
- **SUPER_ADMIN** - Full access, can manage admins
- **ADMIN** - Standard admin access
- **MODERATOR** - Limited admin access

### Permissions (Future Implementation)
```json
[
  "manage:users",
  "manage:products",
  "manage:orders",
  "manage:withdrawals",
  "manage:coupons",
  "manage:settings",
  "manage:admins",
  "view:reports",
  "view:logs"
]
```

---

## 🎯 COMMON WORKFLOWS

### Approve a Withdrawal
1. Go to `/admin/withdrawals`
2. Filter by "PENDING"
3. Review bank details
4. Click "Approve"
5. ✅ Wallet auto-deducted
6. ✅ Transaction created

### Create a Coupon
1. Go to `/admin/coupons`
2. Click "+ Create Coupon"
3. Fill form:
   - Code: `SAVE20`
   - Type: `Percentage`
   - Value: `20`
   - Min Order: `500`
   - Max Uses: `100`
4. Submit
5. ✅ Coupon active

### Manage Users
1. Go to `/admin/users`
2. Search by name/email
3. View:
   - Wallet balance
   - MLM eligibility
   - KYC status
   - Join date
4. Click "Edit" or "Block"

### Handle Support Ticket
1. Go to `/admin/support`
2. Filter by "OPEN"
3. Click "View Details"
4. Review issue
5. Update status:
   - Open → In Progress → Resolved → Closed
6. Add response

---

## 🛠️ DEVELOPMENT COMMANDS

### Database
```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## 📱 RESPONSIVE BREAKPOINTS

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Grid Layouts
```
Mobile:  1 column
Tablet:  2 columns (md:grid-cols-2)
Desktop: 3-4 columns (lg:grid-cols-3/4)
```

---

## 🎨 COLOR SCHEME

### Primary Colors
- **Primary**: `#3B82F6` (Blue)
- **Primary Light**: `#DBEAFE`
- **Primary Dark**: `#2563EB`

### Status Colors
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Yellow)
- **Danger**: `#EF4444` (Red)
- **Info**: `#3B82F6` (Blue)

### Neutral Colors
- **Gray 50**: `#F9FAFB` (Backgrounds)
- **Gray 100**: `#F3F4F6` (Cards)
- **Gray 200**: `#E5E7EB` (Borders)
- **Gray 700**: `#374151` (Text secondary)
- **Gray 900**: `#111827` (Text primary)

---

## ⚡ PERFORMANCE TIPS

### Frontend
- Use `useEffect` for data fetching
- Implement loading states
- Debounce search inputs
- Lazy load heavy components
- Use React.memo for pure components

### Backend
- Index database queries
- Limit result sets (`take: 100`)
- Use `select` to fetch only needed fields
- Implement pagination for large datasets
- Cache frequently accessed data

---

## 🐛 DEBUGGING

### Browser Console
```javascript
// Check if user is admin
console.log(window.localStorage.getItem('user'))

// Check API response
fetch('/api/admin/dashboard')
  .then(res => res.json())
  .then(data => console.log(data))
```

### Terminal Logs
```bash
# Watch for errors
npm run dev 2>&1 | grep -i error

# Check Prisma queries
DEBUG=prisma:client npm run dev
```

### Prisma Studio
```bash
# Visual database browser
npx prisma studio
```

---

## 📞 QUICK TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Page not loading | Check browser console for errors |
| API returns 500 | Check terminal, run `npx prisma generate` |
| No data showing | Database empty, run seed or create data |
| Styles broken | Check Tailwind config, restart dev server |
| Can't access /admin | Ensure logged in with ADMIN role |
| Form not submitting | Check required fields, console for errors |
| Images not loading | Check Cloudinary config, URL format |

---

## 📚 DOCUMENTATION FILES

1. **ADMIN_PANEL_COMPLETE.md** - Full implementation details
2. **ADMIN_TESTING_GUIDE.md** - Comprehensive testing checklist
3. **ADMIN_QUICK_REFERENCE.md** - This file (quick lookup)

---

## 🎓 LEARNING RESOURCES

### Next.js
- [Next.js Docs](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/router-handlers)

### Prisma
- [Prisma Docs](https://www.prisma.io/docs)
- [Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Utility Classes](https://tailwindcss.com/docs/utility-first)

---

## 🎉 YOU'RE ALL SET!

Your admin panel is complete with:
- ✅ 18 fully functional modules
- ✅ 15 RESTful API routes
- ✅ Modern, responsive UI
- ✅ Complete database schema
- ✅ Role-based access control
- ✅ Comprehensive documentation

**Start testing**: `http://localhost:3000/admin`

**Need help?** Check the testing guide or review the complete documentation.

**Happy administering!** 🚀
