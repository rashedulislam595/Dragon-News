'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import userAvatar from "@/assets/user.png";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession()

  // const user = session.user;
  const users = session?.user;
  // console.log(users)
  return (
    <div className="w-11/12 mx-auto flex justify-between items-center mb-3 gap-4 mt-6">
      <div></div>
      <ul className="flex justify-between items-center text-gray-700 gap-3">
        <li>
          <NavLink href={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink href={"/about-us"}>About</NavLink>
        </li>
        <li>
          <NavLink href={"/career"} >
            Career
          </NavLink>
        </li>
      </ul>

      {isPending ? <span className="loading loading-infinity loading-xl"></span> :
        <div className="flex items-center gap-2 ">
          {users ? <Image src={users?.image} alt="User avatar" width={50} height={50} className="rounded-full" /> : <Image src={userAvatar} alt="User avatar" width={50} height={50} />}

          {users ?
            <button className="btn bg-red-400 text-white" onClick={async()=>await authClient.signOut()}>Logout</button> :
            <button className="btn bg-purple-500 text-white">
              <Link href={"/login"}>Login</Link>
            </button>
          }
        </div>}
    </div>
  );
};

export default Navbar;
