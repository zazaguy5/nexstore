import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCartCount } from '../../utils/apiServices';
import { LoadingComponent } from '../loading';

function Navbar() {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('isLogin') ?? false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState(sessionStorage.getItem('username') ?? 'Guest');
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') ?? 'null');
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

  useEffect(() => {
    const fetchCartCount = async () => {
      //setLoading(true);
      //setError(null);

      try {
        //console.log(`userId: ${userId}`);
        const result = await getCartCount(userId);
        console.log(`cart count: ${result.data[0].count ?? 0}`);
        setCartCount(result.data[0].count ?? 0);
      } catch (error) {
        //setError(error.message);
      } finally {
        //setLoading(false);
      }
    };

    if (userId !== 'null') {
      fetchCartCount();
    }
  }, [userId]);

  return (
    <>
      <div className="w-full h-16 bg-[#6B4226] text-white flex justify-between items-center p-4">
        <p className="text-lg font-bold cursor-pointer" onClick={() => { navigate('/') }}>Nexstore</p>
        <div className="flex space-x-4 items-center">
          <Link to="/">หน้าหลัก</Link>
          {isLogin ?
            <button className="cursor-pointer p-4" onClick={handleLogout}>ออกจากระบบ</button> : <Link to="/login" className='pr-4'>เข้าสู่ระบบ</Link>
          }
          <div className='relative cursor-pointer' onClick={() => { navigate('/cart') }}>
              {cartCount > 0 && (
                <span className="absolute -top-1 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <img src="/images/cart.png" className="w-[40px] h-[20px] bg-white-800 pr-6" />
            </div>  
          <div className="flex items-center cursor-pointer" onClick={() => { navigate('/profile') }}>
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