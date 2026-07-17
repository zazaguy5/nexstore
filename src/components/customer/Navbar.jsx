import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoadingComponent } from '../loading';

function Navbar() {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('isLogin') ?? false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [username, setUsername] = useState(sessionStorage.getItem('username') ?? 'Guest');
  const navigate = useNavigate();

  const handleLogout = () => {
    // ตัวอย่างการเซ็ตออกจากระบบ 
    setIsLoggingOut(true);
    sessionStorage.setItem('isLogin', false);
    // ปกติจะมีการ await เรียก API หรือลบ token เป็นต้น
    // await fetch("/api/logout", {method: "POST"});
    setTimeout(() => {
      navigate('/login');
    }, 800);
  };

  return (
    <>
      <div className="w-full h-16 bg-[#6B4226] text-white flex justify-between items-center p-4">
        <p className="text-lg font-bold">Nexstore</p>
        <div className="flex space-x-4 items-center">
          <Link to="/">หน้าหลัก</Link>
          {isLogin ?
            <button className="cursor-pointer p-4" onClick={handleLogout}>ออกจากระบบ</button> : <Link to="/login" className='pr-4'>เข้าสู่ระบบ</Link>
          }
          <div className="flex items-center cursor-pointer" onClick={() => { navigate('/profile') }}>
            1<img src="/images/cart.png" className="w-[40px] h-[20px] bg-white-800 pr-6" />
            <p className="text-white font-bold text-xl pr-2">{username}</p>
            <img src="/images/default-profile.png" className="w-[40px] h-[40px]" />
          </div>
        </div>
      </div>

      {isLoggingOut && (
        LoadingComponent()
      )}
    </>
  );
}

export default Navbar;