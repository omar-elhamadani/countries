"use client";
import { NavbarProps } from "@/types";
import Image from "next/image";
import { useState } from "react";

const Navbar = ({ dark, setDark }: NavbarProps) => {
  return (
    <header className="w-full sticky top-0 z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <nav
        className={`flex justify-between items-center ${
          dark ? " bg-gray-700" : "bg-white"
        }  py-7`}
      >
        <h1
          className={`mx-8 font-bold text-3xl ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Where in the world?
        </h1>
        <button
          className={`flex mx-6 font-semibold ${
            dark ? "text-white" : "text-black"
          }`}
          onClick={() => setDark(!dark)}
        >
          <Image
            src={`${!dark ? "/moon.png" : "/sun.png"}`}
            alt="moon"
            width={20}
            height={20}
            className=" mx-2"
          />
          {`${!dark ? "Dark Mode" : "Light Mode"}`}
        </button>
      </nav>
    </header>
  );
};
export default Navbar;
