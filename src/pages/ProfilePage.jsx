import { useState } from 'react';

export function ProfilePage() {
  const [username, setUsername] = useState(sessionStorage.getItem('username') ?? 'Guest');

  return (
    <div className='p-4'>
      Profile
      <img src="/images/default-profile.png" className="w-[80px] h-[80px]" />
      <div className="flex flex-col space-y-2">
        <p className="text-black text-xl pt-4">{username}</p>
      </div>
    </div>
  );
}