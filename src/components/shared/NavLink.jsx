"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  // console.log(pathname, "pathname");

  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={`${isActive ? "border-b-3 border-b-pink-600" : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
