import { Link } from 'react-router-dom';

function AdminNavbar() {
  return (
    <div className="w-full h-16 bg-[#6B4226] text-white flex justify-between items-center">
      <p className="text-lg font-bold">Nexstore</p>
      <div className="flex space-x-4">
        <Link to="/">หน้าหลัก</Link>
        <Link to="/login">ออกจากระบบ</Link>
      </div>
    </div>
  );
}

export default AdminNavbar;