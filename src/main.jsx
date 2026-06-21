import './assets/styles/default_style.css';
import { Eye, EyeOff } from 'lucide-react';

import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { HomePage } from './pages/home_page.jsx';

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

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shwPass, setShwPass] = useState(false);

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
            <input type="email" placeholder="อีเมล" style={{
              display: 'block',
              width: '70%',
              marginTop: '8px'
            }} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="inputField" style={{ marginBottom: '1rem' }}>
            <label>รหัสผ่าน</label>
            <div className="password-container">
              <input type={shwPass ? 'text' : 'password'} placeholder="รหัสผ่าน" onChange={(e) => setPassword(e.target.value)}/>
              <button type="button" onClick={() => setShwPass(prev => !prev)}>
                {shwPass ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
          </div>
          <Checkbox id="remember" label="จดจำรหัสผ่าน" />

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

createRoot(document.getElementById('root')).render(<App />);