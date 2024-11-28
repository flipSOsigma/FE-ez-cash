"use client";

import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function NavbarComponent() {
  
  const pathname = usePathname();
  const noShow: string[] = ["/", "/signin", "/signup"]

  return !noShow.includes(pathname) && < Navbar/>;

};