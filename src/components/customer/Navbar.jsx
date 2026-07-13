import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoadingComponent } from '../loading';

function Navbar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // ตัวอย่างการเซ็ตออกจากระบบ 
    setIsLoggingOut(true);
    // ปกติจะมีการ await เรียก API หรือลบ token เป็นต้น
    // await fetch("/api/logout", {method: "POST"});
    setTimeout(() => {
      navigate('/login');
    }, 800);
  };

  return (
    <>
      <div className="w-full h-16 bg-[#6B4226] text-white flex justify-between items-center">
        <p className="text-lg font-bold">Nexstore</p>
        <div className="flex space-x-4">
          <Link to="/">หน้าหลัก</Link>
          <button className="cursor-pointer" onClick={handleLogout}>ออกจากระบบ</button>
        </div>
      </div>

      {isLoggingOut && (
        LoadingComponent()
      )}
    </>
  );
}

export default Navbar;