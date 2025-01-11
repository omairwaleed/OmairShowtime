import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sider from "../sider";
import { usePathname } from "next/navigation";

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};
const Header = ({ searchTerm, setSearchTerm }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className=" h-20 items-center flex flex-row px-4 justify-between ">
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white shadow-lg transform transition-transform duration-500 z-20 ${
          isOpen ? "" : "-translate-x-full"
        }`}
      >
        <Sider toggleSidebar={toggleSidebar} />
      </div>
      {isOpen && (
        <div
          className={`fixed inset-0 z-10  bg-white opacity-20`}
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="flex md:hidden ml-3" onClick={toggleSidebar}>
        <GiHamburgerMenu color=" white" size={25} />
      </div>
      <ul className="hidden md:flex flex-row items-center ">
        <li className="text-2xl text-primary border-b-2 border-b-primary mr-5">
          Movies
        </li>

        <li className="text-2xl text-white mr-5">TV Shows</li>
        <li className="text-2xl text-white">series</li>
      </ul>
      {pathname === "/" && (
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-1/2 md:w-1/4  h-12 rounded-md px-3 outline-none bg-[#21242D] text-[#F9F9F9]"
        />
      )}
    </div>
  );
};

export default Header;
