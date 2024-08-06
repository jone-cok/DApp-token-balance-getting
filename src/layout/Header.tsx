
import react, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import routes from '@/routes';

import logo_shopo from '@/assets/icons/logo_Shopo.png';
import icon_search from '@/assets/icons/icon_search.png';
import icon_buy from '@/assets/icons/icon_buy.png';
import icon_profile from '@/assets/icons/icon_profile.png';
import { Link } from "react-router-dom";

interface IHeaderLink {
  name: string;
  path: string;
}

const HeaderLinks: IHeaderLink[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/product" },
  { name: "Admin", path: "/admin" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center bg-[#6C18D8] w-full h-[100px] m-auto">
      <nav className="pl-[51px]">
        <ul className="flex flex-row items-center">
          {HeaderLinks.map((link, index) => (
            <li key={index} className="text-white text-[16px] mr-[15px]">
              <a href={link.path}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <Link to='/'>
        <img src={logo_shopo} alt='logo' className="w-[171px] h-[70px] m-auto" />
      </Link>
      <div className="pr-[51px] flex flex-row justify-between items-center">
        <button className="flex flex-row justify-between items-center mr-[39px]">
          <div className="text-white text-[20px] mr-[14px]">Search</div>
          <img src={icon_search} alt='logo' className="w-[35px] h-[35px] text-white" />
        </button>
        <div className="w-[35px] h-[35px]">
          <Link to='/login' className="w-full h-full">
            <img src={icon_buy} alt='logo' className="w-full h-full object-cover text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
