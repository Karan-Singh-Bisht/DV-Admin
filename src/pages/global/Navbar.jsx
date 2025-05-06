import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineSquares2X2, HiBars4 } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";

export default function Navbar() {
  const [searchBox, setSearchBox] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row text-white sticky top-0 backdrop-blur-xl w-full items-center sm:justify-between h-auto sm:h-24 px-4 sm:px-6 py-2 sm:py-0">
      {/* Top row: Search and hamburger */}
      <div className="w-full flex items-center justify-between sm:justify-start sm:w-[80%] h-full">
        {/* Search Bar */}
        <div className="flex-grow rounded-3xl flex items-center gap-2 bg-[#0F1535] h-12 px-4">
          <IoSearchSharp className="text-xl text-white" />
          <input
            type="text"
            value={searchBox}
            onChange={(e) => setSearchBox(e.target.value)}
            placeholder="Search"
            className="bg-transparent focus:outline-none text-white placeholder:text-gray-300 w-full"
          />
        </div>

        {/* Hamburger menu for small screens */}
        <div
          className="sm:hidden hover:cursor-pointer text-3xl ml-4"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <HiBars4 />
        </div>
      </div>

      {/* Right icons section */}
      {/* Right icons section */}
      <div
        className={`
    flex flex-row items-center gap-6 px-4 text-2xl
    overflow-hidden transition-all duration-500 
    sm:max-h-none sm:mt-0
    ${menuOpen ? "max-h-[500px] mt-4 flex" : "max-h-0"}
  `}
      >
        <div className="w-8 h-8 rounded-full bg-gray-400"></div>
        <HiOutlineSquares2X2 />
        <FaRegBell />
        <RxAvatar />
      </div>
    </div>
  );
}
