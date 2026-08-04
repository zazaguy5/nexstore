import '../assets/styles/default_style.css';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoadingComponent } from '../components/loading';
import { login } from '../utils/apiServices';

function Checkbox({ id, label }) {
  return (
    <div className="checkbox-wrapper-4">
      <input className="inp-cbx" id={id} type="checkbox" />
      <label className="cbx" htmlFor={id}>
        <span>
          <svg width="12px" height="10px" viewBox="0 0 12 10" fill="none">
            <polyline
              points="1.5 6 4.5 9 10.5 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>{label}</span>
      </label>
    </div>
  );
}

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shwPass, setShwPass] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // ป้องกัน <form> reload เองบนหน้าเว็บ
    setError(null);

    if (username === '' || password === '') return;
    setIsLoading(true);

    try {
      const result = await login({ username: username, password: password });
      console.log(`${result.message}`);
      if (result.status == 'success') {
        sessionStorage.setItem('username', result.data.name);
        sessionStorage.setItem('isLogin', true);
        sessionStorage.setItem('userId', result.data.userId);
        navigate('/');
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
        <form onSubmit={handleLogin} className="h-auto w-xl p-[25px] rounded-xl bg-[#B2BEB5] shadow-md">
          <h1 className="text-white text-3xl font-bold pb-6">เข้าสู่ระบบ</h1>
          <input id="username" type="text" placeholder="บัญชี" onChange={(e) => setUsername(e.target.value)} onInvalid={(e) => e.target.setCustomValidity('กรุณากรอกบัญชี')} onInput={(e) => e.target.setCustomValidity('')}
            className="w-full h-10 p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
            required />
          <input id="password" type="password" placeholder="รหัสผ่าน" onChange={(e) => setPassword(e.target.value)} onInvalid={(e) => e.target.setCustomValidity('กรุณากรอกรหัสผ่าน')} onInput={(e) => e.target.setCustomValidity('')}
            className="w-full h-10 p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
            required />
          <div className="flex flex-row justify-between">
            <Checkbox id="remember" label="จดจำรหัสผ่าน" />
            <p className="cursor-pointer hover:underline text-[16px] text-white" onClick={() => navigate('/forgot-password')}>ลืมรหัสผ่าน?</p>
          </div>
          <Link to="/register" className='pt-2 pb-2 text-white text-ls cursor-pointer'>สมัครบัญชี</Link>
          {error && <p className="text-red-600 text-sm mb-6">{error}</p>}

          <button type="submit" disabled={isLoading} className="w-full h-14 mt-10 bg-[#276dbd] hover:bg-[#276dbd]-600 transition-colors rounded-lg text-white font-bold text-2xl cursor-pointer">
            เข้าสู่ระบบ
          </button>
        </form>
      </div>

      {isLoading && (
        LoadingComponent()
      )}
    </>
  );
}