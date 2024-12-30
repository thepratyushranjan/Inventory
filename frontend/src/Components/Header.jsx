import React, { useRef, useState, useEffect } from "react";
import Logo from './../assets/DevPOSLogo.webp';
import Dropdown from "./Dropdown";

import { IoSearchOutline } from "react-icons/io5";
import { PiSquaresFour } from "react-icons/pi";
import { LiaUserCircleSolid } from "react-icons/lia";
import { LuSettings } from "react-icons/lu";
import { PiBellLight } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import Input from "./Input";

const Header = () => {
  const dropdownRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggle = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full h-[9vh] bg-gray-800 flex items-center justify-center shadow-2xl shadow-gray-800">
      <nav className="w-[95vw] h-[90%] flex items-center justify-center">
        <div className="flex items-center justify-evenly w-1/2 h-full">
          <div className="w-1/4 h-4/5 flex pt-3 justify-start cursor-pointer">
            <img 
              src={Logo} 
              width={60} 
              className="hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg" 
              style={{ filter: 'brightness(0) invert(1)' }} // Change logo color to white
            />
          </div>
          <div className="flex items-center justify-between w-[70%] h-[70%] bg-white rounded-sm px-3 shadow-md hover:shadow-lg transition-shadow duration-200">
            <Input type="search" placeholder="Search here" width="300px" />
            <IoSearchOutline 
              className="w-[2vw] h-[4vh] hover:scale-110 transition-transform duration-200 cursor-pointer text-white" // Change search icon color to white
            />
          </div>
        </div>
        <div className="flex items-center justify-end w-1/2 h-4/5 gap-2" ref={dropdownRef}>
          <div className="flex items-center relative justify-center gap-2 cursor-pointer select-none">
            <span className="text-white text-[1rem]">Amir Watch Shalmi</span> {/* Change text color to white */}
            <IoIosArrowDown 
              className="w-[2vw] h-[4vh] hover:scale-110 transition-transform duration-200 text-white" // Change dropdown icon color to white
            />
          </div>
          {["bell", "settings", "user", "menu"].map((icon, index) => (
            <div
              key={index}
              className="p-[5px] relative group"
              onClick={() => toggle(index + 1)}
            >
              {icon === "bell" && (
                <PiBellLight 
                  className="w-[2vw] h-[4vh] group-hover:scale-110 group-hover:shadow-lg transition-transform duration-200 cursor-pointer text-white" // Change bell icon color to white
                />
              )}
              {icon === "settings" && (
                <LuSettings 
                  className="w-[2vw] h-[4vh] group-hover:scale-110 group-hover:shadow-lg transition-transform duration-200 cursor-pointer text-white" // Change settings icon color to white
                />
              )}
              {icon === "user" && (
                <LiaUserCircleSolid 
                  className="w-[2vw] h-[4vh] group-hover:scale-110 group-hover:shadow-lg transition-transform duration-200 cursor-pointer text-white" // Change user icon color to white
                />
              )}
              {icon === "menu" && (
                <PiSquaresFour 
                  className="w-[2vw] h-[4vh] group-hover:scale-110 group-hover:shadow-lg transition-transform duration-200 cursor-pointer text-white" // Change menu icon color to white
                />
              )}
              <div
                style={activeDropdown === index + 1 ? { display: "block" } : { display: "none" }}
                className="absolute top-14 right-1"
              >
                <Dropdown />
              </div>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
