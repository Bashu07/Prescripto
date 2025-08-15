## 🚀 Features

### 👩‍⚕️ For Clients
- Browse doctors based on categories (General Surgeon, Dermatologist, Physician, etc.)
- View doctor details, available slots, and fees
- Book appointments with **online payment** or **cash on arrival**
- View and manage own booked appointments
- Secure login/signup with JWT authentication

  
### 🛠 For Admin
- Perform CRUD operations for doctors and categories
- View and manage all appointments
- Approve, cancel, or update appointment statuses
- Manage doctor schedules and fees

---

## 🖥 Tech Stack

**Frontend:**
- React.js (with Tailwind CSS for styling)
- Axios for API calls
- React Router for navigation

**Backend:**
- Node.js with Express.js
- JWT (JSON Web Token) for authentication
- bcrypt for password hashing
- Stripe / Khalti (or any gateway) for payment integration

**Database:**
- MongoDB (Mongoose ODM)

  ## 🔑 Authentication

- **JWT-based authentication** with access tokens
- Two user roles: `admin` and `client`
- Protected routes for admin functionalities
