import './index.css';
//import { Eye, EyeOff } from 'lucide-react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/home_page.jsx';
import { LoginPage } from './pages/login_page.jsx';
import { ForgotPasswordPage } from './pages/forgot_pass_page.jsx';

// export default function App() {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/home" element={<HomePage />} />
//           <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
//         </Routes>
//       </Router>
//     </>
//   );
// }

export default function App() {
  return (
    <div className="width-full h-screen bg-slate-100">
        <div className="width-full h-20 rounded p-4 mb-4 bg-blue-500 text-[20px] text-white">ยินดีต้อนรับเข้าสู่ระบบ NexStore</div>
        <p>Home Page</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);