import { createRoot } from 'react-dom/client'
import { useState } from 'react'

import { HomePage } from './pages/home_page.jsx';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <div className="loginBox" style={{
          //height: 400,
          width: 360,
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '10px',
          border: '1px solid #ccc',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '20px' }}>เข้าสู่ระบบ</h2>

          <div className="inputField" style={{ marginBottom: '1rem' }}>
            <label>อีเมล</label>
            <input type="email" placeholder="กรอกอีเมลของท่าน" style={{
              display: 'block',
              width: '100%',
              marginTop: 4
            }} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="inputField" style={{ marginBottom: '1rem' }}>
            <label>รหัสผ่าน</label>
            <input type="password" placeholder="กรอกรหัสผ่านของท่าน" style={{
              display: 'block',
              width: '100%',
              marginTop: 4
            }} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="loginButton" style={{ width: '100%', marginTop: '1rem' }} onClick={() => {
            console.log(`ชื่อผู้ใช้: ${username}, รหัสผ่าน: ${password}`);

            if (username != '' && password != '') {
              alert('เข้าสู่ระบบสำเร็จ');
            } else {
              alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            }
          }}>เข้าสู่ระบบ</button>
        </div>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<HomePage />);