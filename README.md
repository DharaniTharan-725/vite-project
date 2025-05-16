# AmaStore - Modern E-commerce Platform

AmaStore is a full-featured e-commerce platform built with React, TypeScript, and Supabase. It offers a modern, responsive design with a rich set of features for both customers and administrators.

## 🌐 Live Demo

Check out the live demo of AmaStore here: [https://e-commerce11111.netlify.app/](https://e-commerce11111.netlify.app/)

## 🚀 Features

### Customer Features

* 🍭 Product browsing with categories and search
* ⭐ Featured products showcase
* 🔍 Advanced product filtering and sorting
* 🛒 Shopping cart functionality
* 👤 User authentication and profile management
* 📦 Order history and tracking
* 💳 Secure checkout process

### Admin Features

* 📊 Admin dashboard
* 📝 Product management (CRUD operations)
* 🏷️ Category management
* 📈 Order management
* 👥 User management

## 🛠️ Tech Stack

* **Frontend Framework:** React 18 with TypeScript
* **Styling:** Tailwind CSS with shadcn/ui components
* **State Management:** React Context + React Query
* **Backend:** Supabase (PostgreSQL + Authentication)
* **Routing:** React Router v6
* **Form Handling:** React Hook Form with Zod validation
* **UI Components:** Radix UI primitives
* **Build Tool:** Vite

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React context providers
├── data/          # Static data and types
├── hooks/         # Custom React hooks
├── integrations/  # Third-party integrations
├── lib/           # Utility functions
├── pages/         # Page components
└── types/         # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn
* Supabase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/amastore.git
cd amastore
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## 🔧 Available Scripts

* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm run build:dev` - Build for development
* `npm run lint` - Run ESLint
* `npm run preview` - Preview production build

## 📦 Database Schema

The project uses Supabase with the following main tables:

* `products` - Product catalog
* `cart_items` - Shopping cart items
* `orders` - Customer orders
* `order_items` - Order line items
* `profiles` - User profiles

## 🔒 Authentication

The project uses Supabase Authentication with the following features:

* Email/Password authentication
* Protected routes
* User session management
* Profile management

## 🎨 UI Components

The project uses a combination of:

* shadcn/ui components
* Radix UI primitives
* Custom styled components
* Tailwind CSS for styling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

* [React](https://reactjs.org/)
* [Supabase](https://supabase.io/)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)
* [Radix UI](https://www.radix-ui.com/)
