import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingComponent } from '../components/loading';
import { registerUser } from '../utils/userServices';

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [accname, setAccname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // ป้องกัน <form> reload เองบนหน้าเว็บ
    setError(null);

    if (accname === '' || username === '' || password === '') return;
    setIsLoading(true);

    try {
      console.log(`username ${username}, accname: ${accname}`);
      const resullt = await registerUser({ name: username, accname: accname, password: password });
      if (resullt.message === 'Account already exists!') {
        
      }
      console.log(`${resullt.message}`);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
        <form onSubmit={handleRegister} className="h-auto w-xl p-[25px] rounded-xl bg-[#B2BEB5] shadow-md">
          <h1 className="text-white text-3xl font-bold pb-6">สมัครบัญชี</h1>
          <input id="accname" type="text" placeholder="ชื่อบัญชี" value={accname} onChange={(e) => setAccname(e.target.value)} onInvalid={(e) => e.target.setCustomValidity('กรุณากรอกชื่อ')} onInput={(e) => e.target.setCustomValidity('')} className="w-full h-10 p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white" required/>

          <input id="username" type="text" placeholder="ชื่อผู้ใช้" value={username} onChange={(e) => setUsername(e.target.value)} onInvalid={(e) => e.target.setCustomValidity('กรุณากรอกบัญชี')} onInput={(e) => e.target.setCustomValidity('')} className="w-full h-10 p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white" required/>

          <input id="password" type="password" placeholder="รหัสผ่าน" value={password} onChange={(e) => setPassword(e.target.value)} onInvalid={(e) => e.target.setCustomValidity('กรุณากรอกรหัสผ่าน')} onInput={(e) => e.target.setCustomValidity('')} className="w-full h-10 p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white" required/>
          <p className='pt-2 pb-2 text-white text-ls cursor-pointer' onClick={() => navigate('/login')}>มีบัญชีอยู่แล้ว</p>
          {error && <p className="text-red-600 text-sm mb-6">{error}</p>}

          <button type="submit" disabled={isLoading} className="w-full h-14 mt-10 bg-[#276dbd] hover:bg-[#1e5595] transition-colors rounded-lg text-white font-bold text-2xl cursor-pointer disabled:opacity-60">สมัครบัญชี</button>
        </form>
      </div>

      {isLoading && (LoadingComponent())}
    </>
  );
}