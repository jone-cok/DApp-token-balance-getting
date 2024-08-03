import React from 'react'
import { useNavigate } from "react-router-dom";
import path from '@/constants/path';

import { logout } from "@/service/apis/auth";




const User = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate(path.LOGIN);
  }
  const handleGoAdmin = () => {
    navigate(path.ADMIN);
  }
  return (
    <div className='flex flex-col justify-center items-cente'>
      <button className='bg-curiousblue text-white w-[230px] h-[40px] rounded-lg' onClick={handleLogout}>logout</button>
      <button className='bg-curiousblue text-white w-[230px] h-[40px] rounded-lg  mt-[30px]' onClick={handleGoAdmin}>Go AdminPage</button>
    </div>
  )
}

export default User;
