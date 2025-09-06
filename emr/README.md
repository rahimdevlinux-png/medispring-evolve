# EMR Dashboard Application

A complete Electronic Medical Records (EMR) dashboard system with OTP authentication for Super Master Admin.

## Features

- **OTP Authentication**: Secure login for Super Master Admin only
- **Modern UI**: Clean white and blue theme with responsive design
- **Dashboard Analytics**: Comprehensive metrics, charts, and KPIs
- **Clinic Management**: Add, view, and manage clinic partners
- **Doctor Management**: Staff list with specialties and schedules
- **Patient Management**: Patient records and treatment history
- **Appointment System**: Calendar and booking management
- **Billing Module**: Invoices, payments, and financial tracking
- **Pharmacy Management**: Medicine inventory and prescriptions
- **Lab Management**: Test orders and results
- **Reports & Analytics**: Performance metrics and insights
- **Notifications**: System alerts and activity feed

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Recharts (for charts)
- Lucide React (for icons)
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- Bcrypt for password hashing

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd emr
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env file with your MongoDB URI and other configs
   npm run server
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Demo Credentials

**Super Master Admin Login:**
- Email: `admin@emr.com`
- OTP: `123456`

## Project Structure

```
emr/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Main application pages
│   │   ├── contexts/     # React contexts (Auth, etc.)
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend/           # Node.js backend API
│   ├── routes/        # API route handlers
│   ├── middleware/    # Custom middleware
│   ├── models/        # MongoDB models (Mongoose)
│   ├── server.js      # Main server file
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP and get JWT token

### Core Modules
- `GET/POST/PUT/DELETE /api/clinics` - Clinic management
- `GET/POST/PUT/DELETE /api/doctors` - Doctor management
- `GET/POST/PUT/DELETE /api/patients` - Patient management
- `GET/POST/PUT/DELETE /api/appointments` - Appointment management
- `GET/POST/PUT/DELETE /api/billing` - Billing and invoices
- `GET/POST/PUT/DELETE /api/pharmacy` - Pharmacy and medicines
- `GET/POST/PUT/DELETE /api/labs` - Lab orders and results
- `GET /api/reports/*` - Analytics and reports
- `GET/POST/PUT/DELETE /api/notifications` - System notifications

## Development

### Frontend Development
```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
```

### Backend Development
```bash
cd backend
npm run server  # Start with nodemon (auto-reload)
npm start      # Start production server
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/emr_system
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please create an issue in the repository or contact the development team.