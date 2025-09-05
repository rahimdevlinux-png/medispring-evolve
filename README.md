# SMAART Healthcare EMR System

A comprehensive Electronic Medical Records (EMR) platform built with React.js and Node.js, designed for hospital management with role-based access control.

## 🏥 Features

- **Multi-Role Dashboard System**: Super Master Admin, Clinic Admin, Doctor, Nurse, Billing, Pharmacy, and Patient portals
- **Professional Healthcare Theme**: Clean teal and white design optimized for medical environments
- **Clinic Management**: Multi-clinic support with individual admin controls
- **Patient Management**: Complete patient records with medical history
- **Appointment Scheduling**: Advanced booking system with calendar integration
- **Billing & Insurance**: Comprehensive financial management with insurance claims
- **Prescription Management**: Digital prescriptions with pharmacy integration
- **MongoDB Integration**: Ready for MongoDB database connection
- **Role-Based Security**: JWT authentication with strict access controls

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smaart-healthcare
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Setup Environment Variables**
   
   Backend (.env):
   ```env
   PORT=4000
   MONGODB_URI=mongodb://127.0.0.1:27017/smaart_emr
   JWT_SECRET=your_jwt_secret_here
   OTP_TTL_SECONDS=300
   ```

5. **Start the Applications**
   
   In separate terminals:
   
   **Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend Application:**
   ```bash
   cd frontend
   npm run dev
   ```

## 🔐 Demo Credentials

### Super Master Admin (Global Access)
- **Email**: `admin@smaart.healthcare`
- **Password**: `Password123!`
- **Access**: Full system control, clinic management, global analytics

### Clinic Super Admin
- **Email**: `admin.citycare@smaart.healthcare`
- **Password**: `Password123!`
- **Access**: CityCare Hospital management, staff control

### Doctor
- **Email**: `dr.rajesh@citycare.smaart.healthcare`
- **Password**: `Password123!`
- **Access**: Patient consultations, medical records

### Patient
- **Email**: `patient@example.com`
- **Password**: `Password123!`
- **Access**: Personal health records, appointments

## 🏗️ Architecture

### Frontend (React.js)
```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── layout/       # Header, Sidebar, Layout
│   │   └── dashboard/    # KPI cards, widgets
│   ├── pages/           # Role-specific pages
│   ├── contexts/        # Auth and state management
│   └── lib/            # Utilities and helpers
└── public/
```

### Backend (Node.js/Express)
```
backend/
├── src/
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth, validation
│   ├── models/         # Database schemas (ready for MongoDB)
│   └── controllers/    # Business logic
└── uploads/           # File storage
```

## 🎨 Design System

### Color Palette
- **Primary Teal**: `hsl(180, 65%, 48%)` - Main brand color
- **Background**: Pure white `hsl(0, 0%, 100%)`
- **Professional Grays**: Subtle borders and text
- **Medical Accents**: Green for success, red for alerts

### Typography
- **Headers**: Semibold weights for hierarchy
- **Body**: Clean, readable fonts
- **Medical Data**: Monospace for precision

## 📱 Pages & Modules

### Global Admin
- **Dashboard**: System-wide KPIs and analytics
- **Clinics**: Add/manage hospital partners
- **Reports**: Revenue, utilization, compliance

### Clinic Management
- **Doctors**: Staff management and schedules
- **Patients**: Registration and medical records
- **Appointments**: Calendar and booking system
- **Billing**: Invoicing and insurance claims
- **Pharmacy**: Prescription and inventory
- **Labs**: Test orders and results

### Medical Staff
- **Doctor Portal**: Patient queue, medical records, prescriptions
- **Nurse Portal**: Vitals, treatment updates, care logs
- **Billing Portal**: Financial records, claims processing
- **Pharmacy Portal**: Dispensing, stock management

### Patient Portal
- **Health Records**: Medical history and documents
- **Appointments**: Booking and telemedicine
- **Prescriptions**: Digital prescriptions and refills
- **Billing**: Payment history and insurance

## 🔧 Configuration

### MongoDB Schema (Ready to implement)
- Users with role-based access
- Clinics with department structure
- Patients with complete medical history
- Appointments with scheduling logic
- Billing with insurance integration
- Audit trails for compliance

### Authentication
- JWT-based sessions
- Role-based route protection
- OTP integration ready
- Password security standards

## 🚀 Deployment

### Development
```bash
# Run both frontend and backend
npm run dev:all
```

### Production
- Frontend: Build for static hosting
- Backend: Deploy to cloud with MongoDB Atlas
- Database: MongoDB with proper indexing
- Storage: AWS S3 for files
- CDN: CloudFlare for global delivery

## 📞 Support

For technical support or customization:
- Check the issues section
- Review API documentation in `/backend/docs`
- Follow coding standards in the style guide

## 🔒 Security

- HIPAA-ready architecture
- Encrypted patient data
- Audit logging
- Role-based permissions
- Secure API endpoints

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**SMAART Healthcare EMR** - *Transforming Healthcare with Technology*