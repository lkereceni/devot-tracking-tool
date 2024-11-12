"use client";

import React from "react";
import "primereact/resources/primereact.min.css";
import Image from "next/image";
import appLogo from "@/assets/app-logo.svg";
import devotLogo from "@/assets/devot-logo.svg";
import { usePathname } from "next/navigation";
import Navigation from "./navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full h-7rem bg-port-gore border-round-bottom flex flex-row align-items-center justify-content-between px-45px">
      <Image
        className="hidden sm:block"
        width={appLogo.width}
        height={appLogo.height}
        src={appLogo.src}
        alt="App logo"
        priority
      />
      <Image
        className="block sm:hidden"
        width={devotLogo.width}
        height={devotLogo.height}
        src={devotLogo.src}
        alt="Devot logo"
      />
      {pathname == "/login" ? null : <Navigation />}
    </header>
  );
};

export default Header;
