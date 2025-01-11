import Image from "next/image";
import React from "react";
import Menu from "./menu";
import { MdOutlineClose } from "react-icons/md";
type Props = {
  toggleSidebar?: () => void;
};

const Sider = ({ toggleSidebar }: Props) => {
  return (
    <div className="w-full h-full border-r-2 border-r-[#222222] relative">
      <div className="md:hidden absolute right-5 top-5" onClick={toggleSidebar}>
        <MdOutlineClose color="white" size={25} />
      </div>

      <Image
        src="/images/logo.svg"
        width={250}
        height={180}
        alt="Picture of the author"
      />
      <Menu />
    </div>
  );
};

export default Sider;
