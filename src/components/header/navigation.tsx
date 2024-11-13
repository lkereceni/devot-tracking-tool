"use client";

import signOut from "@/firebase/auth/sign-out";
import withAuth from "@/hoc/with-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import React, { useRef } from "react";

type HeaderNavItem = {
  label: string;
  icon: string;
  url: string;
  isActive?: boolean | undefined;
};

const Navigation = () => {
  const pathname = usePathname();
  const menuRef = useRef<Menu>(null);

  const isActive = (href: string) => {
    return pathname === href;
  };

  const headerNavItems: HeaderNavItem[] = [
    {
      label: "Trackers",
      icon: "pi pi-clock",
      url: "/trackers",
      isActive: isActive("/trackers"),
    },
    {
      label: "History",
      icon: "pi pi-history",
      url: "/history",
      isActive: isActive("/history"),
    },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <div className="flex flex-row align-items-center justify-content-end">
        <Button
          type="button"
          icon="pi pi-bars text-2xl"
          className="bg-transparent lg:hidden"
          onClick={(e) => menuRef.current?.toggle(e)}
          aria-controls="popup_menu_right"
          aria-haspopup
        />
        <Menu
          model={headerNavItems}
          popup
          ref={menuRef}
          className="border-radius-8px bg-whisper text-lynch"
        />
      </div>
      <div className="hidden lg:flex flex-row align-items-center justify-content-center h-full">
        <nav className="h-full flex flex-row align-items-center justify-content-center nav-border">
          {headerNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={`h-full flex align-items-center justify-content-center gap-2 px-44px ${
                !item.isActive && !item.isActive !== undefined
                  ? "text-ghost border-ghost"
                  : "text-white-lilac border-orange-500"
              } hover:text-white-lilac`}
              style={{
                borderBottom: "5px solid",
              }}
            >
              <i className={item.icon} />
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          onClick={handleLogout}
          className="h-full flex align-items-center justify-content-center gap-2 px-44px text-ghost hover:text-white-lilac"
        >
          <i className="pi pi-power-off" />
          Logout
        </Link>
      </div>
    </>
  );
};

export default withAuth(Navigation);
