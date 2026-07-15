import './index.css';
//import { Eye, EyeOff } from 'lucide-react';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { ForgotPasswordPage } from './pages/ForgotPassPage.jsx';
import Navbar from './components/customer/Navbar.jsx';

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginRoute = location.pathname === "/login" || location.pathname === "/forgot-password";

  return (
    <>
      {!isLoginRoute && (isAdminRoute ? <AdminNavbar /> : <Navbar />)}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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