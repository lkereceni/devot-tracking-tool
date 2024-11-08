"use client";

import React from "react";
import "primereact/resources/primereact.min.css";
import Image from "next/image";
import appLogo from "@/assets/app-logo.svg";
import devotLogo from "@/assets/devot-logo.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";

type HeaderNavItem = {
  label: string;
  icon: string;
  href: string;
  isActive?: boolean | undefined;
};

const Header = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  const headerNavItems: HeaderNavItem[] = [
    {
      label: "Trackers",
      icon: "pi pi-clock",
      href: "/trackers",
      isActive: isActive("/trackers"),
    },
    {
      label: "History",
      icon: "pi pi-history",
      href: "/history",
      isActive: isActive("/history"),
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
      href: "/login",
      isActive: undefined,
    },
  ];

  return (
    <header className="w-full h-7rem bg-port-gore border-round-bottom flex flex-row align-items-center justify-content-between px-45px">
      <Image
        className="hidden sm:block"
        width={appLogo.width}
        height={appLogo.height}
        src={appLogo.src}
        alt="App logo"
      />
      <Image
        className="block sm:hidden"
        width={devotLogo.width}
        height={devotLogo.height}
        src={devotLogo.src}
        alt="Devot logo"
      />
      {pathname == "/" ? null : (
        <nav className="h-full flex flex-row align-items-center justify-content-center nav-border">
          {headerNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`h-full flex align-items-center justify-content-center gap-2 px-44px ${
                !item.isActive && !item.isActive !== undefined
                  ? "text-ghost border-orange-500"
                  : "text-white-lilac border-orange-500"
              } hover:text-white-lilac`}
            >
              <i className={item.icon} />
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
