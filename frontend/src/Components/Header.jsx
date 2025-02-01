import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./../assets/DevPOSLogo.webp";
import Dropdown from "./Dropdown";

import { IoSearchOutline } from "react-icons/io5";
import { PiSquaresFour } from "react-icons/pi";
import { LiaUserCircleSolid } from "react-icons/lia";
import { LuSettings } from "react-icons/lu";
import { PiBellLight } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import Input from "./Input";

const Header = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isUserCardOpen, setIsUserCardOpen] = useState(false);

  const toggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleUserCard = () => {
    setIsUserCardOpen(!isUserCardOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setIsUserCardOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full h-[9vh] bg-gray-800 flex items-center justify-center shadow-2xl shadow-gray-800">
      <nav className="w-[95vw] h-[90%] flex items-center justify-center">
        <div className="flex items-center justify-evenly w-1/2 h-full">
          <div className="w-1/4 h-4/5 flex pt-3 justify-start cursor-pointer">
            <img src={Logo} width={60} className="hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg" style={{ filter: 'brightness(0) invert(1)' }} />
          </div>
          <div className="flex items-center justify-between w-[70%] h-[70%] bg-white rounded-sm px-3 shadow-md hover:shadow-lg transition-shadow duration-200">
            <Input type="search" placeholder="Search here" width="300px" />
            <IoSearchOutline className="w-[2vw] h-[4vh] hover:scale-110 transition-transform duration-200 cursor-pointer text-white" />
          </div>
        </div>
        <div className="flex items-center justify-end w-1/2 h-4/5 gap-2" ref={dropdownRef}>
          <div className="flex items-center relative justify-center gap-2 cursor-pointer select-none">
            <span className="text-white text-[1rem]">Amir Watch Shalmi</span>
            <IoIosArrowDown className="w-[2vw] h-[4vh] hover:scale-110 transition-transform duration-200 text-white" />
          </div>
          {["bell", "settings", "menu"].map((icon, index) => (
            <div key={index} className="p-[5px] relative group" onClick={() => toggle(index + 1)}>
              {icon === "bell" && <PiBellLight className="w-[2vw] h-[4vh] text-white cursor-pointer group-hover:scale-110" />}
              {icon === "settings" && <LuSettings className="w-[2vw] h-[4vh] text-white cursor-pointer group-hover:scale-110" />}
              {icon === "menu" && <PiSquaresFour className="w-[2vw] h-[4vh] text-white cursor-pointer group-hover:scale-110" />}
              {activeDropdown === index + 1 && (
                <div className="absolute top-14 right-1">
                  <Dropdown />
                </div>
              )}
            </div>
          ))}
          <div className="p-[5px] relative" onClick={toggleUserCard}>
            <LiaUserCircleSolid className="w-[2vw] h-[4vh] text-white cursor-pointer hover:scale-110" />
            {isUserCardOpen && (
              <div className="absolute top-14 right-1 w-[180px] bg-white shadow-lg rounded-md p-2 z-10">
                <div className="flex flex-col gap-2">
                  <button onClick={handleProfile} className="py-2 text-white text-sm bg-[#308549] hover:bg-[#268136] rounded-md">Profile</button>
                  <button onClick={handleLogout} className="py-2 text-white text-sm bg-[#e63946] hover:bg-[#c73a34] rounded-md">Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
