"use client";
import Link from "next/link";
import React from "react";
import { FiHome } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { usePathname } from "next/navigation";
const Menu = () => {
  const pathname = usePathname();
  return (
    <div className=" pl-3 flex flex-col">
      <Link
        href="/"
        className="h-10 flex flex-row  justify-between items-center mb-4"
      >
        <div className="flex flex-row justify-center items-center">
          <FiHome color={pathname === "/" ? "#F8B319" : "white"} size={19} />
          <p
            className={`${
              pathname === "/" ? "text-primary" : "text-white"
            } text-lg font-semibold ml-2`}
          >
            Home
          </p>
        </div>

        {pathname === "/" && <div className="w-1 h-full  bg-primary"></div>}
      </Link>
      <Link
        href="/favorites"
        className="h-10 flex flex-row  justify-between items-center mb-4"
      >
        <div className="flex flex-row justify-center items-center">
          <MdFavoriteBorder
            color={pathname === "/favorites" ? "#F8B319" : "white"}
            size={19}
          />
          <p
            className={`${
              pathname === "/favorites" ? "text-primary" : "text-white"
            } text-lg font-semibold ml-2`}
          >
            Favorites
          </p>
        </div>

        {pathname === "/favorites" && (
          <div className="w-1 h-full  bg-primary"></div>
        )}
      </Link>
    </div>
  );
};

export default Menu;
