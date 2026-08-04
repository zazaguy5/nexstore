import './index.css';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { ForgotPasswordPage } from './pages/ForgotPassPage.jsx';
import { CartPage } from './pages/TestCartPage.jsx'; 
import Navbar from './components/customer/Navbar.jsx';
import { ProductDetailPage } from './pages/ProductDetailPage.jsx';

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginRoute = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forgot-password";

  return (
    <>
      {!isLoginRoute && (isAdminRoute ? <AdminNavbar /> : <Navbar />)}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/productDetail/:id" element={<ProductDetailPage />}/>
        <Route path="/cart" element={<CartPage />}/>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<App />);