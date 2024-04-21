# 🛒 E-commerce App - Frontend

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![License](https://img.shields.io/badge/license-ISC-blue)](#)
[![React](https://img.shields.io/badge/Frontend-React-blue)](#)
[![Vite](https://img.shields.io/badge/Bundler-Vite-8A2BE2)](#)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-00bfff)](#)

Welcome to the **E-commerce App Frontend**, a responsive and modular web application for online shopping. Built with React, Material UI, and integrated with Stripe for secure payments.

---

## 📊 Technologies Used

- **Framework**: React.js
- **Bundler**: Vite
- **Routing**: React Router DOM
- **UI Library**: Material UI (MUI)
- **Form Management**: Formik + Yup (validation)
- **Payments**: Stripe integration via `@stripe/react-stripe-js`
- **Alerts**: SweetAlert2
- **Icons**: React Icons
- **Loading Indicators**: React Loader Spinner
- **Social Login UI**: react-social-login-buttons
- **Environment Variables**: Vite Meta Env
- **Testing**: React Testing Library

---

## 🚀 Key Features

- User authentication flow connected to backend (local login and GitHub OAuth).
- Product catalog with dynamic filtering and pagination.
- Shopping cart management with local and server sync.
- Stripe payment integration for secure checkout.
- Form validation for login, signup, and payment forms using Formik and Yup.
- Responsive and mobile-friendly design with Material UI components.
- Modular and scalable code structure.
- Clean and consistent code style enforced by ESLint.

---

## ⚙️ How to Run Locally

1. **Clone the repository:**

```bash
git clone https://github.com/IgnacioFleming/webapp_ecommerce_frontend.git
cd webapp_ecommerce_frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure the environment:**

Create a `.env` file at the project root with the following:

```ini
VITE_APP_BASE_URL=http://localhost:8080
```

(Make sure this URL points to your backend server.)

4. **Start the development server:**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```bash
src/
├── components/     # Reusable UI components
├── pages/          # Page-level components (Home, Cart, Checkout, etc.)
├── services/       # API services (Axios handlers)
├── hooks/          # Custom React hooks
├── context/        # Context API providers for global state
├── utils/          # Helper functions
├── assets/         # Static images, icons, etc.
├── styles/         # Global and modular styles
└── main.jsx        # Application entry point
```

## 🛍️ Main User Flows

- **Browse Products:** View and filter products dynamically.

- **Shopping Cart:** Add, update, and remove products from cart.

- **User Authentication:** Login, Register, and GitHub OAuth.

- **Checkout:** Complete purchases securely with Stripe.

- **Payment Confirmation:** Receive feedback after successful payment.

## 👨‍💻 Author

Developed by **Ignacio Fleming**
