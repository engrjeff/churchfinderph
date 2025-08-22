# 🏛️ ChurchFinder PH

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.14.0-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

A comprehensive platform for discovering and connecting with Born Again Christian churches across the Philippines. Built with modern web technologies to help believers find their spiritual home and church communities connect with their members.

## 🌟 Features

### 🔍 **Church Discovery**
- **Location-based search** with interactive maps powered by Google Maps
- **Advanced filtering** by region, province, city, and barangay
- **Denomination filtering** for Born Again Christian churches
- **Church size categorization** (Small, Medium, Large congregations)

### 🏛️ **Comprehensive Church Profiles**
- **Detailed church information** including mission, vision, and welcome messages
- **Pastor profiles** with photos and biographical information
- **Service schedules** including worship services, Bible studies, and prayer meetings
- **Ministry listings** and community programs
- **Contact information** and social media links
- **Photo galleries** and church media

### 👥 **Community Features**
- **User authentication** powered by Clerk
- **Church listing management** for pastors and church administrators
- **Multi-step church registration** process
- **Publishing system** with draft, published, and inactive states

### 🗺️ **Interactive Maps**
- **Google Maps integration** for precise church locations
- **Landmark references** for easy navigation
- **Address validation** using Philippine address system

### 📱 **Modern User Experience**
- **Responsive design** optimized for mobile and desktop
- **Dark/Light mode** support
- **Accessible UI components** built with Radix UI
- **Fast loading** with Next.js App Router

## 🛠️ Tech Stack

### **Frontend**
- ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js&logoColor=white) **Next.js 15.4.4** - React framework with App Router
- ![React](https://img.shields.io/badge/React-blue?style=flat&logo=react&logoColor=white) **React 19.1.0** - UI library
- ![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript&logoColor=white) **TypeScript 5.9.2** - Type-safe JavaScript
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS 4.0** - Utility-first CSS framework

### **UI Components**
- ![Radix UI](https://img.shields.io/badge/Radix%20UI-black?style=flat&logo=radix-ui&logoColor=white) **Radix UI** - Accessible component primitives
- ![Lucide React](https://img.shields.io/badge/Lucide-orange?style=flat&logo=lucide&logoColor=white) **Lucide React** - Beautiful icons
- **Shadcn/ui** - Pre-built component library

### **Backend & Database**
- ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white) **Prisma 6.14.0** - Type-safe database ORM
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white) **PostgreSQL** - Relational database
- **Next.js API Routes** - Serverless API endpoints

### **Authentication & Security**
- ![Clerk](https://img.shields.io/badge/Clerk-6A4AFF?style=flat&logo=clerk&logoColor=white) **Clerk** - Complete authentication solution
- **Next Safe Action** - Type-safe server actions

### **Maps & Location**
- ![Google Maps](https://img.shields.io/badge/Google%20Maps-4285F4?style=flat&logo=google-maps&logoColor=white) **Google Maps API** - Interactive maps and geocoding
- **Philippine Address System** - Local address validation

### **Media Management**
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) **Cloudinary** - Image and video management
- **Next Cloudinary** - Optimized media delivery

### **Form Handling**
- **React Hook Form** - Performant forms with validation
- **Zod** - Schema validation
- **Hookform Resolvers** - Form validation integration

### **State Management**
- **TanStack Query** - Server state management
- **React Context** - Client state management

### **Development Tools**
- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white) **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Google Maps API key
- Cloudinary account
- Clerk authentication keys

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/churchfinderph.git
   cd churchfinderph
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/churchfinderph"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Google Maps
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   
   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_CHURCH_FOLDER=churches
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Set up the database**
   ```bash
   pnpm dlx prisma generate
   pnpm dlx prisma db push
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3006](http://localhost:3006)

## 📁 Project Structure

```
churchfinderph/
├── app/                    # Next.js App Router
│   ├── (site)/            # Public pages
│   ├── (user)/            # Protected user pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── site-header.tsx   # Site navigation
├── features/             # Feature-specific components
│   └── church/          # Church-related functionality
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── prisma/             # Database schema and migrations
└── public/             # Static assets
```

## 🗃️ Database Schema

The application uses a comprehensive schema designed for church management:

- **Church** - Main church entity with location and status
- **ChurchProfile** - Mission, vision, and congregation details
- **Pastor** - Pastor information and biography
- **ChurchService** - Worship service schedules
- **Ministry** - Church ministries and programs
- **ChurchMap** - Geographic location and landmarks
- **ChurchMedia** - Photos and media content
- **ContactInfo** - Contact details and social links

## 🌐 Deployment

The application is optimized for deployment on modern platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Other Platforms
- **Netlify** - With edge functions
- **Railway** - Full-stack deployment
- **DigitalOcean App Platform** - Container deployment

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines and submit pull requests for any improvements.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for the Born Again Christian community in the Philippines
- Special thanks to all churches and pastors who contribute their information
- Powered by modern web technologies and open-source libraries

---

**ChurchFinder PH** - Connecting Born Again Christians with their spiritual communities across the beautiful islands of the Philippines. 🇵🇭 ✝️