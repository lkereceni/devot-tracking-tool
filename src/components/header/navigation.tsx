"use client";

import signOut from "@/firebase/auth/sign-out";
import withAuth from "@/hoc/with-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type HeaderNavItem = {
  label: string;
  icon: string;
  href: string;
  isActive?: boolean | undefined;
};

const Navigation = () => {
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
  ];
  const handleLogout = async () => {
    await signOut();
  };

  return (
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
      <Link
        href="/"
        onClick={handleLogout}
        className="h-full flex align-items-center justify-content-center gap-2 px-44px text-ghost hover:text-white-lilac"
      >
        <i className="pi pi-power-off" />
        {"Logout"}
      </Link>
    </nav>
  );
};

export default withAuth(Navigation);
